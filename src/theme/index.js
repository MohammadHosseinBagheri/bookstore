import {NativeBaseProvider, extendTheme} from 'native-base';

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontFamily: 'aviny',
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'aviny',
      },
    },
  },
  fontConfig: {
    aviny: {
      400: {
        normal: 'aviny',
      },
    },
  },
  fonts: {
    heading: 'aviny',
    body: 'aviny',
    mono: 'aviny',
  },
});

export {theme};
