import { createTheme } from '@mui/material';
import { heIL } from '@mui/material/locale';

// Create RTL theme for Hebrew
const theme = createTheme(
  {
    direction: 'rtl',
    typography: {
      fontFamily: 'Rubik, Arial, sans-serif',
    },
    palette: {
      primary: {
        main: '#E3B719',
      },
      secondary: {
        main: '#6c757d',
      },
      background: {
        default: '#FEFAE0',
        paper: '#ffffff',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
  heIL // Hebrew locale
);

export default theme;
