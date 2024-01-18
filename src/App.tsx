import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Stopwatch from './components/StopWatch';
import * as colors from './styles/colors';
import { css } from '@emotion/react';

// Main container styles
const mainContainerStyles = css({
  backgroundColor: colors.blue,
  minHeight: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

// Inner container styles
const innerContainerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
  width: '100%',
});

export default function App() {
  return (
    <div css={mainContainerStyles}>
      <div css={innerContainerStyles}>
        <Header />
        <Stopwatch />
      </div>
      <Footer />
    </div>
  );
}
