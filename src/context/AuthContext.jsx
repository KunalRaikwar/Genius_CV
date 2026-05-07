import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('geniuscv_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('geniuscv_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Exclude password from session
      const sessionUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      localStorage.setItem('geniuscv_user', JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
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
