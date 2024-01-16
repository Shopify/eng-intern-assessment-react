// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

// 3. extend the theme
const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "linear-gradient(180deg, rgba(3, 6, 10, 0.8) 0%, rgba(0, 41, 94, 0.6) 100%)",
        backdropFilter: "blur(10px)"
      }
    }
  }
});

export default theme;
