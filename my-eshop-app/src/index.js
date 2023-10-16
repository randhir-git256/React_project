import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material'
import { SnackbarProvider } from "notistack";
import Theme from './assets/Theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <SnackbarProvider autoHideDuration={3000}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);