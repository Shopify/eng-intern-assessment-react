/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles/index.css';

// Renders the <App /> component at the the root
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
