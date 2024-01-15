import React from 'react'
import { AppProvider } from '@shopify/polaris';
import StopWatch from './StopWatch'
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


export default function App() {
  return (
    <AppProvider i18n={ translations }>
      <StopWatch />
    </AppProvider>
  )
}