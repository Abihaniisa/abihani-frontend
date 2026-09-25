import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './theme/tokens.css';
import './theme/base.css';
import './theme/utilities.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root not found in index.html');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);