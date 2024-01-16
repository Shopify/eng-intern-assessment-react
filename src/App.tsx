import React from 'react'
import { AppProvider } from '@shopify/polaris';
import StopWatch from './StopWatch'
import translations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';


export default function App() {
  return (
    <AppProvider i18n={ translations }>
      <div className='app-card'>
        <StopWatch />
      </div>
    </AppProvider>
  )
}