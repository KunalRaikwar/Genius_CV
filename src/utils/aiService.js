const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const optimizeWithAI = async (text, type = 'general') => {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing. Please check your .env file.");
  }

  if (!text || text.trim().length === 0) {
    throw new Error("Please provide some text to optimize.");
  }

  let prompt = '';

  switch (type) {
    case 'summary':
      prompt = `You are an expert resume writer. Rewrite the following professional summary to make it highly impactful, ATS-friendly, and professional. 
Do not include any introductory text or quotes, just return the optimized summary. Keep it concise (3-4 sentences max).
Here is the summary to optimize: "${text}"`;
      break;
    case 'experience':
      prompt = `You are an expert resume writer. Rewrite the following job responsibility/achievement to be a powerful, ATS-friendly resume bullet point. 
Use strong action verbs, emphasize quantifiable results if possible, and remove filler words. 
Do not include bullet point symbols (like • or -), introductory text, or quotes. Just return the optimized sentence.
Here is the text to optimize: "${text}"`;
      break;
    case 'project':
      prompt = `You are an expert resume writer. Rewrite the following project description to be highly impactful and ATS-friendly. 
Focus on the technical challenges, your contributions, and the outcomes. Use strong action verbs.
Do not include any introductory text or quotes, just return the optimized text.
Here is the text to optimize: "${text}"`;
      break;
    default:
      prompt = `You are an expert resume writer. Make the following text more professional and ATS-friendly: "${text}"`;
  }

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to communicate with AI service');
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      // Clean up any potential markdown or quotes from the response
      let optimizedText = data.candidates[0].content.parts[0].text.trim();
      optimizedText = optimizedText.replace(/^["']|["']$/g, ''); // Remove surrounding quotes if any
      optimizedText = optimizedText.replace(/^-\s*/, ''); // Remove leading dash if AI included one
      optimizedText = optimizedText.replace(/^\*\s*/, ''); // Remove leading asterisk if AI included one
      return optimizedText;
    } else {
      throw new Error("Unexpected response format from AI service");
    }

  } catch (error) {
    console.error('AI Optimization Error:', error);
    throw error;
  }
};
