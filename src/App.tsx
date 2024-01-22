import React from 'react'
import StopWatch from './StopWatch'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function App() {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#3e98c7',
            }
            //secondary: purple,
        },
        typography: {
            fontFamily: "Roboto"
        }
    });

    return (
        <div style={{ backgroundColor: "#2f2b57", height: "100%"}}>
            <ThemeProvider theme={theme}>
                <StopWatch />

            </ThemeProvider>
        </div>
    )
}