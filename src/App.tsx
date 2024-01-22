import React from 'react'
import StopWatch from './Pages/StopWatch/StopWatch'
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

function App() {
    return(
        <AppProvider i18n={enTranslations}>
            <StopWatch></StopWatch>
        </AppProvider>
    )
}

export default App;