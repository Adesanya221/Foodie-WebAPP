import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check localStorage
      const savedTheme = localStorage.getItem('foodieTheme');
      
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Check user's system preference if no saved theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    }
  }, []);

  // Apply dark mode class to html element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save preference to localStorage
      localStorage.setItem('foodieTheme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}; 