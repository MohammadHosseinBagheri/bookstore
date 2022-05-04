import {NativeBaseProvider, extendTheme} from 'native-base';

const theme = extendTheme({
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
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
