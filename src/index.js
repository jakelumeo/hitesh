import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Performance optimizations
if (process.env.NODE_ENV === 'production') {
  // Disable console logs in production for better performance
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

// Optimize scroll performance
const originalScrollTo = window.scrollTo;
window.scrollTo = function(x, y, options = {}) {
  if (options.behavior === 'smooth') {
    options.behavior = 'auto'; // Use instant scrolling for better performance
  }
  return originalScrollTo.call(this, x, y, options);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
