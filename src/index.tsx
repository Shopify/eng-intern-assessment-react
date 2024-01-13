import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
container.style.background = "#181616"
container.style.color = "ivory"
const root = createRoot(container);
root.render(<App />);
