import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<AppProvider i18n={enTranslations}>
		<Provider store={store}>
			<App />
		</Provider>
	</AppProvider>
);
