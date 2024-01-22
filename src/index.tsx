import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {SWContextProvider} from './SWContextProvider'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <SWContextProvider>
        <App />
    </SWContextProvider>
);
