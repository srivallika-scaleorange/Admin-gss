// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#15803d', // Green shade similar to your text-green-600
//       dark: '#166534',
//       light: '#86efac',
//     },
//     secondary: {
//       main: '#fef08a', // Yellow shade similar to your bg-yellow-50
//       dark: '#ca8a04',
//       light: '#fef9c3',
//     },
//     error: {
//       main: '#b91c1c', // Red shade for error notifications
//     },
//     background: {
//       default: '#fef9c3', // Light yellow for background
//       paper: '#ffffff', // White for cards/tables
//     },
//     text: {
//       primary: '#1a2e05', // Dark green for text
//       secondary: '#4d7c0f', // Lighter green for secondary text
//     },
//   },
//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           borderBottom: `1px solid #fef08a`, // Yellow border for table
//         },
//         head: {
//           backgroundColor: '#fef9c3', // Yellow background for table header
//           color: '#4d7c0f', // Green text for headers
//           fontWeight: 600,
//           textTransform: 'uppercase',
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none', // Disable uppercase for buttons
//         },
//       },
//     },
//   },
// });

// export default theme;


import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Clean indigo
      dark: '#4338ca',
      light: '#a5b4fc',
    },
    secondary: {
      main: '#8b5cf6', // Soft violet
      dark: '#7c3aed',
      light: '#c4b5fd',
    },
    error: {
      main: '#ef4444', // Clean red
    },
    warning: {
      main: '#f59e0b', // Warm orange
    },
    success: {
      main: '#10b981', // Fresh green
    },
    background: {
      default: 'url("https://www.shutterstock.com/shutterstock/videos/3543505853/thumb/1.jpg?ip=x480")', // Devotional background image
      paper: 'rgba(255, 255, 255, 0.98)', // Almost opaque white for cards
    },
    text: {
      primary: '#1f2937', // Dark gray
      secondary: '#6b7280', // Medium gray
    },
    divider: '#e5e7eb',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid #f3f4f6`,
          padding: '12px 16px',
          backgroundColor: 'transparent',
        },
        head: {
          backgroundColor: '#f8fafc',
          color: '#374151',
          fontWeight: 600,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderBottom: `1px solid #e5e7eb`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 16px',
          boxShadow: 'none',
          transition: 'all 0.2s ease',
        },
        contained: {
          backgroundColor: '#6366f1',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#4338ca',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
          },
        },
        outlined: {
          borderColor: '#d1d5db',
          color: '#374151',
          '&:hover': {
            backgroundColor: '#f9fafb',
            borderColor: '#6366f1',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 8,
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f2937',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
        filled: {
          backgroundColor: '#f3f4f6',
          color: '#374151',
          '&.MuiChip-colorPrimary': {
            backgroundColor: '#eef2ff',
            color: '#4338ca',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d1d5db',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6366f1',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6366f1',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 12,
          border: '1px solid #e5e7eb',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: {
      fontWeight: 600,
      color: '#1f2937',
    },
    h2: {
      fontWeight: 600,
      color: '#1f2937',
    },
    h3: {
      fontWeight: 600,
      color: '#374151',
    },
    h4: {
      fontWeight: 500,
      color: '#4b5563',
    },
    body1: {
      lineHeight: 1.6,
      color: '#374151',
    },
    body2: {
      color: '#6b7280',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;