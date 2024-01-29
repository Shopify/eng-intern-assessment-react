import { Global } from "@emotion/react";
import React from "react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'IBM Plex Mono';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url(https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@600&display=swap) format('woff2')
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      `}
  />
);

export default Fonts;
