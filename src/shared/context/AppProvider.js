import React from 'react';
import { CartProvider } from '../hooks/useCart';
import { VendorProfileProvider } from '../hooks/useVendorProfile';
import { ThemeProvider } from '../hooks/useTheme';

/**
 * AppProvider combines all our context providers into a single component
 * This makes it easier to wrap the application with all required providers
 */
const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <VendorProfileProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </VendorProfileProvider>
    </ThemeProvider>
  );
};

export default AppProvider; 