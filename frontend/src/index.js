import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const isProduction = window.location.hostname !== '127.0.0.1' && window.location.hostname !== 'localhost';
const API_URL = isProduction 
    ? 'https://loveahfoundation.org/api' 
    : 'http://127.0.0.1:8000';

//console.log(`API URL: ${API_URL}`);

root.render(
  <React.StrictMode>
    <App API_URL={API_URL} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
