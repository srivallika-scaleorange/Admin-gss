// import React, { useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   IconButton,
//   TablePagination,
//   Button,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Collapse,
// } from '@mui/material';
// import { Person, Email, Phone, AdminPanelSettings, CalendarToday, Edit, ExpandMore, ExpandLess } from '@mui/icons-material';

// const Users = ({ users = [], loading = false, onUpdateUser }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchTerms, setSearchTerms] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     role: '',
//   });
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [editValues, setEditValues] = useState({});
//   const [expandedUserId, setExpandedUserId] = useState(null);

//   const handleSearchChange = (field) => (event) => {
//     setSearchTerms({ ...searchTerms, [field]: event.target.value });
//     setPage(0);
//   };

//   const filteredUsers = useMemo(() => {
//     return users.filter((user) =>
//       Object.entries(searchTerms).every(([field, term]) =>
//         term ? (user[field] || '').toLowerCase().includes(term.toLowerCase()) : true
//       )
//     );
//   }, [users, searchTerms]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleEditClick = (user) => {
//     setEditingUserId(user.id);
//     setEditValues({
//       name: user.name || '',
//       email: user.email || '',
//       phoneNumber: user.phoneNumber || '',
//       role: user.role || 'user',
//     });
//     setExpandedUserId(user.id);
//   };
//   const handleEditChange = (field) => (event) => {
//     setEditValues({ ...editValues, [field]: event.target.value });
//   };
//   const handleSave = (userId) => {
//     onUpdateUser(userId, editValues);
//     setEditingUserId(null);
//     setEditValues({});
//   };
//   const handleCancel = () => {
//     setEditingUserId(null);
//     setEditValues({});
//   };
//   const handleToggleExpand = (userId) => {
//     setExpandedUserId(expandedUserId === userId ? null : userId);
//   };
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ bgcolor: 'transparent' }}>
//         <Box textAlign="center">
//           <CircularProgress sx={{ color: '#6366f1', width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} />
//           <Typography variant="body1" sx={{ color: '#6b7280', mt: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
//             Loading users...
//           </Typography>
//         </Box>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: '100vh', p: { xs: 2, sm: 3 } }}>
//       <Box sx={{ bgcolor: '#ffffff', borderRadius: 2, boxShadow: 1, mb: 3, border: '1px solid #e5e7eb' }}>
//         <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 4 } }}>
//           <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2}>
//             <Box display="flex" alignItems="center" gap={2}>
//               <Box sx={{ p: { xs: 1, sm: 1.5 }, bgcolor: '#f3f4f6', borderRadius: 2, border: '1px solid #e5e7eb' }}>
//                 <Person sx={{ color: '#6366f1', fontSize: { xs: 20, sm: 24 } }} />
//               </Box>
//               <Box>
//                 <Typography variant="h5" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
//                   Users Management
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
//                   Manage and track all user accounts
//                 </Typography>
//               </Box>
//             </Box>
//             <Box textAlign={{ xs: 'left', sm: 'right' }}>
//               <Typography variant="h4" sx={{ color: '#6366f1', fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
//                 {filteredUsers.length}
//               </Typography>
//               <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
//                 Total Users
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* Search Filters */}
//       <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 3 } }}>
//         <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 3, border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
//           <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
//             {[
//               { label: 'Name', field: 'name', icon: <Person fontSize="small" sx={{ color: '#6366f1' }} /> },
//               { label: 'Email', field: 'email', icon: <Email fontSize="small" sx={{ color: '#6366f1' }} /> },
//               { label: 'Phone', field: 'phoneNumber', icon: <Phone fontSize="small" sx={{ color: '#6366f1' }} /> },
//               { label: 'Role', field: 'role', icon: <AdminPanelSettings fontSize="small" sx={{ color: '#6366f1' }} /> },
//             ].map((column) => (
//               <TextField
//                 key={column.field}
//                 label={`Search ${column.label}`}
//                 value={searchTerms[column.field] || ''}
//                 onChange={handleSearchChange(column.field)}
//                 InputProps={{ startAdornment: column.icon }}
//                 sx={{
//                   flex: 1,
//                   bgcolor: '#f8fafc',
//                   '& .MuiOutlinedInput-root': {
//                     '& fieldset': { borderColor: '#d1d5db' },
//                     '&:hover fieldset': { borderColor: '#6366f1' },
//                     '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//                     fontSize: { xs: '0.85rem', sm: '0.875rem' },
//                     py: { xs: 0.5, sm: 0.75 },
//                   },
//                 }}
//                 size="small"
//               />
//             ))}
//           </Box>
//         </Paper>

//         {filteredUsers.length === 0 ? (
//           <Paper sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
//             <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2, mx: 'auto', width: { xs: 64, sm: 96 }, height: { xs: 64, sm: 96 }, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, border: '1px solid #e5e7eb' }}>
//               <Person sx={{ fontSize: { xs: 32, sm: 48 }, color: '#6b7280' }} />
//             </Box>
//             <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }} gutterBottom>
//               No Users Found
//             </Typography>
//             <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
//               {Object.values(searchTerms).some((value) => value)
//                 ? 'Try adjusting your search criteria'
//                 : 'User records will appear here once available'}
//             </Typography>
//           </Paper>
//         ) : (
//           <>
//             {/* Desktop Table View */}
//             <TableContainer
//               component={Paper}
//               sx={{
//                 display: { xs: 'none', sm: 'block' },
//                 border: '1px solid #e5e7eb',
//                 borderRadius: 2,
//                 bgcolor: '#ffffff',
//               }}
//             >
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: '#f8fafc' }}>
//                     {[
//                       { label: 'Name', field: 'name', icon: <Person fontSize="small" sx={{ color: '#6366f1' }} /> },
//                       { label: 'Email', field: 'email', icon: <Email fontSize="small" sx={{ color: '#6366f1' }} /> },
//                       { label: 'Phone', field: 'phoneNumber', icon: <Phone fontSize="small" sx={{ color: '#6366f1' }} /> },
//                       { label: 'Role', field: 'role', icon: <AdminPanelSettings fontSize="small" sx={{ color: '#6366f1' }} /> },
//                       { label: 'Joined', field: 'timestamp', icon: <CalendarToday fontSize="small" sx={{ color: '#6366f1' }} /> },
//                       { label: 'Actions', field: null },
//                     ].map((column, index) => (
//                       <TableCell key={index} sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1.5, md: 2 } }}>
//                         <Box display="flex" alignItems="center" gap={1}>
//                           {column.icon}
//                           <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
//                             {column.label}
//                           </Typography>
//                         </Box>
//                         {column.field && (
//                           <TextField
//                             size="small"
//                             placeholder={`Search ${column.label}`}
//                             value={searchTerms[column.field] || ''}
//                             onChange={handleSearchChange(column.field)}
//                             sx={{
//                               mt: 1,
//                               width: '100%',
//                               '& .MuiOutlinedInput-root': {
//                                 bgcolor: 'rgba(255, 255, 255, 0.8)',
//                                 '& fieldset': { borderColor: '#d1d5db' },
//                                 '&:hover fieldset': { borderColor: '#6366f1' },
//                                 '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//                                 fontSize: { sm: '0.85rem', md: '0.875rem' },
//                               },
//                             }}
//                           />
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredUsers
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((user, index) => (
//                       <TableRow
//                         key={user.id}
//                         sx={{
//                           bgcolor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
//                           '&:hover': { bgcolor: '#f3f4f6' },
//                           borderBottom: '1px solid #f3f4f6',
//                         }}
//                       >
//                         <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
//                           {editingUserId === user.id ? (
//                             <TextField
//                               size="small"
//                               value={editValues.name}
//                               onChange={handleEditChange('name')}
//                               sx={{
//                                 '& .MuiOutlinedInput-root': {
//                                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                                   '& fieldset': { borderColor: '#d1d5db' },
//                                   '&:hover fieldset': { borderColor: '#6366f1' },
//                                   '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//                                   fontSize: { sm: '0.85rem', md: '0.875rem' },
//                                 },
//                               }}
//                             />
//                           ) : (
//                             <Typography variant="body2" sx={{ color: '#374151', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
//                               {user.name || 'N/A'}
//                             </Typography>
//                           )}
//                         </TableCell>
//                         <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
//                           {editingUserId === user.id ? (
//                             <TextField
//                               size="small"
//                               value={editValues.email}
//                               onChange={handleEditChange('email')}
//                               sx={{
//                                 '& .MuiOutlinedInput-root': {
//                                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                                   '& fieldset': { borderColor: '#d1d5db' },
//                                   '&:hover fieldset': { borderColor: '#6366f1' },
//                                   '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//                                   fontSize: { sm: '0.85rem', md: '0.875rem' },
//                                 },
//                               }}
//                             />
//                           ) : (
//                             <Typography variant="body2" sx={{ color: '#374151', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
//                               {user.email || 'N/A'}
//                             </Typography>
//                           )}
//                         </TableCell>
//                         <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
//                           {editingUserId === user.id ? (
//                             <TextField
//                               size="small"
//                               value={editValues.phoneNumber}
//                               onChange={handleEditChange('phoneNumber')}
//                               sx={{
//                                 '& .MuiOutlinedInput-root': {
//                                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                                   '& fieldset': { borderColor: '#d1d5db' },
//                                   '&:hover fieldset': { borderColor: '#6366f1' },
//                                   '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//                                   fontSize: { sm: '0.85rem', md: '0.875rem' },
//                                 },
//                               }}
//                             />
//                           ) : (
//                             <Typography variant="body2" sx={{ color: '#374151', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
//                               {user.phoneNumber || 'N/A'}
//                             </Typography>
//                           )}
//                         </TableCell>
//                         <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
//                           {editingUserId === user.id ? (
//                             <TextField
//                               size="small"
//                               value={editValues.role}
//                               onChange={handleEditChange('role')}
//                               sx={{
//                                 '& .MuiOutlinedInput-root': {
//                                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                                   '& fieldset': { borderColor: '#d1d5db' },
//                                   '&:hover fieldset': { borderColor: '#6366f1' },
//                                   '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//                                   fontSize: { sm: '0.85rem', md: '0.875rem' },
//                                 },
//                               }}
//                             />
//                           ) : (
//                             <Box
//                               sx={{
//                                 display: 'inline-flex',
//                                 px: 2,
//                                 py: 0.5,
//                                 borderRadius: 16,
//                                 bgcolor: user.role === 'admin' ? '#eef2ff' : '#f3f4f6',
//                                 border: '1px solid',
//                                 borderColor: user.role === 'admin' ? '#c7d2fe' : '#e5e7eb',
//                               }}
//                             >
//                               <Typography
//                                 variant="caption"
//                                 sx={{
//                                   color: user.role === 'admin' ? '#4338ca' : '#6b7280',
//                                   fontWeight: 500,
//                                   textTransform: 'capitalize',
//                                   fontSize: { sm: '0.75rem', md: '0.875rem' },
//                                 }}
//                               >
//                                 {user.role || 'user'}
//                               </Typography>
//                             </Box>
//                           )}
//                         </TableCell>
//                         <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
//                           <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
//                             {user.timestamp
//                               ? new Date(user.timestamp).toLocaleString('en-IN', {
//                                   timeZone: 'Asia/Kolkata',
//                                   dateStyle: 'medium',
//                                 })
//                               : 'N/A'}
//                           </Typography>
//                         </TableCell>
//                         <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
//                           {editingUserId === user.id ? (
//                             <Box display="flex" gap={1}>
//                               <Button
//                                 variant="contained"
//                                 size="small"
//                                 onClick={() => handleSave(user.id)}
//                                 sx={{
//                                   bgcolor: '#6366f1',
//                                   '&:hover': { bgcolor: '#4338ca' },
//                                   fontSize: { sm: '0.75rem', md: '0.875rem' },
//                                   px: { sm: 1.5, md: 2 },
//                                 }}
//                               >
//                                 Save
//                               </Button>
//                               <Button
//                                 variant="outlined"
//                                 size="small"
//                                 onClick={handleCancel}
//                                 sx={{
//                                   borderColor: '#d1d5db',
//                                   color: '#374151',
//                                   '&:hover': { borderColor: '#6366f1', bgcolor: '#f9fafb' },
//                                   fontSize: { sm: '0.75rem', md: '0.875rem' },
//                                   px: { sm: 1.5, md: 2 },
//                                 }}
//                               >
//                                 Cancel
//                               </Button>
//                             </Box>
//                           ) : (
//                             <IconButton
//                               onClick={() => handleEditClick(user)}
//                               sx={{
//                                 color: '#6b7280',
//                                 '&:hover': { color: '#6366f1', bgcolor: '#f3f4f6' },
//                                 fontSize: { sm: '1rem', md: '1.25rem' },
//                               }}
//                             >
//                               <Edit fontSize="inherit" />
//                             </IconButton>
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//               <Box sx={{ bgcolor: '#f8fafc', p: { xs: 1.5, sm: 2 }, borderTop: '1px solid #e5e7eb' }}>
//                 <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1}>
//                   <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
//                     Showing <strong style={{ color: '#374151' }}>{filteredUsers.length}</strong> users
//                   </Typography>
//                   <TablePagination
//                     rowsPerPageOptions={[5, 10, 25]}
//                     component="div"
//                     count={filteredUsers.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                     sx={{
//                       '& .MuiTablePagination-toolbar': { color: '#6b7280', fontSize: { xs: '0.75rem', sm: '0.875rem' } },
//                       '& .MuiTablePagination-selectIcon': { color: '#6366f1' },
//                     }}
//                   />
//                 </Box>
//               </Box>
//             </TableContainer>

//             {/* Mobile List View */}
//             <List sx={{ display: { xs: 'block', sm: 'none' }, mt: 2 }}>
//               {filteredUsers
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((user, index) => (
//                   <ListItem
//                     key={user.id}
//                     sx={{
//                       p: 2,
//                       mb: 2,
//                       border: '1px solid #e5e7eb',
//                       borderRadius: 2,
//                       bgcolor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
//                       '&:hover': { bgcolor: '#f3f4f6' },
//                       flexDirection: 'column',
//                       alignItems: 'flex-start',
//                     }}
//                   >
//                     <ListItemButton
//                       onClick={() => handleToggleExpand(user.id)}
//                       sx={{ width: '100%', p: 0, mb: 1 }}
//                     >
//                       <ListItemText
//                         primary={
//                           <Box display="flex" alignItems="center" gap={1}>
//                             <Person fontSize="small" sx={{ color: '#6366f1' }} />
//                             <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
//                               {user.name || 'N/A'}
//                             </Typography>
//                           </Box>
//                         }
//                       />
//                       {expandedUserId === user.id ? <ExpandLess sx={{ color: '#6366f1' }} /> : <ExpandMore sx={{ color: '#6366f1' }} />}
//                     </ListItemButton>
//                     <Collapse in={expandedUserId === user.id} timeout="auto" unmountOnExit>
//                       <Box display="flex" flexDirection="column" gap={1.5} width="100%">
//                         <Box>
//                           <Box display="flex" alignItems="center" gap={1}>
//                             <Email fontSize="small" sx={{ color: '#6366f1' }} />
//                             <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
//                               Email
//                             </Typography>
//                           </Box>
//                           {editingUserId === user.id ? (
//                             <TextField
//                               size="small"
//                               value={editValues.email}
//                               onChange={handleEditChange('email')}
//                               fullWidth
//                               sx={{
//                                 mt: 1,
//                                 '& .MuiOutlinedInput-root': {
//                                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                                   '& fieldset': { borderColor: '#d1d5db' },
//                                   '&:hover fieldset': { borderColor: '#6366f1' },
//                                   '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//                                   fontSize: '0.85rem',
//                                 },
//                               }}
//                             />
//                           ) : (
//                             <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.85rem', mt: 0.5 }}>
//                               {user.email || 'N/A'}
//                             </Typography>
//                           )}
//                         </Box>
//                         <Box>
//                           <Box display="flex" alignItems="center" gap={1}>
//                             <Phone fontSize="small" sx={{ color: '#6366f1' }} />
//                             <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
//                               Phone
//                             </Typography>
//                           </Box>
//                           {editingUserId === user.id ? (
//                             <TextField
//                               size="small"
//                               value={editValues.phoneNumber}
//                               onChange={handleEditChange('phoneNumber')}
//                               fullWidth
//                               sx={{
//                                 mt: 1,
//                                 '& .MuiOutlinedInput-root': {
//                                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                                   '& fieldset': { borderColor: '#d1d5db' },
//                                   '&:hover fieldset': { borderColor: '#6366f1' },
//                                   '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//                                   fontSize: '0.85rem',
//                                 },
//                               }}
//                             />
//                           ) : (
//                             <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.85rem', mt: 0.5 }}>
//                               {user.phoneNumber || 'N/A'}
//                             </Typography>
//                           )}
//                         </Box>
//                         <Box>
//                           <Box display="flex" alignItems="center" gap={1}>
//                             <AdminPanelSettings fontSize="small" sx={{ color: '#6366f1' }} />
//                             <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
//                               Role
//                             </Typography>
//                           </Box>
//                           {editingUserId === user.id ? (
//                             <TextField
//                               size="small"
//                               value={editValues.role}
//                               onChange={handleEditChange('role')}
//                               fullWidth
//                               sx={{
//                                 mt: 1,
//                                 '& .MuiOutlinedInput-root': {
//                                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                                   '& fieldset': { borderColor: '#d1d5db' },
//                                   '&:hover fieldset': { borderColor: '#6366f1' },
//                                   '&.Mui-focused fieldset': { borderColor: '#6366f1' },
//                                   fontSize: '0.85rem',
//                                 },
//                               }}
//                             />
//                           ) : (
//                             <Box
//                               sx={{
//                                 display: 'inline-flex',
//                                 px: 2,
//                                 py: 0.5,
//                                 mt: 0.5,
//                                 borderRadius: 16,
//                                 bgcolor: user.role === 'admin' ? '#eef2ff' : '#f3f4f6',
//                                 border: '1px solid',
//                                 borderColor: user.role === 'admin' ? '#c7d2fe' : '#e5e7eb',
//                               }}
//                             >
//                               <Typography
//                                 variant="caption"
//                                 sx={{
//                                   color: user.role === 'admin' ? '#4338ca' : '#6b7280',
//                                   fontWeight: 500,
//                                   textTransform: 'capitalize',
//                                   fontSize: '0.75rem',
//                                 }}
//                               >
//                                 {user.role || 'user'}
//                               </Typography>
//                             </Box>
//                           )}
//                         </Box>
//                         <Box>
//                           <Box display="flex" alignItems="center" gap={1}>
//                             <CalendarToday fontSize="small" sx={{ color: '#6366f1' }} />
//                             <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
//                               Joined
//                             </Typography>
//                           </Box>
//                           <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem', mt: 0.5 }}>
//                             {user.timestamp
//                               ? new Date(user.timestamp).toLocaleString('en-IN', {
//                                   timeZone: 'Asia/Kolkata',
//                                   dateStyle: 'medium',
//                                 })
//                               : 'N/A'}
//                           </Typography>
//                         </Box>
//                         <Box display="flex" justifyContent="flex-end" gap={1}>
//                           {editingUserId === user.id ? (
//                             <>
//                               <Button
//                                 variant="contained"
//                                 size="small"
//                                 onClick={() => handleSave(user.id)}
//                                 sx={{
//                                   bgcolor: '#6366f1',
//                                   '&:hover': { bgcolor: '#4338ca' },
//                                   fontSize: '0.75rem',
//                                   px: 1.5,
//                                   minWidth: 80,
//                                 }}
//                               >
//                                 Save
//                               </Button>
//                               <Button
//                                 variant="outlined"
//                                 size="small"
//                                 onClick={handleCancel}
//                                 sx={{
//                                   borderColor: '#d1d5db',
//                                   color: '#374151',
//                                   '&:hover': { borderColor: '#6366f1', bgcolor: '#f9fafb' },
//                                   fontSize: '0.75rem',
//                                   px: 1.5,
//                                   minWidth: 80,
//                                 }}
//                               >
//                                 Cancel
//                               </Button>
//                             </>
//                           ) : (
//                             <IconButton
//                               onClick={() => handleEditClick(user)}
//                               sx={{
//                                 color: '#6b7280',
//                                 '&:hover': { color: '#6366f1', bgcolor: '#f3f4f6' },
//                                 fontSize: '1rem',
//                               }}
//                             >
//                               <Edit fontSize="inherit" />
//                             </IconButton>
//                           )}
//                         </Box>
//                       </Box>
//                     </Collapse>
//                   </ListItem>
//                 ))}
//               <Box sx={{ bgcolor: '#f8fafc', p: 1.5, border: '1px solid #e5e7eb', borderRadius: 2 }}>
//                 <Box display="flex" flexDirection="column" gap={1}>
//                   <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
//                     Showing <strong style={{ color: '#374151' }}>{filteredUsers.length}</strong> users
//                   </Typography>
//                   <TablePagination
//                     rowsPerPageOptions={[5, 10, 25]}
//                     component="div"
//                     count={filteredUsers.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                     sx={{
//                       '& .MuiTablePagination-toolbar': { color: '#6b7280', fontSize: '0.75rem' },
//                       '& .MuiTablePagination-selectIcon': { color: '#6366f1' },
//                     }}
//                   />
//                 </Box>
//               </Box>
//             </List>
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// Users.propTypes = {
//   users: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string,
//       email: PropTypes.string,
//       phoneNumber: PropTypes.string,
//       role: PropTypes.string,
//       timestamp: PropTypes.string,
//     })
//   ),
//   loading: PropTypes.bool,
//   onUpdateUser: PropTypes.func,
// };

// Users.defaultProps = {
//   users: [],
//   loading: false,
//   onUpdateUser: () => {},
// };

// export default Users;



import React, { useState, useMemo } from 'react';
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
  IconButton,
  TablePagination,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Person, Email, Phone, AdminPanelSettings, CalendarToday, Edit, ExpandMore, ExpandLess } from '@mui/icons-material';

const Users = ({ users = [], loading = false, onUpdateUser }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerms, setSearchTerms] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [expandedUserId, setExpandedUserId] = useState(null);

  // List of all possible roles
  const roles = ['admin', 'kshetralevel_admin', 'accountant', 'user'];

  const handleSearchChange = (field) => (event) => {
    setSearchTerms({ ...searchTerms, [field]: event.target.value });
    setPage(0);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      Object.entries(searchTerms).every(([field, term]) =>
        term ? (user[field] || '').toLowerCase().includes(term.toLowerCase()) : true
      )
    );
  }, [users, searchTerms]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditValues({
      name: user.name || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      role: user.role || 'user',
    });
    setExpandedUserId(user.id);
  };

  const handleEditChange = (field) => (event) => {
    setEditValues({ ...editValues, [field]: event.target.value });
  };

  const handleSave = (userId) => {
    onUpdateUser(userId, editValues);
    setEditingUserId(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setEditValues({});
  };

  const handleToggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ bgcolor: 'transparent' }}>
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#6366f1', width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} />
          <Typography variant="body1" sx={{ color: '#6b7280', mt: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Loading users...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', p: { xs: 2, sm: 3 } }}>
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 2, boxShadow: 1, mb: 3, border: '1px solid #e5e7eb' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 4 } }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box sx={{ p: { xs: 1, sm: 1.5 }, bgcolor: '#f3f4f6', borderRadius: 2, border: '1px solid #e5e7eb' }}>
                <Person sx={{ color: '#6366f1', fontSize: { xs: 20, sm: 24 } }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  Users Management
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  Manage and track all user accounts
                </Typography>
              </Box>
            </Box>
            <Box textAlign={{ xs: 'left', sm: 'right' }}>
              <Typography variant="h4" sx={{ color: '#6366f1', fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {filteredUsers.length}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                Total Users
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Search Filters */}
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2, sm: 3 } }}>
        <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 3, border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            {[
              { label: 'Name', field: 'name', icon: <Person fontSize="small" sx={{ color: '#6366f1' }} /> },
              { label: 'Email', field: 'email', icon: <Email fontSize="small" sx={{ color: '#6366f1' }} /> },
              { label: 'Phone', field: 'phoneNumber', icon: <Phone fontSize="small" sx={{ color: '#6366f1' }} /> },
            ].map((column) => (
              <TextField
                key={column.field}
                label={`Search ${column.label}`}
                value={searchTerms[column.field] || ''}
                onChange={handleSearchChange(column.field)}
                InputProps={{ startAdornment: column.icon }}
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
            <FormControl
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
            >
              <InputLabel id="role-search-label">Search Role</InputLabel>
              <Select
                labelId="role-search-label"
                label="Search Role"
                value={searchTerms.role || ''}
                onChange={handleSearchChange('role')}
                startAdornment={<AdminPanelSettings fontSize="small" sx={{ color: '#6366f1', mr: 1 }} />}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {filteredUsers.length === 0 ? (
          <Paper sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: 2, bgcolor: '#ffffff' }}>
            <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2, mx: 'auto', width: { xs: 64, sm: 96 }, height: { xs: 64, sm: 96 }, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, border: '1px solid #e5e7eb' }}>
              <Person sx={{ fontSize: { xs: 32, sm: 48 }, color: '#6b7280' }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#1f2937', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }} gutterBottom>
              No Users Found
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              {Object.values(searchTerms).some((value) => value)
                ? 'Try adjusting your search criteria'
                : 'User records will appear here once available'}
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
                    {[
                      { label: 'Name', field: 'name', icon: <Person fontSize="small" sx={{ color: '#6366f1' }} /> },
                      { label: 'Email', field: 'email', icon: <Email fontSize="small" sx={{ color: '#6366f1' }} /> },
                      { label: 'Phone', field: 'phoneNumber', icon: <Phone fontSize="small" sx={{ color: '#6366f1' }} /> },
                      { label: 'Role', field: 'role', icon: <AdminPanelSettings fontSize="small" sx={{ color: '#6366f1' }} /> },
                      { label: 'Joined', field: 'timestamp', icon: <CalendarToday fontSize="small" sx={{ color: '#6366f1' }} /> },
                      { label: 'Actions', field: null },
                    ].map((column, index) => (
                      <TableCell key={index} sx={{ borderBottom: '1px solid #e5e7eb', py: { sm: 1.5, md: 2 } }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          {column.icon}
                          <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                            {column.label}
                          </Typography>
                        </Box>
                        {column.field && column.field !== 'role' && (
                          <TextField
                            size="small"
                            placeholder={`Search ${column.label}`}
                            value={searchTerms[column.field] || ''}
                            onChange={handleSearchChange(column.field)}
                            sx={{
                              mt: 1,
                              width: '100%',
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                '& fieldset': { borderColor: '#d1d5db' },
                                '&:hover fieldset': { borderColor: '#6366f1' },
                                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                fontSize: { sm: '0.85rem', md: '0.875rem' },
                              },
                            }}
                          />
                        )}
                        {column.field === 'role' && (
                          <FormControl
                            sx={{
                              mt: 1,
                              width: '100%',
                              '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                '& fieldset': { borderColor: '#d1d5db' },
                                '&:hover fieldset': { borderColor: '#6366f1' },
                                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                fontSize: { sm: '0.85rem', md: '0.875rem' },
                              },
                            }}
                            size="small"
                          >
                            <InputLabel id="role-search-table-label">Search Role</InputLabel>
                            <Select
                              labelId="role-search-table-label"
                              label="Search Role"
                              value={searchTerms.role || ''}
                              onChange={handleSearchChange('role')}
                            >
                              <MenuItem value="">
                                <em>All</em>
                              </MenuItem>
                              {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                  {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => (
                      <TableRow
                        key={user.id}
                        sx={{
                          bgcolor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                          '&:hover': { bgcolor: '#f3f4f6' },
                          borderBottom: '1px solid #f3f4f6',
                        }}
                      >
                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                          {editingUserId === user.id ? (
                            <TextField
                              size="small"
                              value={editValues.name}
                              onChange={handleEditChange('name')}
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
                              {user.name || 'N/A'}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                          {editingUserId === user.id ? (
                            <TextField
                              size="small"
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
                              {user.email || 'N/A'}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                          {editingUserId === user.id ? (
                            <TextField
                              size="small"
                              value={editValues.phoneNumber}
                              onChange={handleEditChange('phoneNumber')}
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
                              {user.phoneNumber || 'N/A'}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                          {editingUserId === user.id ? (
                            <FormControl
                              sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                                  '& fieldset': { borderColor: '#d1d5db' },
                                  '&:hover fieldset': { borderColor: '#6366f1' },
                                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                  fontSize: { sm: '0.85rem', md: '0.875rem' },
                                },
                              }}
                              size="small"
                            >
                              <InputLabel id={`role-edit-${user.id}-label`}>Role</InputLabel>
                              <Select
                                labelId={`role-edit-${user.id}-label`}
                                label="Role"
                                value={editValues.role || 'user'}
                                onChange={handleEditChange('role')}
                              >
                                {roles.map((role) => (
                                  <MenuItem key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          ) : (
                            <Box
                              sx={{
                                display: 'inline-flex',
                                px: 2,
                                py: 0.5,
                                borderRadius: 16,
                                bgcolor: user.role === 'admin' ? '#eef2ff' : '#f3f4f6',
                                border: '1px solid',
                                borderColor: user.role === 'admin' ? '#c7d2fe' : '#e5e7eb',
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color: user.role === 'admin' ? '#4338ca' : '#6b7280',
                                  fontWeight: 500,
                                  textTransform: 'capitalize',
                                  fontSize: { sm: '0.75rem', md: '0.875rem' },
                                }}
                              >
                                {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).replace('_', ' ') : 'User'}
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                          <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { sm: '0.85rem', md: '0.875rem' } }}>
                            {user.timestamp
                              ? new Date(user.timestamp).toLocaleString('en-IN', {
                                  timeZone: 'Asia/Kolkata',
                                  dateStyle: 'medium',
                                })
                              : 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f3f4f6', py: { sm: 1, md: 1.5 } }}>
                          {editingUserId === user.id ? (
                            <Box display="flex" gap={1}>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleSave(user.id)}
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
                              onClick={() => handleEditClick(user)}
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
                    Showing <strong style={{ color: '#374151' }}>{filteredUsers.length}</strong> users
                  </Typography>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      '& .MuiTablePagination-toolbar': { color: '#6b7280', fontSize: { xs: '0.75rem', sm: '0.875rem' } },
                      '& .MuiTablePagination-selectIcon': { color: '#6366f1' },
                    }}
                  />
                </Box>
              </Box>
            </TableContainer>

            {/* Mobile List View */}
            <List sx={{ display: { xs: 'block', sm: 'none' }, mt: 2 }}>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <ListItem
                    key={user.id}
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
                      onClick={() => handleToggleExpand(user.id)}
                      sx={{ width: '100%', p: 0, mb: 1 }}
                    >
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Person fontSize="small" sx={{ color: '#6366f1' }} />
                            <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                              {user.name || 'N/A'}
                            </Typography>
                          </Box>
                        }
                      />
                      {expandedUserId === user.id ? <ExpandLess sx={{ color: '#6366f1' }} /> : <ExpandMore sx={{ color: '#6366f1' }} />}
                    </ListItemButton>
                    <Collapse in={expandedUserId === user.id} timeout="auto" unmountOnExit>
                      <Box display="flex" flexDirection="column" gap={1.5} width="100%">
                        <Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Email fontSize="small" sx={{ color: '#6366f1' }} />
                            <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                              Email
                            </Typography>
                          </Box>
                          {editingUserId === user.id ? (
                            <TextField
                              size="small"
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
                              {user.email || 'N/A'}
                            </Typography>
                          )}
                        </Box>
                        <Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Phone fontSize="small" sx={{ color: '#6366f1' }} />
                            <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                              Phone
                            </Typography>
                          </Box>
                          {editingUserId === user.id ? (
                            <TextField
                              size="small"
                              value={editValues.phoneNumber}
                              onChange={handleEditChange('phoneNumber')}
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
                              {user.phoneNumber || 'N/A'}
                            </Typography>
                          )}
                        </Box>
                        <Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <AdminPanelSettings fontSize="small" sx={{ color: '#6366f1' }} />
                            <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                              Role
                            </Typography>
                          </Box>
                          {editingUserId === user.id ? (
                            <FormControl
                              sx={{
                                mt: 1,
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                                  '& fieldset': { borderColor: '#d1d5db' },
                                  '&:hover fieldset': { borderColor: '#6366f1' },
                                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                                  fontSize: '0.85rem',
                                },
                              }}
                              size="small"
                            >
                              <InputLabel id={`role-edit-mobile-${user.id}-label`}>Role</InputLabel>
                              <Select
                                labelId={`role-edit-mobile-${user.id}-label`}
                                label="Role"
                                value={editValues.role || 'user'}
                                onChange={handleEditChange('role')}
                              >
                                {roles.map((role) => (
                                  <MenuItem key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          ) : (
                            <Box
                              sx={{
                                display: 'inline-flex',
                                px: 2,
                                py: 0.5,
                                mt: 0.5,
                                borderRadius: 16,
                                bgcolor: user.role === 'admin' ? '#eef2ff' : '#f3f4f6',
                                border: '1px solid',
                                borderColor: user.role === 'admin' ? '#c7d2fe' : '#e5e7eb',
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color: user.role === 'admin' ? '#4338ca' : '#6b7280',
                                  fontWeight: 500,
                                  textTransform: 'capitalize',
                                  fontSize: '0.75rem',
                                }}
                              >
                                {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).replace('_', ' ') : 'User'}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        <Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <CalendarToday fontSize="small" sx={{ color: '#6366f1' }} />
                            <Typography variant="subtitle2" sx={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
                              Joined
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem', mt: 0.5 }}>
                            {user.timestamp
                              ? new Date(user.timestamp).toLocaleString('en-IN', {
                                  timeZone: 'Asia/Kolkata',
                                  dateStyle: 'medium',
                                })
                              : 'N/A'}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-end" gap={1}>
                          {editingUserId === user.id ? (
                            <>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleSave(user.id)}
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
                              onClick={() => handleEditClick(user)}
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
                    </Collapse>
                  </ListItem>
                ))}
              <Box sx={{ bgcolor: '#f8fafc', p: 1.5, border: '1px solid #e5e7eb', borderRadius: 2 }}>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
                    Showing <strong style={{ color: '#374151' }}>{filteredUsers.length}</strong> users
                  </Typography>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      '& .MuiTablePagination-toolbar': { color: '#6b7280', fontSize: '0.75rem' },
                      '& .MuiTablePagination-selectIcon': { color: '#6366f1' },
                    }}
                  />
                </Box>
              </Box>
            </List>
          </>
        )}
      </Box>
    </Box>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
      role: PropTypes.string,
      timestamp: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  onUpdateUser: PropTypes.func,
};

Users.defaultProps = {
  users: [],
  loading: false,
  onUpdateUser: () => {},
};

export default Users;