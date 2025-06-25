import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // <-- DIESE ZEILE IST SEHR WICHTIG!
import './App.css'; // <-- NEU: DIESE ZEILE IST SEHR WICHTIG FÜR DAS BASISLAYOUT!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
