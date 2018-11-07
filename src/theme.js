import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0BA7F4',
    },
    secondary: {
      main: '#111242',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
});

export default theme;
