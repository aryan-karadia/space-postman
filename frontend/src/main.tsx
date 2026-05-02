/**
 * ─── Application Entry Point ──────────────────────────────────────
 * Mounts the React application and initializes global styles.
 * 
 * FEATURES:
 *   - Root DOM element selection
 *   - Strict mode enabled for development
 *   - Global CSS imports (index.css, animations.css)
 *   - Renders App component at the root
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/animations.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
