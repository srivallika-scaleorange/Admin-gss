
// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
// } from '@mui/material';
// import { Add, Edit, Cancel } from '@mui/icons-material';

// const NotificationForm = ({ editingNotification, setEditingNotification, onAdd, onEdit, loading }) => {
//   const [newNotification, setNewNotification] = useState({ title: '', body: '' });

//   // Sync form with editingNotification
//   useEffect(() => {
//     if (editingNotification) {
//       setNewNotification({
//         title: editingNotification.title || '',
//         body: editingNotification.body || '',
//       });
//     } else {
//       setNewNotification({ title: '', body: '' });
//     }
//   }, [editingNotification]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newNotification.title.trim() || !newNotification.body.trim()) {
//       return; // Prevent submission with empty fields
//     }
//     if (editingNotification) {
//       onEdit({ ...editingNotification, title: newNotification.title, body: newNotification.body });
//       setEditingNotification(null);
//     } else {
//       onAdd(newNotification);
//     }
//     setNewNotification({ title: '', body: '' });
//   };

//   const handleCancel = () => {
//     setEditingNotification(null);
//     setNewNotification({ title: '', body: '' });
//   };

//   return (
//     <Paper
//       sx={{
//         p: 3,
//         mb: 3,
//         border: 1,
//         borderColor: 'secondary.main',
//         bgcolor: 'background.paper',
//       }}
//     >
//       <Box display="flex" alignItems="center" gap={2} mb={2}>
//         <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 2 }}>
//           {editingNotification ? <Edit color="primary" /> : <Add color="primary" />}
//         </Box>
//         <Typography variant="h6" color="text.primary">
//           {editingNotification ? 'Edit Notification' : 'Add New Notification'}
//         </Typography>
//       </Box>
//       <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <TextField
//           label="Notification Title"
//           value={newNotification.title}
//           onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
//           fullWidth
//           variant="outlined"
//           size="small"
//           sx={{ bgcolor: 'secondary.light' }}
//           disabled={loading}
//         />
//         <TextField
//           label="Notification Body (text or URL)"
//           value={newNotification.body}
//           onChange={(e) => setNewNotification({ ...newNotification, body: e.target.value })}
//           fullWidth
//           variant="outlined"
//           size="small"
//           multiline
//           rows={4}
//           sx={{ bgcolor: 'secondary.light' }}
//           disabled={loading}
//         />
//         <Box display="flex" gap={2}>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             startIcon={editingNotification ? <Edit /> : <Add />}
//             disabled={loading || !newNotification.title.trim() || !newNotification.body.trim()}
//           >
//             {loading ? 'Processing...' : editingNotification ? 'Update Notification' : 'Add Notification'}
//           </Button>
//           {editingNotification && (
//             <Button
//               variant="outlined"
//               color="secondary"
//               startIcon={<Cancel />}
//               onClick={handleCancel}
//               disabled={loading}
//             >
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// NotificationForm.propTypes = {
//   editingNotification: PropTypes.shape({
//     id: PropTypes.string,
//     title: PropTypes.string,
//     body: PropTypes.string,
//     timestamp: PropTypes.string,
//   }),
//   setEditingNotification: PropTypes.func.isRequired,
//   onAdd: PropTypes.func.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
// };

// NotificationForm.defaultProps = {
//   editingNotification: null,
//   loading: false,
// };

// export default NotificationForm;


import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { Add, Edit, Cancel } from '@mui/icons-material';

const NotificationForm = ({ editingNotification, setEditingNotification, onAdd, onEdit, loading }) => {
  const [newNotification, setNewNotification] = useState({ title: '', body: '' });

  // Sync form with editingNotification
  useEffect(() => {
    if (editingNotification) {
      setNewNotification({
        title: editingNotification.title || '',
        body: editingNotification.body || '',
      });
    } else {
      setNewNotification({ title: '', body: '' });
    }
  }, [editingNotification]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNotification.title.trim() || !newNotification.body.trim()) {
      return; // Prevent submission with empty fields
    }
    if (editingNotification) {
      onEdit({ ...editingNotification, title: newNotification.title, body: newNotification.body });
      setEditingNotification(null);
    } else {
      onAdd(newNotification);
    }
    setNewNotification({ title: '', body: '' });
  };

  const handleCancel = () => {
    setEditingNotification(null);
    setNewNotification({ title: '', body: '' });
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        mb: 3,
        border: '1px solid #e5e7eb',
        borderRadius: 2,
        bgcolor: '#ffffff',
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Box sx={{ p: { xs: 0.75, sm: 1 }, bgcolor: '#f3f4f6', borderRadius: 2, border: '1px solid #e5e7eb' }}>
          {editingNotification ? <Edit sx={{ color: '#6366f1', fontSize: { xs: 18, sm: 24 } }} /> : <Add sx={{ color: '#6366f1', fontSize: { xs: 18, sm: 24 } }} />}
        </Box>
        <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          {editingNotification ? 'Edit Notification' : 'Add New Notification'}
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Notification Title"
          value={newNotification.title}
          onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            bgcolor: '#f8fafc',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#6366f1' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
              fontSize: { xs: '0.85rem', sm: '0.875rem' },
            },
          }}
          disabled={loading}
        />
        <TextField
          label="Notification Body (text or URL)"
          value={newNotification.body}
          onChange={(e) => setNewNotification({ ...newNotification, body: e.target.value })}
          fullWidth
          variant="outlined"
          size="small"
          multiline
          rows={4}
          sx={{
            bgcolor: '#f8fafc',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#6366f1' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
              fontSize: { xs: '0.85rem', sm: '0.875rem' },
            },
          }}
          disabled={loading}
        />
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={editingNotification ? <Edit /> : <Add />}
            disabled={loading || !newNotification.title.trim() || !newNotification.body.trim()}
            sx={{
              bgcolor: '#6366f1',
              '&:hover': { bgcolor: '#4338ca' },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.75, sm: 1 },
            }}
          >
            {loading ? 'Processing...' : editingNotification ? 'Update Notification' : 'Add Notification'}
          </Button>
          {editingNotification && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Cancel />}
              onClick={handleCancel}
              disabled={loading}
              sx={{
                borderColor: '#d1d5db',
                color: '#374151',
                '&:hover': { borderColor: '#6366f1', bgcolor: '#f9fafb' },
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                px: { xs: 1.5, sm: 2 },
                py: { xs: 0.75, sm: 1 },
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

NotificationForm.propTypes = {
  editingNotification: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    timestamp: PropTypes.string,
  }),
  setEditingNotification: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

NotificationForm.defaultProps = {
  editingNotification: null,
  loading: false,
};

export default NotificationForm;