import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: "'Jaro', sans-serif",
    body: "'Jaro', sans-serif",
  },
  styles: {
    global: {
      body: {
        fontFamily: "'Jaro', sans-serif",
      }
    }
  }
});

export default theme;