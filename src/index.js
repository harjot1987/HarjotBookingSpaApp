import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App';
import { client } from './services/apolloClient';

// Requirement #4: Define the global theme for Male (Blue) and Female (Pink) branding
const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6', // Standard Blue
    },
    secondary: {
      main: '#EC4899', // Standard Pink
    },
    background: {
      default: '#f9fafb', // Light grey for the calendar background
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Provides GraphQL capabilities to all Class Components */}
    <ApolloProvider client={client}>
      {/* Provides MUI Styling and Theme context */}
      <ThemeProvider theme={theme}>
        {/* Ensures consistent CSS across all browsers (Requirement #3) */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);