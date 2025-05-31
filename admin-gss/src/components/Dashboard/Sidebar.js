

import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Sidebar({ activeTab, setActiveTab, handleLogout, userRole }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Define role-based tab access
  const routeAccess = {
    admin: [
      { key: 'users', label: 'Users' },
      { key: 'sankalpams', label: 'Sankalpams' },
      { key: 'notifications', label: 'Notifications' },
      { key: 'leaderboard', label: 'Leaderboard' },
      { key: 'videos', label: 'YouTube Videos' },
      { key: 'emi_payments', label: 'EMI Payments' }
    ],
    kshetralevel_admin: [
      { key: 'sankalpams', label: 'Sankalpams' },
      { key: 'notifications', label: 'Notifications' },
      { key: 'videos', label: 'YouTube Videos' }
    ],
    accountant: [
      { key: 'emi_payments', label: 'EMI Payments' }
    ]
  };

  // Select tabs based on user role, fallback to accountant
  const tabs = routeAccess[userRole] || routeAccess.accountant;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const drawerWidth = 250;

  const colors = {
    primary: '#1a1b23',
    secondary: '#2d1b69',
    accent: 'white',
    hover: '#4a148c',
    text: '#e8eaf6',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    success: '#26a69a',
    warning: '#ff7043'
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="toggle sidebar"
        onClick={toggleSidebar}
        sx={{
          display: { md: 'none' },
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1400,
          background: colors.gradient,
          color: colors.text,
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
          '&:hover': {
            background: colors.secondary,
            transform: 'scale(1.05)',
            transition: 'all 0.2s ease'
          }
        }}
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Drawer
        variant="temporary"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: colors.gradient,
            color: colors.text,
            padding: 2,
            boxSizing: 'border-box',
            borderRight: `2px solid ${colors.accent}`,
            boxShadow: '4px 0 20px rgba(0,0,0,0.3)'
          }
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 4,
            mt: 2,
            color: colors.text,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Dashboard
        </Typography>
        <List>
          {tabs.map((tab) => (
            <ListItem key={tab.key} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={activeTab === tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setIsSidebarOpen(false);
                }}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  backgroundColor: activeTab === tab.key ? colors.accent : 'transparent',
                  color: colors.text,
                  border: activeTab === tab.key ? `2px solid ${colors.warning}` : '2px solid transparent',
                  boxShadow: activeTab === tab.key ? '0 4px 12px rgba(255, 107, 107, 0.3)' : 'none',
                  '&:hover': {
                    backgroundColor: activeTab !== tab.key ? colors.hover : colors.accent,
                    transform: 'translateX(8px)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(74, 20, 140, 0.4)'
                  },
                  '&.Mui-selected': {
                    backgroundColor: colors.accent
                  }
                }}
              >
                <ListItemText
                  primary={tab.label}
                  primaryTypographyProps={{
                    fontSize: '1rem',
                    fontWeight: activeTab === tab.key ? 'bold' : 'normal'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          onClick={() => {
            handleLogout();
            setIsSidebarOpen(false);
          }}
          sx={{
            mx: 2,
            mt: 4,
            py: 1.5,
            background: 'linear-gradient(45deg, #e74c3c 30%, #c0392b 90%)',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 3,
            border: '2px solid #f39c12',
            boxShadow: '0 6px 20px rgba(231, 76, 60, 0.4)',
            '&:hover': {
              background: 'linear-gradient(45deg, #c0392b 30%, #a93226 90%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(231, 76, 60, 0.6)',
              borderColor: '#e67e22',
              transition: 'all 0.3s ease'
            }
          }}
        >
          Logout
        </Button>
      </Drawer>

      <Drawer
        variant="persistent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: colors.gradient,
            color: colors.text,
            padding: 2,
            boxSizing: 'border-box',
            top: 0,
            height: '100%',
            borderRight: `3px solid ${colors.accent}`,
            boxShadow: '4px 0 20px rgba(0,0,0,0.2)'
          }
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 4,
            mt: 2,
            color: colors.text,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Dashboard
        </Typography>
        <List>
          {tabs.map((tab) => (
            <ListItem key={tab.key} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  backgroundColor: activeTab === tab.key ? colors.accent : 'transparent',
                  color: colors.text,
                  border: activeTab === tab.key ? `2px solid ${colors.warning}` : '2px solid transparent',
                  boxShadow: activeTab === tab.key ? '0 4px 12px rgba(255, 107, 107, 0.3)' : 'none',
                  '&:hover': {
                    backgroundColor: activeTab !== tab.key ? colors.hover : colors.accent,
                    transform: 'translateX(8px)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(74, 20, 140, 0.4)'
                  },
                  '&.Mui-selected': {
                    backgroundColor: colors.accent
                  }
                }}
              >
                <ListItemText
                  primary={tab.label}
                  primaryTypographyProps={{
                    fontSize: '1rem',
                    fontWeight: activeTab === tab.key ? 'bold' : 'normal'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            mx: 2,
            mt: 4,
            py: 1.5,
            background: `linear-gradient(45deg, ${colors.warning} 30%, ${colors.accent} 90%)`,
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 3,
            boxShadow: '0 6px 20px rgba(255, 112, 67, 0.4)',
            '&:hover': {
              background: `linear-gradient(45deg, ${colors.accent} 30%, ${colors.warning} 90%)`,
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(255, 112, 67, 0.6)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          Logout
        </Button>
      </Drawer>
    </>
  );
}

export default Sidebar;