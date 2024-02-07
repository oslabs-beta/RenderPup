import React from "react";
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('app'));
root.render(<App />);