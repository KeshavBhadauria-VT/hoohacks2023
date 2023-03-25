import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const saveUserToCookie = (user) => {
  const expiresIn = 7;

  if (user) {
    Cookies.set('user', JSON.stringify(user), { expires: expiresIn });
    console.log('User saved to cookie:', user);
  } 
};

const loadUserFromCookie = () => {
  const user = Cookies.get('user');
  return user ? JSON.parse(user) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const login = async (email, password) => {

    try {
        const response = await fetch('/api/checkUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log(data);
        // Handle successful user lookup, e.g., display a success message or log the user in
      } catch (error) {

        console.error('Error checking user:', error.message); // Log the error on the client-side
        // Handle errors, e.g., display an error message
        return true;
    }

    // Replace this with your actual authentication API call
    const user = { email, name: 'John Doe' };
    setUser(user);
    return false;

  };
  const clearUserCookie = () => {
    Cookies.remove('user');
  };

  const logout = () => {
    setUser(null);
    clearUserCookie();
  };

  useEffect(() => {
    const storedUser = loadUserFromCookie();
    console.log('Loaded user from cookie:', storedUser);
    setUser(storedUser);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user === null) {
      saveUserToCookie(null);
    } else {
      saveUserToCookie(user);
    }
  }, [user]);

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};