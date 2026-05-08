import { createContext, useContext, useState } from 'react';

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
      improveWithAI 
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
