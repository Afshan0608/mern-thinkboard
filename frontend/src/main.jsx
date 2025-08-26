import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {Toaster} from "react-hot-toast"; // Importing Toaster from react-hot-toast to display toast notifications



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    <Toaster/> {/* Toaster component to display toast notifications */}
    {/* The Toaster component will render toast notifications */}
    {/* anywhere in the application where the Toaster is included */}
    {/* It will display notifications like success, error, etc. */}
    </BrowserRouter>
    
  </StrictMode>,
)
