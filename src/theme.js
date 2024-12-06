// theme.js
import { extendTheme } from "@chakra-ui/react";

// Custom theme to set default font
const theme = extendTheme({
  fonts: {
    heading: "'Roboto', sans-serif",  // Set default font for headings
    body: "'Roboto', sans-serif",  // Set default font for body text
  },
});

export default theme;