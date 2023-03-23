import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  shape: {
    borderRadius: 0.5
  },
  palette: {
    primary: {
      main: '#212427'
    },
    secondary: {
      main: '#eee'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: `
          font-family: 'Bebas Neue';
          border-radius: 0.25rem;
        `
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: `
          border-radius: 0;
          border: none;
        `
      }
    },
    MuiList: {
      styleOverrides: {
        root: `
          font-family: 'Bebas Neue';
          padding: 0;
        `
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: `
          font-family: 'Bebas Neue';
        `
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: `
          font-family: 'Bebas Neue';
        `
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: `
          font-family: 'Bebas Neue';
        `
      }
    }
  }
})
