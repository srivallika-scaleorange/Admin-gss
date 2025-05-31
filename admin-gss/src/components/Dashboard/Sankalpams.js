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
  Chip,
  IconButton,
  Button,
  Select,
  MenuItem,
  List,
  ListItem,
} from '@mui/material';
import {
  Person,
  Category,
  CheckCircle,
  CalendarToday,
  Search as SearchIcon,
  Edit,
} from '@mui/icons-material';

const Sankalpams = ({ sankalpams = [], loading = false, onUpdateSankalpa }) => {
  console.log('Sankalpams prop:', sankalpams);

  const [searchFilters, setSearchFilters] = useState({
    user: '',
    sankalpam_name: '',
    sankalpam_location: '',
    status: '',
    date: '',
  });
  const [editingSankalpaId, setEditingSankalpaId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleSearchChange = (field) => (event) => {
    setSearchFilters((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleEditClick = (sankalpa) => {
    setEditingSankalpaId(sankalpa.id);
    setEditValues({
      email: sankalpa.email || '',
      sankalpam_name: sankalpa.sankalpam_name || '', // Ensure sankalpam_name is always a string
      sankalpam_location: sankalpa.sankalpam_location || '',
      status: sankalpa.status || 'pending',
      joined_at: sankalpa.joined_at || '',
    });
  };
  const handleEditChange = (field) => (event) => {
    setEditValues({ ...editValues, [field]: event.target.value });
  };

  const handleSave = (sankalpaId) => {
    if (!editValues.sankalpam_name) {
      alert('Please provide sankalpam name.');
      return;
    }
    onUpdateSankalpa(sankalpaId, editValues);
    setEditingSankalpaId(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditingSankalpaId(null);
    setEditValues({});
  };

  const filteredSankalpams = sankalpams.filter((sankalpa) => {
    if (!sankalpa) return false;

    const userMatch =
      !searchFilters.user ||
      (sankalpa.email?.toLowerCase()?.includes(searchFilters.user.toLowerCase()) || false);
    const sankalpamNameMatch =
      !searchFilters.sankalpam_name ||
      (sankalpa.sankalpam_name?.toLowerCase()?.includes(searchFilters.sankalpam_name.toLowerCase()) || false);
    const sankalpamLocationMatch =
      !searchFilters.sankalpam_location ||
      (sankalpa.sankalpam_location?.toLowerCase()?.includes(searchFilters.sankalpam_location.toLowerCase()) || false);
    const statusMatch =
      !searchFilters.status ||
      (sankalpa.status?.toLowerCase()?.includes(searchFilters.status.toLowerCase()) || false);
    const dateMatch =
      !searchFilters.date ||
      (sankalpa.joined_at
        ? new Date(sankalpa.joined_at)
            .toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' })
            .toLowerCase()
            .includes(searchFilters.date.toLowerCase())
        : false);

    return userMatch && sankalpamNameMatch && sankalpamLocationMatch && statusMatch && dateMatch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      Active: { color: '#22c55e', label: 'Active' },
      Inactive: { color: '#f59e0b', label: 'Inactive' },
    };
    const config = statusConfig[status] || { color: '#6b7280', label: status || 'Unknown' };
    return (
      <Chip
        label={config.label}
        sx={{
          bgcolor: `${config.color}22`,
          color: config.color,
          border: `1px solid ${config.color}44`,
          fontWeight: 500,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          padding: { xs: '2px 4px', sm: '4px 8px' },
        }}
        size="small"
      />
    );
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ bgcolor: 'transparent' }}
      >
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#6366f1', width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} />
          <Typography variant="body1" sx={{ color: '#6b7280', mt: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Loading sankalpams...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'transparent', p: { xs: 2, sm: 3 } }}>
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 2, boxShadow: 1, mb: 3, border: '1px solid #e5e7eb' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 4 } }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box sx={{ p: { xs: 1, sm: 1.5 }, bgcolor: '#f3f4f6', borderRadius: 2, border: '1px solid #e5e7eb' }}>
                <Category sx={{ color: '#6366f1', fontSize: { xs: 20, sm: 24 } }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  Sankalpams Management
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  Manage and track all sankalpa records
                </Typography>
              </Box>
            </Box>
            <Box textAlign={{ xs: 'left', sm: 'right' }}>
              <Typography variant="h4" sx={{ color: '#6366f1', fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {filteredSankalpams.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                Total Sankalpams
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 3 } }}>
        <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 3, border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            {['user', 'sankalpam_name', 'sankalpam_location', 'status', 'date'].map((field) => (
              <TextField
                key={field}
                label={`Search ${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}`}
                value={searchFilters[field]}
                onChange={handleSearchChange(field)}
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
            ))}
          </Box>
        </Paper>

        {filteredSankalpams.length === 0 ? (
          <Paper sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
            <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2, mx: 'auto', width: { xs: 64, sm: 96 }, height: { xs: 64, sm: 96 }, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, border: '1px solid #e5e7eb' }}>
              <Category sx={{ fontSize: { xs: 32, sm: 48 }, color: '#6b7280' }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }} gutterBottom>
              No Sankalpams Found
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              {Object.values(searchFilters).some((value) => value)
                ? 'Try adjusting your search criteria'
                : 'Sankalpa records will appear here once available'}
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
                    <TableCell sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1.5, md: 2 } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Person fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          User
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1.5, md: 2 } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Category fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          Sankalpa Name
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1.5, md: 2 } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <sankalpam_location fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          sankalpam_location
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1.5, md: 2 } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          Status
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1.5, md: 2 } }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          Date
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1.5, md: 2 } }}>
                      <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSankalpams.map((sankalpa, index) => (
                    <TableRow
                      key={sankalpa.id}
                      sx={{
                        bgcolor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                        '&:hover': { bgcolor: '#f3f4f6' },
                        borderBottom: '1px solid #f3f4f6',
                      }}
                    >
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        {editingSankalpaId === sankalpa.id ? (
                          <TextField
                            size="small"
                            label="Email"
                            value={editValues.email}
                            onChange={handleEditChange('email')}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                '& fieldset': { borderColor: '#d1d5db' },
                                '&:hover fieldset': { borderColor: '#6366f1' },
                                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                fontSize: { sm: '0.85rem', md: '0.875rem' },
                              },
                            }}
                          />
                        ) : (
                          <Typography variant="body2" sx={{ color: '#374151', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                            {sankalpa.email || 'N/A'}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        {editingSankalpaId === sankalpa.id ? (
                          <TextField
                            size="small"
                            label="Sankalpa Name"
                            value={editValues.sankalpam_name}
                            onChange={handleEditChange('sankalpam_name')}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                '& fieldset': { borderColor: '#d1d5db' },
                                '&:hover fieldset': { borderColor: '#6366f1' },
                                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                fontSize: { sm: '0.85rem', md: '0.875rem' },
                              },
                            }}
                          />
                        ) : (
                          <Typography variant="body2" sx={{ color: '#374151', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                            {sankalpa.sankalpam_name || 'N/A'}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        {editingSankalpaId === sankalpa.id ? (
                          <TextField
                            size="small"
                            label="sankalpam_location"
                            value={editValues.sankalpam_location}
                            onChange={handleEditChange('sankalpam_location')}
                            multiline
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                '& fieldset': { borderColor: '#d1d5db' },
                                '&:hover fieldset': { borderColor: '#6366f1' },
                                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                fontSize: { sm: '0.85rem', md: '0.875rem' },
                              },
                            }}
                          />
                        ) : (
                          <Typography variant="body2" sx={{ color: '#374151', fontSize: { sm: '0.85rem', md: '0.875rem' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                            {sankalpa.sankalpam_location || 'N/A'}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        {editingSankalpaId === sankalpa.id ? (
                          <Select
                            size="small"
                            value={editValues.status}
                            onChange={handleEditChange('status')}
                            sx={{
                              minWidth: 100,
                              bgcolor: 'rgba(255, 255, 255, 0.9)',
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#d1d5db' },
                                '&:hover fieldset': { borderColor: '#6366f1' },
                                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                fontSize: { sm: '0.85rem', md: '0.875rem' },
                              },
                            }}
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                          </Select>
                        ) : (
                          getStatusBadge(sankalpa.status)
                        )}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          {sankalpa.joined_at
                            ? new Date(sankalpa.joined_at).toLocaleString('en-IN', {
                                timeZone: 'Asia/Kolkata',
                                dateStyle: 'medium',
                              })
                            : 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        {editingSankalpaId === sankalpa.id ? (
                          <Box display="flex" gap={1}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleSave(sankalpa.id)}
                              sx={{
                                bgcolor: '#6366f1',
                                '&:hover': { bgcolor: '#4338ca' },
                                fontSize: { sm: '0.75rem', md: '0.875rem' },
                                px: { sm: 1.5, md: 2 },
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={handleCancel}
                              sx={{
                                borderColor: '#d1d5db',
                                color: '#374151',
                                '&:hover': { borderColor: '#6366f1', bgcolor: '#f9fafb' },
                                fontSize: { sm: '0.75rem', md: '0.875rem' },
                                px: { sm: 1.5, md: 2 },
                              }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        ) : (
                          <IconButton
                            onClick={() => handleEditClick(sankalpa)}
                            sx={{
                              color: '#6b7280',
                              '&:hover': { color: '#6366f1', bgcolor: '#f3f4f6' },
                              fontSize: { sm: '1rem', md: '1.25rem' },
                            }}
                          >
                            <Edit fontSize="inherit" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box sx={{ bgcolor: '#f8fafc', p: { xs: 1.5, sm: 2 }, borderTop: '1px solid #e5e7eb' }}>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1}>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Showing <strong style={{ color: '#374151' }}>{filteredSankalpams.length}</strong> of <strong style={{ color: '#374151' }}>{sankalpams.length}</strong> sankalpams
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Last updated: {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </Typography>
                </Box>
              </Box>
            </TableContainer>

            {/* Mobile List View */}
            <List sx={{ display: { xs: 'block', sm: 'none' }, mt: 2 }}>
              {filteredSankalpams.map((sankalpa, index) => (
                <ListItem
                  key={sankalpa.id}
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
                  <Box display="flex" flexDirection="column" gap={1.5} width="100%">
                    <Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Person fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                          User
                        </Typography>
                      </Box>
                      {editingSankalpaId === sankalpa.id ? (
                        <TextField
                          size="small"
                          label="Email"
                          value={editValues.email}
                          onChange={handleEditChange('email')}
                          fullWidth
                          sx={{
                            mt: 1,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(255, 255, 255, 0.9)',
                              '& fieldset': { borderColor: '#d1d5db' },
                              '&:hover fieldset': { borderColor: '#6366f1' },
                              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                              fontSize: '0.85rem',
                            },
                          }}
                        />
                      ) : (
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.85rem', mt: 0.5 }}>
                          {sankalpa.email || 'N/A'}
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Category fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                          Sankalpa Name
                        </Typography>
                      </Box>
                      {editingSankalpaId === sankalpa.id ? (
                        <TextField
                          size="small"
                          label="Sankalpa Name"
                          value={editValues.sankalpam_name}
                          onChange={handleEditChange('sankalpam_name')}
                          fullWidth
                          sx={{
                            mt: 1,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(255, 255, 255, 0.9)',
                              '& fieldset': { borderColor: '#d1d5db' },
                              '&:hover fieldset': { borderColor: '#6366f1' },
                              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                              fontSize: '0.85rem',
                            },
                          }}
                        />
                      ) : (
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.85rem', mt: 0.5 }}>
                          {sankalpa.sankalpam_name || 'N/A'}
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <sankalpam_location fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                          sankalpam_location
                        </Typography>
                      </Box>
                      {editingSankalpaId === sankalpa.id ? (
                        <TextField
                          size="small"
                          label="sankalpam_location"
                          value={editValues.sankalpam_location}
                          onChange={handleEditChange('sankalpam_location')}
                          multiline
                          fullWidth
                          sx={{
                            mt: 1,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'rgba(255, 255, 255, 0.9)',
                              '& fieldset': { borderColor: '#d1d5db' },
                              '&:hover fieldset': { borderColor: '#6366f1' },
                              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                              fontSize: '0.85rem',
                            },
                          }}
                        />
                      ) : (
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.85rem', mt: 0.5, wordBreak: 'break-word' }}>
                          {sankalpa.sankalpam_location || 'N/A'}
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                          Status
                        </Typography>
                      </Box>
                      {editingSankalpaId === sankalpa.id ? (
                        <Select
                          size="small"
                          value={editValues.status}
                          onChange={handleEditChange('status')}
                          fullWidth
                          sx={{
                            mt: 1,
                            minWidth: 100,
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#d1d5db' },
                              '&:hover fieldset': { borderColor: '#6366f1' },
                              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                              fontSize: '0.85rem',
                            },
                          }}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                      ) : (
                        <Box mt={0.5}>{getStatusBadge(sankalpa.status)}</Box>
                      )}
                    </Box>
                    <Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                          Date
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem', mt: 0.5 }}>
                        {sankalpa.joined_at
                          ? new Date(sankalpa.joined_at).toLocaleString('en-IN', {
                              timeZone: 'Asia/Kolkata',
                              dateStyle: 'medium',
                            })
                          : 'N/A'}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                      {editingSankalpaId === sankalpa.id ? (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleSave(sankalpa.id)}
                            sx={{
                              bgcolor: '#6366f1',
                              '&:hover': { bgcolor: '#4338ca' },
                              fontSize: '0.75rem',
                              px: 1.5,
                              minWidth: 80,
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleCancel}
                            sx={{
                              borderColor: '#d1d5db',
                              color: '#374151',
                              '&:hover': { borderColor: '#6366f1', bgcolor: '#f9fafb' },
                              fontSize: '0.75rem',
                              px: 1.5,
                              minWidth: 80,
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <IconButton
                          onClick={() => handleEditClick(sankalpa)}
                          sx={{
                            color: '#6b7280',
                            '&:hover': { color: '#6366f1', bgcolor: '#f3f4f6' },
                            fontSize: '1rem',
                          }}
                        >
                          <Edit fontSize="inherit" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </ListItem>
              ))}
              <Box sx={{ bgcolor: '#f8fafc', p: 1.5, border: '1px solid #e5e7eb', borderRadius: 2 }}>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
                    Showing <strong style={{ color: '#374151' }}>{filteredSankalpams.length}</strong> of <strong style={{ color: '#374151' }}>{sankalpams.length}</strong> sankalpams
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

Sankalpams.propTypes = {
  sankalpams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string,
      sankalpam_name: PropTypes.string,
      sankalpam_location: PropTypes.string,
      status: PropTypes.string,
      joined_at: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  onUpdateSankalpa: PropTypes.func,
};

Sankalpams.defaultProps = {
  sankalpams: [],
  loading: false,
  onUpdateSankalpa: () => {},
};

export default Sankalpams;