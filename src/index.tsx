import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import StopWatch from './components/StopWatch';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<StopWatch/>
);
