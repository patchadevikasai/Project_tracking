import React from 'react';
import ReactDOM from 'react-dom/client';
// Importing the external CSS file
import App from './App'; // Assuming App.js is your main React component

// Rendering the main React component inside the root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
