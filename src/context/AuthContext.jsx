import { createContext, useContext, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Legal Email Regex for validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const sendWelcomeEmail = (userName, userEmail) => {
    // Template for the email as requested by user
    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      subject: 'Welcome Back! You’re Logged In',
      message: `Glad to see you again! You have successfully logged into your dashboard.

Ready to build your next professional resume? Our new templates are waiting for you. Just head over to the "Templates" section and start creating. If you need any help, our documentation and support are just a click away.

Happy Creating,

GeniusCV Support`
    };

    console.log('Sending Welcome Email to:', userEmail);
    
    // Check if EmailJS keys are provided
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey && serviceId !== 'your_service_id') {
      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => console.log('Email sent successfully!', response.status, response.text))
        .catch((err) => console.error('Failed to send email:', err));
    } else {
      console.warn('EmailJS keys are missing in .env. Skipping real email send.');
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('geniuscv_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


  const login = (email, password) => {
    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const users = JSON.parse(localStorage.getItem('geniuscv_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Exclude password from session
      const sessionUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      localStorage.setItem('geniuscv_user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      
      // Send welcome email on login
      sendWelcomeEmail(sessionUser.name, sessionUser.email);
      
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };


  const signup = (name, email, password) => {
    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const users = JSON.parse(localStorage.getItem('geniuscv_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }
    
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem('geniuscv_users', JSON.stringify(users));
    
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem('geniuscv_user', JSON.stringify(sessionUser));
    setUser(sessionUser);

    // Send welcome email on signup
    sendWelcomeEmail(sessionUser.name, sessionUser.email);

    return { success: true };
  };


  const updateUser = (name, email) => {
    if (!user) return { success: false, error: 'Not logged in' };
    
    const users = JSON.parse(localStorage.getItem('geniuscv_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      // Check if new email is already taken by someone else
      if (email !== user.email && users.find(u => u.email === email && u.id !== user.id)) {
        return { success: false, error: 'Email already in use' };
      }
      
      users[userIndex].name = name;
      users[userIndex].email = email;
      localStorage.setItem('geniuscv_users', JSON.stringify(users));
      
      const sessionUser = { id: user.id, name, email };
      localStorage.setItem('geniuscv_user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { success: true };
    }
    return { success: false, error: 'User not found' };
  };

  const logout = () => {
    localStorage.removeItem('geniuscv_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
