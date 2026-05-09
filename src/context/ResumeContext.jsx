import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from './AuthContext';

const defaultState = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photo: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: []
};

const ResumeContext = createContext(null);

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [data, setData] = useState(defaultState);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();

  // Load resume data from Supabase when user logs in
  useEffect(() => {
    const loadResume = async () => {
      if (user && supabase) {
        try {
          const { data: resumeData, error } = await supabase
            .from('resumes')
            .select('data')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
            console.error('Error loading resume from Supabase:', error.message);
          } else if (resumeData) {
            setData(resumeData.data);
          }
        } catch (error) {
          console.error('Error fetching resume:', error);
        }
      }
      setIsLoaded(true);
    };

    loadResume();
  }, [user]);

  // Function to manually save to Supabase
  const saveResume = async () => {
    if (!user || !supabase) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('resumes')
        .upsert({
          user_id: user.id,
          data: data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (error) {
        console.error('Error saving resume to Supabase:', error.message);
      } else {
        console.log('Resume saved successfully!');
      }
    } catch (error) {
      console.error('Unexpected error saving resume:', error);
    }
    setIsSaving(false);
  };

  const updatePersonal = (field, value) => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addItem = (section, item) => {
    setData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: Date.now().toString() }]
    }));
  };

  const updateItem = (section, id, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeItem = (section, id) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };
  
  // Real AI Suggestion Logic using Gemini API
  const improveWithAI = async (text, type) => {
    if (!text || text.trim() === '') return text;

    try {
      // Import the service dynamically or at the top of the file
      // Assuming it's in src/utils/aiService.js
      const { optimizeWithAI } = await import('../utils/aiService.js');
      const improvedText = await optimizeWithAI(text, type);
      return improvedText;
    } catch (error) {
      console.error("Gemini API Error:", error);
      alert(error.message || "Failed to connect to the AI service. Please check your API key and connection.");
      return text;
    }
  };

  return (
    <ResumeContext.Provider value={{ 
      data, 
      updatePersonal, 
      addItem, 
      updateItem, 
      removeItem,
      improveWithAI,
      saveResume,
      isSaving,
      isLoaded
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
