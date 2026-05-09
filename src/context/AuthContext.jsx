import { createContext, useContext, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from '../utils/supabaseClient';

// Legal Email Regex for validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const sendWelcomeEmail = (userName, userEmail) => {
    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      subject: 'Welcome Back! You’re Logged In',
      message: `Glad to see you again! You have successfully logged into your dashboard.\n\nReady to build your next professional resume? Our new templates are waiting for you. Just head over to the "Templates" section and start creating. If you need any help, our documentation and support are just a click away.\n\nHappy Creating,\n\nGeniusCV Support`
    };

    console.log('Sending Welcome Email to:', userEmail);
    
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
    const initAuth = async () => {
      if (supabase) {
        // Supabase Auth
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
            email: session.user.email
          });
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            setUser({
              id: session.user.id,
              name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
              email: session.user.email
            });
          } else {
            setUser(null);
          }
        });

        setLoading(false);
        return () => subscription.unsubscribe();
      } else {
        // Fallback to localStorage
        const storedUser = localStorage.getItem('geniuscv_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      }
    };

    initAuth();
  }, []);


  const login = async (email, password) => {
    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      
      const sessionUser = {
        id: data.user.id,
        name: data.user.user_metadata?.full_name || email.split('@')[0],
        email: data.user.email
      };
      setUser(sessionUser);
      sendWelcomeEmail(sessionUser.name, sessionUser.email);
      return { success: true };
    }

    // Fallback to localStorage
    const users = JSON.parse(localStorage.getItem('geniuscv_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const sessionUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      localStorage.setItem('geniuscv_user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      sendWelcomeEmail(sessionUser.name, sessionUser.email);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };


  const signup = async (name, email, password) => {
    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      if (error) return { success: false, error: error.message };
      
      // Auto login after signup if email confirmation is off
      if (data.user && data.session) {
        const sessionUser = {
          id: data.user.id,
          name: name,
          email: data.user.email
        };
        setUser(sessionUser);
        sendWelcomeEmail(name, email);
      } else if (data.user) {
        // If email confirmation is enabled, session will be null
        return { success: true, message: 'Please check your email to verify your account.' };
      }
      return { success: true };
    }

    // Fallback to localStorage
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
    sendWelcomeEmail(sessionUser.name, sessionUser.email);
    return { success: true };
  };


  const updateUser = async (name, email) => {
    if (!user) return { success: false, error: 'Not logged in' };
    
    if (supabase) {
      const { error } = await supabase.auth.updateUser({
        email: email,
        data: { full_name: name }
      });
      if (error) return { success: false, error: error.message };
      
      setUser(prev => ({ ...prev, name, email }));
      return { success: true };
    }

    // Fallback to localStorage
    const users = JSON.parse(localStorage.getItem('geniuscv_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
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

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('geniuscv_user');
    setUser(null);
  };

  const deleteAccount = async () => {
    if (!user) return { success: false, error: 'Not logged in' };

    if (supabase) {
      // Call the RPC function to delete the user from auth.users
      const { error } = await supabase.rpc('delete_user');
      if (error) {
        return { success: false, error: error.message || 'Failed to delete account from cloud.' };
      }
      
      // If successful, log out
      await logout();
      return { success: true };
    }

    // Fallback to localStorage deletion
    const users = JSON.parse(localStorage.getItem('geniuscv_users') || '[]');
    const updatedUsers = users.filter(u => u.id !== user.id);
    localStorage.setItem('geniuscv_users', JSON.stringify(updatedUsers));
    
    // Log out
    localStorage.removeItem('geniuscv_user');
    setUser(null);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser, deleteAccount }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
