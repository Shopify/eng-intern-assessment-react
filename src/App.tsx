import React from 'react'
import StopWatch from './Pages/StopWatch/StopWatch'
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import AnalogStopwatch from './Pages/StopWatch/AnalogStopWatch';
import FaceSelector from './Components/StopWatchButton/FaceSelector';

function App() {
	return (
		<StopWatch/>
	)
}

export default App;