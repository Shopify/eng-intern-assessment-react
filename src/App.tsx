import React from 'react'
import StopWatch from './StopWatch';
import { createGlobalStyle } from 'styled-components';

//Global styled component for fonts
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  }
`;

export default function App() {

  return (
    <div>
      <GlobalStyle />
      <StopWatch />
    </div>
  )
}