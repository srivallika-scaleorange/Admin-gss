// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
// } from '@mui/material';
// import { VideoCall as VideoCallIcon } from '@mui/icons-material';

// const YouTubeForm = ({ editingItem, setEditingItem, onAdd, onEdit, loading }) => {
//   const [formData, setFormData] = useState({
//     title: editingItem?.title || '',
//     youtubeUrl: editingItem?.youtubeUrl || '',
//   });
//   const [errors, setErrors] = useState({ title: '', youtubeUrl: '' });

//   const validateYouTubeUrl = (url) => {
//     // Flexible regex patterns for YouTube URLs
//     const patterns = [
//       // Regular watch URLs: youtube.com/watch?v=VIDEO_ID
//       /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}(&\S*)?$/,
//       // Short URLs: youtu.be/VIDEO_ID
//       /^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]{11}(&\S*)?$/,
//       // Live URLs: youtube.com/live/VIDEO_ID with optional query params
//       /^(https?:\/\/)?(www\.)?youtube\.com\/live\/[\w-]{11}(\?\S*)?$/,
//       // Channel live URLs: youtube.com/@channel_name/live
//       /^(https?:\/\/)?(www\.)?youtube\.com\/@[\w-]+\/live(\?\S*)?$/,
//       // Watch URLs with live feature: youtube.com/watch?v=VIDEO_ID&feature=live
//       /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}&feature=live(&\S*)?$/,
//       // Embed URLs: youtube.com/embed/VIDEO_ID
//       /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]{11}(&\S*)?$/,
//       // Shorts URLs: youtube.com/shorts/VIDEO_ID
//       /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]{11}(&\S*)?$/,
//     ];

//     return patterns.some(pattern => pattern.test(url.trim()));
//   };

//   const handleChange = (field) => (event) => {
//     setFormData((prev) => ({ ...prev, [field]: event.target.value }));
//     setErrors((prev) => ({ ...prev, [field]: '' }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let valid = true;
//     const newErrors = { title: '', youtubeUrl: '' };

//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//       valid = false;
//     }
//     if (!formData.youtubeUrl.trim()) {
//       newErrors.youtubeUrl = 'YouTube URL is required';
//       valid = false;
//     } else if (!validateYouTubeUrl(formData.youtubeUrl)) {
//       newErrors.youtubeUrl = 'Invalid YouTube URL. Ensure it’s a valid video, short, or live URL.';
//       valid = false;
//     }

//     setErrors(newErrors);

//     if (valid) {
//       const data = {
//         title: formData.title.trim(),
//         youtubeUrl: formData.youtubeUrl.trim(),
//         timestamp: new Date().toISOString(),
//       };

//       if (editingItem) {
//         onEdit({ ...editingItem, ...data });
//       } else {
//         onAdd(data);
//       }
//       setFormData({ title: '', youtubeUrl: '' });
//       setEditingItem(null);
//     }
//   };

//   return (
//     <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3, border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
//       <Box display="flex" alignItems="center" gap={2} mb={2}>
//         <VideoCallIcon sx={{ color: '#6366f1', fontSize: { xs: 20, sm: 24 } }} />
//         <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
//           {editingItem ? 'Edit YouTube Video' : 'Add YouTube Video'}
//         </Typography>
//       </Box>
//       <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
//         <TextField
//           label="Video Title"
//           value={formData.title}
//           onChange={handleChange('title')}
//           error={!!errors.title}
//           helperText={errors.title}
//           sx={{
//             bgcolor: '#f8fafc',
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': { borderColor: '#d1d5db' },
//               '&:hover fieldset': { borderColor: '#6366f1' },
//               '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//               fontSize: { xs: '0.85rem', sm: '0.875rem' },
//             },
//           }}
//           size="small"
//         />
//         <TextField
//           label="YouTube URL"
//           value={formData.youtubeUrl}
//           onChange={handleChange('youtubeUrl')}
//           error={!!errors.youtubeUrl}
//           helperText={errors.youtubeUrl || 'Supports regular videos, shorts, live streams, and embedded URLs'}
//           sx={{
//             bgcolor: '#f8fafc',
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': { borderColor: '#d1d5db' },
//               '&:hover fieldset': { borderColor: '#6366f1' },
//               '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//               fontSize: { xs: '0.85rem', sm: '0.875rem' },
//             },
//           }}
//           size="small"
//         />
//         <Box display="flex" gap={2} justifyContent="flex-end">
//           {editingItem && (
//             <Button
//               variant="outlined"
//               onClick={() => {
//                 setFormData({ title: '', youtubeUrl: '' });
//                 setEditingItem(null);
//                 setErrors({ title: '', youtubeUrl: '' });
//               }}
//               sx={{
//                 borderColor: '#d1d5db',
//                 color: '#374151',
//                 '&:hover': { borderColor: '#6366f1', bgcolor: '#f3f4f6' },
//                 fontSize: { xs: '0.75rem', sm: '0.875rem' },
//               }}
//             >
//               Cancel
//             </Button>
//           )}
//           <Button
//             type="submit"
//             variant="contained"
//             disabled={loading}
//             sx={{
//               bgcolor: '#6366f1',
//               color: '#ffffff',
//               '&:hover': { bgcolor: '#4f46e5' },
//               fontSize: { xs: '0.75rem', sm: '0.875rem' },
//             }}
//           >
//             {editingItem ? 'Update Video' : 'Add Video'}
//           </Button>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// YouTubeForm.propTypes = {
//   editingItem: PropTypes.shape({
//     id: PropTypes.string,
//     title: PropTypes.string,
//     youtubeUrl: PropTypes.string,
//     timestamp: PropTypes.string,
//   }),
//   setEditingItem: PropTypes.func.isRequired,
//   onAdd: PropTypes.func.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// YouTubeForm.defaultProps = {
//   editingItem: null,
//   loading: false,
// };

// export default YouTubeForm;


import React, { useState, useEffect } from 'react'; // Add useEffect
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { VideoCall as VideoCallIcon } from '@mui/icons-material';

const YouTubeForm = ({ editingItem, setEditingItem, onAdd, onEdit, loading }) => {
  const [formData, setFormData] = useState({
    title: editingItem?.title || '',
    youtubeUrl: editingItem?.youtubeUrl || '',
  });
  const [errors, setErrors] = useState({ title: '', youtubeUrl: '' });

  // Sync formData with editingItem when editingItem changes
  useEffect(() => {
    setFormData({
      title: editingItem?.title || '',
      youtubeUrl: editingItem?.youtubeUrl || '',
    });
    setErrors({ title: '', youtubeUrl: '' }); // Reset errors when editingItem changes
  }, [editingItem]);

  const validateYouTubeUrl = (url) => {
    const patterns = [
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}(&\S*)?$/,
      /^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]{11}(&\S*)?$/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/live\/[\w-]{11}(\?\S*)?$/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/@[\w-]+\/live(\?\S*)?$/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}&feature=live(&\S*)?$/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]{11}(&\S*)?$/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]{11}(&\S*)?$/,
    ];

    return patterns.some((pattern) => pattern.test(url.trim()));
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { title: '', youtubeUrl: '' };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }
    if (!formData.youtubeUrl.trim()) {
      newErrors.youtubeUrl = 'YouTube URL is required';
      valid = false;
    } else if (!validateYouTubeUrl(formData.youtubeUrl)) {
      newErrors.youtubeUrl = 'Invalid YouTube URL. Ensure it’s a valid video, short, or live URL.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const data = {
        title: formData.title.trim(),
        youtubeUrl: formData.youtubeUrl.trim(),
        timestamp: new Date().toISOString(),
      };

      if (editingItem) {
        onEdit({ ...editingItem, ...data });
      } else {
        onAdd(data);
      }
      setFormData({ title: '', youtubeUrl: '' });
      setEditingItem(null);
    }
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3, border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <VideoCallIcon sx={{ color: '#6366f1', fontSize: { xs: 20, sm: 24 } }} />
        <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          {editingItem ? 'Edit YouTube Video' : 'Add YouTube Video'}
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Video Title"
          value={formData.title}
          onChange={handleChange('title')}
          error={!!errors.title}
          helperText={errors.title}
          sx={{
            bgcolor: '#f8fafc',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#6366f1' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
              fontSize: { xs: '0.85rem', sm: '0.875rem' },
            },
          }}
          size="small"
        />
        <TextField
          label="YouTube URL"
          value={formData.youtubeUrl}
          onChange={handleChange('youtubeUrl')}
          error={!!errors.youtubeUrl}
          helperText={errors.youtubeUrl || 'Supports regular videos, shorts, live streams, and embedded URLs'}
          sx={{
            bgcolor: '#f8fafc',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#6366f1' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
              fontSize: { xs: '0.85rem', sm: '0.875rem' },
            },
          }}
          size="small"
        />
        <Box display="flex" gap={2} justifyContent="flex-end">
          {editingItem && (
            <Button
              variant="outlined"
              onClick={() => {
                setFormData({ title: '', youtubeUrl: '' });
                setEditingItem(null);
                setErrors({ title: '', youtubeUrl: '' });
              }}
              sx={{
                borderColor: '#d1d5db',
                color: '#374151',
                '&:hover': { borderColor: '#6366f1', bgcolor: '#f3f4f6' },
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: '#6366f1',
              color: '#ffffff',
              '&:hover': { bgcolor: '#4f46e5' },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          >
            {editingItem ? 'Update Video' : 'Add Video'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

YouTubeForm.propTypes = {
  editingItem: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    youtubeUrl: PropTypes.string,
    timestamp: PropTypes.string,
  }),
  setEditingItem: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

YouTubeForm.defaultProps = {
  editingItem: null,
  loading: false,
};

export default YouTubeForm;