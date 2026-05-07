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

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      alert("API Key is missing! Please create a .env file and add your VITE_GEMINI_API_KEY.");
      return text;
    }

    // Determine the prompt instructions based on the field type
    let systemInstruction = "You are an expert resume writer. Improve the following text. Return ONLY the improved text without any quotation marks, introductions, or markdown formatting.";
    
    if (type === 'summary') {
      systemInstruction = "You are an expert resume writer. Improve the following professional summary. Make it impactful, concise, and ATS-friendly. Return ONLY the improved text without any quotation marks or markdown formatting.";
    } else if (type === 'experience') {
      systemInstruction = "You are an expert resume writer. Improve the following work experience description. Convert it into strong, action-oriented bullet points starting with bullet symbols (•). Emphasize achievements and metrics. Return ONLY the improved text.";
    } else if (type === 'projects') {
      systemInstruction = "You are an expert resume writer. Improve the following project description. Make it sound highly technical and impactful. Describe the problem solved and the technologies used. Return ONLY the improved text.";
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Instruction: ${systemInstruction}\n\nText to improve: ${text}` }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      
      if (responseData.candidates && responseData.candidates.length > 0) {
        const improvedText = responseData.candidates[0].content.parts[0].text;
        return improvedText.trim();
      }
      
      return text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      alert("Failed to connect to the AI service. Please check your API key and connection.");
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
