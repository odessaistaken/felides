import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// StrictMode is intentionally omitted — it causes GSAP effects to double-fire
// in development, creating duplicate ScrollTrigger instances and animation flicker.
createRoot(document.getElementById('root')).render(<App />);

