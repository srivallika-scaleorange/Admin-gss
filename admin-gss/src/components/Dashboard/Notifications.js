
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Title,
  Description,
  CalendarToday,
  Search as SearchIcon,
  Edit,
  Delete,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import NotificationForm from './NotificationForm';

const Notifications = ({ notifications = [], loading = false, onAdd, onEdit, onDelete }) => {
  console.log('Notifications prop:', notifications);

  const [editingNotification, setEditingNotification] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    title: '',
    body: '',
    timestamp: '',
  });
  const [expandedNotificationId, setExpandedNotificationId] = useState(null);

  const handleSearchChange = (field) => (event) => {
    setSearchFilters((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleToggleExpand = (notificationId) => {
    setExpandedNotificationId(expandedNotificationId === notificationId ? null : notificationId);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (!notification) return false;

    const titleMatch =
      !searchFilters.title ||
      (notification.title?.toLowerCase()?.includes(searchFilters.title.toLowerCase()) || false);
    const bodyMatch =
      !searchFilters.body ||
      (notification.body?.toLowerCase()?.includes(searchFilters.body.toLowerCase()) || false);
    const dateMatch =
      !searchFilters.timestamp ||
      (notification.timestamp
        ? new Date(notification.timestamp)
            .toLocaleString('en-IN', {
              timeZone: 'Asia/Kolkata',
              dateStyle: 'medium',
              timeStyle: 'short',
            })
            .toLowerCase()
            .includes(searchFilters.timestamp.toLowerCase())
        : false);

    return titleMatch && bodyMatch && dateMatch;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ bgcolor: 'transparent' }}>
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#6366f1', width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} />
          <Typography variant="body1" sx={{ color: '#6b7280', mt: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Loading notifications...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'transparent', p: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 2, boxShadow: 1, mb: 3, border: '1px solid #e5e7eb' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 3 } }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box sx={{ p: { xs: 0.75, sm: 1 }, bgcolor: '#f3f4f6', borderRadius: 2, border: '1px solid #e5e7eb' }}>
                <NotificationsIcon sx={{ color: '#6366f1', fontSize: { xs: 20, sm: 24 } }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  Notifications Management
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  Manage and track all notifications
                </Typography>
              </Box>
            </Box>
            <Box textAlign={{ xs: 'left', sm: 'right' }}>
              <Typography variant="h4" sx={{ color: '#6366f1', fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {filteredNotifications.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                Total Notifications
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Notification Form and Content */}
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 3 } }}>
        <NotificationForm
          editingNotification={editingNotification}
          setEditingNotification={setEditingNotification}
          onAdd={onAdd}
          onEdit={onEdit}
          loading={loading}
        />

        {/* Search Filters */}
        <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 3, border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            <TextField
              label="Search Title"
              value={searchFilters.title}
              onChange={handleSearchChange('title')}
              InputProps={{ startAdornment: <SearchIcon sx={{ color: '#6366f1', mr: 1, fontSize: { xs: 18, sm: 20 } }} /> }}
              sx={{
                flex: 1,
                bgcolor: '#f8fafc',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                  fontSize: { xs: '0.85rem', sm: '0.875rem' },
                  py: { xs: 0.5, sm: 0.75 },
                },
              }}
              size="small"
            />
            <TextField
              label="Search Body"
              value={searchFilters.body}
              onChange={handleSearchChange('body')}
              InputProps={{ startAdornment: <SearchIcon sx={{ color: '#6366f1', mr: 1, fontSize: { xs: 18, sm: 20 } }} /> }}
              sx={{
                flex: 1,
                bgcolor: '#f8fafc',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                  fontSize: { xs: '0.85rem', sm: '0.875rem' },
                  py: { xs: 0.5, sm: 0.75 },
                },
              }}
              size="small"
            />
            <TextField
              label="Search Date"
              value={searchFilters.timestamp}
              onChange={handleSearchChange('timestamp')}
              InputProps={{ startAdornment: <SearchIcon sx={{ color: '#6366f1', mr: 1, fontSize: { xs: 18, sm: 20 } }} /> }}
              sx={{
                flex: 1,
                bgcolor: '#f8fafc',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                  fontSize: { xs: '0.85rem', sm: '0.875rem' },
                  py: { xs: 0.5, sm: 0.75 },
                },
              }}
              size="small"
            />
          </Box>
        </Paper>

        {/* Content */}
        {filteredNotifications.length === 0 ? (
          <Paper sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
            <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2, mx: 'auto', width: { xs: 64, sm: 96 }, height: { xs: 64, sm: 96 }, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, border: '1px solid #e5e7eb' }}>
              <NotificationsIcon sx={{ fontSize: { xs: 32, sm: 48 }, color: '#6b7280' }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }} gutterBottom>
              No Notifications Found
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              {Object.values(searchFilters).some((value) => value)
                ? 'Try adjusting your search criteria'
                : 'Notification records will appear here once available'}
            </Typography>
          </Paper>
        ) : (
          <>
            {/* Desktop Table View */}
            <TableContainer
              component={Paper}
              sx={{
                display: { xs: 'none', sm: 'block' },
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                bgcolor: '#ffffff',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    <TableCell sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1, md: 1.5 } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Title fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          Title
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1, md: 1.5 } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Description fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          Body
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1, md: 1.5 } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          Date
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1, md: 1.5 } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          Actions
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredNotifications.map((notification, index) => (
                    <TableRow
                      key={notification.id}
                      sx={{
                        bgcolor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                        '&:hover': { bgcolor: '#f3f4f6' },
                        borderBottom: '1px solid #f3f4f6',
                      }}
                    >
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          {notification.title || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          {notification.body?.length > 50
                            ? `${notification.body.substring(0, 50)}...`
                            : notification.body || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          {notification.timestamp
                            ? new Date(notification.timestamp).toLocaleString('en-IN', {
                                timeZone: 'Asia/Kolkata',
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              })
                            : 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        <Box display="flex" gap={1}>
                          <Button
                            variant="contained"
                            startIcon={<Edit />}
                            onClick={() => setEditingNotification(notification)}
                            sx={{
                              bgcolor: '#f59e0b',
                              color: '#1f2937',
                              '&:hover': { bgcolor: '#d97706' },
                              fontSize: { sm: '0.75rem', md: '0.875rem' },
                              px: { sm: 1.5, md: 2 },
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={<Delete />}
                            onClick={() => onDelete(notification.id)}
                            sx={{
                              bgcolor: '#ef4444',
                              color: '#ffffff',
                              '&:hover': { bgcolor: '#dc2626' },
                              fontSize: { sm: '0.75rem', md: '0.875rem' },
                              px: { sm: 1.5, md: 2 },
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box sx={{ bgcolor: '#f8fafc', p: { xs: 1.5, sm: 2 }, borderTop: '1px solid #e5e7eb' }}>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1}>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Showing <strong style={{ color: '#374151' }}>{filteredNotifications.length}</strong> of <strong style={{ color: '#374151' }}>{notifications.length}</strong> notifications
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Last updated: {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </Typography>
                </Box>
              </Box>
            </TableContainer>

            {/* Mobile List View */}
            <List sx={{ display: { xs: 'block', sm: 'none' }, mt: 2 }}>
              {filteredNotifications.map((notification, index) => (
                <ListItem
                  key={notification.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: '1px solid #e5e7eb',
                    borderRadius: 2,
                    bgcolor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                    '&:hover': { bgcolor: '#f3f4f6' },
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <ListItemButton
                    onClick={() => handleToggleExpand(notification.id)}
                    sx={{ width: '100%', p: 0, mb: 1 }}
                  >
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Title fontSize="small" sx={{ color: '#6366f1' }} />
                          <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                            {notification.title || 'N/A'}
                          </Typography>
                        </Box>
                      }
                    />
                    {expandedNotificationId === notification.id ? <ExpandLess sx={{ color: '#6366f1' }} /> : <ExpandMore sx={{ color: '#6366f1' }} />}
                  </ListItemButton>
                  <Collapse in={expandedNotificationId === notification.id} timeout="auto" unmountOnExit>
                    <Box display="flex" flexDirection="column" gap={1.5} width="100%">
                      <Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Description fontSize="small" sx={{ color: '#6366f1' }} />
                          <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                            Body
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.85rem', mt: 0.5 }}>
                          {notification.body || 'N/A'}
                        </Typography>
                      </Box>
                      <Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <CalendarToday fontSize="small" sx={{ color: '#6366f1' }} />
                          <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                            Date
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem', mt: 0.5 }}>
                          {notification.timestamp
                            ? new Date(notification.timestamp).toLocaleString('en-IN', {
                                timeZone: 'Asia/Kolkata',
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              })
                            : 'N/A'}
                        </Typography>
                      </Box>
                      <Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                            Actions
                          </Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" gap={1} mt={1}>
                          <Button
                            variant="contained"
                            startIcon={<Edit />}
                            onClick={() => setEditingNotification(notification)}
                            sx={{
                              bgcolor: '#f59e0b',
                              color: '#1f2937',
                              '&:hover': { bgcolor: '#d97706' },
                              fontSize: '0.75rem',
                              px: 1.5,
                              py: 0.75,
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={<Delete />}
                            onClick={() => onDelete(notification.id)}
                            sx={{
                              bgcolor: '#ef4444',
                              color: '#ffffff',
                              '&:hover': { bgcolor: '#dc2626' },
                              fontSize: '0.75rem',
                              px: 1.5,
                              py: 0.75,
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Collapse>
                </ListItem>
              ))}
              <Box sx={{ bgcolor: '#f8fafc', p: 1.5, border: '1px solid #e5e7eb', borderRadius: 2 }}>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
                    Showing <strong style={{ color: '#374151' }}>{filteredNotifications.length}</strong> of <strong style={{ color: '#374151' }}>{notifications.length}</strong> notifications
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
                    Last updated: {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </Typography>
                </Box>
              </Box>
            </List>
          </>
        )}
      </Box>
    </Box>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      body: PropTypes.string,
      timestamp: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  notifications: [],
  loading: false,
};

export default Notifications;