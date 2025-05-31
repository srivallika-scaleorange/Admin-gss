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
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  Title,
  Link as LinkIcon,
  CalendarToday,
  Edit,
  Delete,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import YouTubeForm from './YoutubeForm';

const YouTubeVideos = ({ videos = [], loading = false, onAdd, onEdit, onDelete }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [expandedVideoId, setExpandedVideoId] = useState(null);

  const handleToggleExpand = (videoId) => {
    setExpandedVideoId(expandedVideoId === videoId ? null : videoId);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ bgcolor: 'transparent' }}>
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#6366f1', width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} />
          <Typography variant="body1" sx={{ color: '#6b7280', mt: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Loading videos...
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
                <VideoCallIcon sx={{ color: '#6366f1', fontSize: { xs: 20, sm: 24 } }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  YouTube Videos Management
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  Manage and track YouTube videos
                </Typography>
              </Box>
            </Box>
            <Box textAlign={{ xs: 'left', sm: 'right' }}>
              <Typography variant="h4" sx={{ color: '#6366f1', fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {videos.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                Total Videos
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Form and Content */}
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 3 } }}>
        <YouTubeForm
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          onAdd={onAdd}
          onEdit={onEdit}
          loading={loading}
        />

        {/* Content */}
        {videos.length === 0 ? (
          <Paper sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
            <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2, mx: 'auto', width: { xs: 64, sm: 96 }, height: { xs: 64, sm: 96 }, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, border: '1px solid #e5e7eb' }}>
              <VideoCallIcon sx={{ fontSize: { xs: 32, sm: 48 }, color: '#6b7280' }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }} gutterBottom>
              No Videos Found
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              Video records will appear here once added
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
                        <LinkIcon fontSize="small" sx={{ color: '#6366f1' }} />
                        <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          YouTube URL
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
                  {videos.map((video, index) => (
                    <TableRow
                      key={video.id}
                      sx={{
                        bgcolor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                        '&:hover': { bgcolor: '#f3f4f6' },
                        borderBottom: '1px solid #f3f4f6',
                      }}
                    >
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          {video.title || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        <Typography
                          variant="body2"
                          sx={{ color: '#374151', fontSize: { sm: '0.85rem', md: '0.875rem' } }}
                          component="a"
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noopener"
                        >
                          {video.youtubeUrl?.length > 50 ? `${video.youtubeUrl.substring(0, 50)}...` : video.youtubeUrl || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                          {video.timestamp
                            ? new Date(video.timestamp).toLocaleString('en-IN', {
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
                            onClick={() => setEditingItem(video)}
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
                            onClick={() => onDelete(video.id)}
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
                    Showing <strong style={{ color: '#374151' }}>{videos.length}</strong> videos
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Last updated: {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </Typography>
                </Box>
              </Box>
            </TableContainer>

            {/* Mobile List View */}
            <List sx={{ display: { xs: 'block', sm: 'none' }, mt: 2 }}>
              {videos.map((video, index) => (
                <ListItem
                  key={video.id}
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
                    onClick={() => handleToggleExpand(video.id)}
                    sx={{ width: '100%', p: 0, mb: 1 }}
                  >
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Title fontSize="small" sx={{ color: '#6366f1' }} />
                          <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                            {video.title || 'N/A'}
                          </Typography>
                        </Box>
                      }
                    />
                    {expandedVideoId === video.id ? <ExpandLess sx={{ color: '#6366f1' }} /> : <ExpandMore sx={{ color: '#6366f1' }} />}
                  </ListItemButton>
                  <Collapse in={expandedVideoId === video.id} timeout="auto" unmountOnExit>
                    <Box display="flex" flexDirection="column" gap={1.5} width="100%">
                      <Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <LinkIcon fontSize="small" sx={{ color: '#6366f1' }} />
                          <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                            YouTube URL
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ color: '#374151', fontSize: '0.85rem', mt: 0.5 }}
                          component="a"
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noopener"
                        >
                          {video.youtubeUrl || 'N/A'}
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
                          {video.timestamp
                            ? new Date(video.timestamp).toLocaleString('en-IN', {
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
                            onClick={() => setEditingItem(video)}
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
                            onClick={() => onDelete(video.id)}
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
                    Showing <strong style={{ color: '#374151' }}>{videos.length}</strong> videos
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

YouTubeVideos.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      youtubeUrl: PropTypes.string,
      timestamp: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

YouTubeVideos.defaultProps = {
  videos: [],
  loading: false,
};

export default YouTubeVideos;