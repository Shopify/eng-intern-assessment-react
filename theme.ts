import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "linear-gradient(180deg, rgba(3, 6, 10, 0.8) 0%, rgba(0, 41, 94, 0.6) 100%)",
        backdropFilter: "blur(10px)"
      }
    }
  },
  components: {
    GlassContainer: {
      baseStyle: {
        p: 6,
        borderRadius: 16,
        background: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)"
      }
    }
  }
});

export default theme;
