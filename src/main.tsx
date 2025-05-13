
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import React from 'react'

// Using a key to force a re-render of the entire app
const AppWithKey = () => <App key={`app-${Date.now()}`} />

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWithKey />
  </React.StrictMode>
);
