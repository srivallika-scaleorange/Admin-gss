import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import Sidebar from './Sidebar';
import Users from './Users';
import Sankalpams from './Sankalpams';
import Notifications from './Notifications';
import Leaderboard from './Leaderboard';
import YouTubeVideos from './YoutubeVideos';
import EmiPayments from './EmiPayments';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoxO_n9LLMBKEVu6WdBjKwivnVofPymy8",
  authDomain: "gss-application.firebaseapp.com",
  projectId: "gss-application",
  storageBucket: "gss-application.firebasestorage.app",
  messagingSenderId: "892589054641",
  appId: "1:892589054641:web:fc4bd659e82e07dce7a090",
  measurementId: "G-DDSV3NVS7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userRole = user.role || 'accountant'; // Fallback to restrictive role

  // Extract tab from URL path
  const getTabFromPath = () => {
    const pathSegments = location.pathname.split('/');
    const tab = pathSegments[pathSegments.length - 1];
    return ['users', 'payments', 'sankalpams', 'notifications', 'leaderboard', 'videos', 'emi_payments'].includes(tab) ? tab : 'users';
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [sankalpams, setSankalpams] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [videos, setVideos] = useState([]);
  const [emi_payments, setEmiPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update activeTab when URL changes
  useEffect(() => {
    const newTab = getTabFromPath();
    setActiveTab(newTab);
  }, [location.pathname]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Custom setActiveTab that updates the URL
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab}`, { replace: true });
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      switch (activeTab) {
        case 'users':
          await fetchUsers();
          break;
        case 'payments':
          await fetchPayments();
          break;
        case 'sankalpams':
          await fetchSankalpams();
          break;
        case 'notifications':
          await fetchNotifications();
          break;
        case 'videos':
          await fetchVideos();
          break;
        case 'leaderboard':
          // No separate fetch needed
          break;
        case 'emi_payments':
          await fetchEmiPayments();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error fetching data for ${activeTab}:`, error);
      setError('Failed to load data. Please try again.');
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched users:', usersList);
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setError('Failed to fetch users.');
    }
  };

  const fetchPayments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'payments'));
      const paymentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched payments:', paymentsList);
      setPayments(paymentsList);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setPayments([]);
      setError('Failed to fetch payments.');
    }
  };

  const fetchSankalpams = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'sankalpams'));
      const sankalpaList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched sankalpams:', sankalpaList);
      setSankalpams(sankalpaList);
    } catch (error) {
      console.error('Error fetching sankalpams:', error);
      setSankalpams([]);
      setError('Failed to fetch sankalpams.');
    }
  };

  const fetchNotifications = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'notifications'));
      const notificationsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched notifications:', notificationsList);
      setNotifications(notificationsList);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
      setError('Failed to fetch notifications.');
    }
  };

  const fetchVideos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'videos'));
      const videosList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched videos:', videosList);
      setVideos(videosList);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos([]);
      setError('Failed to fetch videos.');
    }
  };

  const fetchEmiPayments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'emi_payments'));
      const emiPaymentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched EMI payments:', emiPaymentsList);
      setEmiPayments(emiPaymentsList);
    } catch (error) {
      console.error('Error fetching EMI payments:', error);
      setEmiPayments([]);
      setError('Failed to fetch EMI payments.');
    }
  };

  const handleAddNotification = async (notificationData) => {
    if (!notificationData.title?.trim() || !notificationData.body?.trim()) {
      alert('Please provide both title and body for the notification.');
      return;
    }
    try {
      setLoading(true);
      const payload = {
        title: notificationData.title,
        body: notificationData.body,
        timestamp: new Date().toISOString(),
      };
      await addDoc(collection(db, 'notifications'), payload);
      await fetchNotifications();
      alert('Notification added successfully.');
    } catch (error) {
      console.error('Error adding notification:', error);
      alert('Failed to add notification.');
    }
    setLoading(false);
  };

  const handleEditNotification = async (notificationData) => {
    if (!notificationData.title?.trim() || !notificationData.body?.trim()) {
      alert('Please provide both title and body for the notification.');
      return;
    }
    try {
      setLoading(true);
      const payload = {
        title: notificationData.title,
        body: notificationData.body,
        timestamp: notificationData.timestamp,
      };
      await updateDoc(doc(db, 'notifications', notificationData.id), payload);
      await fetchNotifications();
      alert('Notification updated successfully.');
    } catch (error) {
      console.error('Error editing notification:', error);
      alert('Failed to edit notification.');
    }
    setLoading(false);
  };

  const handleDeleteNotification = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'notifications', id));
      await fetchNotifications();
      alert('Notification deleted successfully.');
    } catch (error) {
      console.error('Error deleting notification:', error);
      alert('Failed to delete notification.');
    }
    setLoading(false);
  };

  const handleAddVideo = async (videoData) => {
    if (!videoData.title?.trim() || !videoData.youtubeUrl?.trim()) {
      alert('Please provide both title and YouTube URL.');
      return;
    }
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})(\?.*)?$/;
    if (!youtubeUrlRegex.test(videoData.youtubeUrl)) {
      alert('Please provide a valid YouTube URL.');
      return;
    }
    try {
      setLoading(true);
      const payload = {
        title: videoData.title,
        youtubeUrl: videoData.youtubeUrl,
        timestamp: new Date().toISOString(),
      };
      await addDoc(collection(db, 'videos'), payload);
      await fetchVideos();
      alert('Video added successfully.');
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Failed to add video.');
    }
    setLoading(false);
  };

  // const handleEditVideo = async (videoData) => {
  //   if (!videoData.title?.trim() || !videoData.youtubeUrl?.trim()) {
  //     alert('Please provide both title and YouTube URL.');
  //     return;
  //   }
  //   const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})(\?.*)?$/;
  //   if (!youtubeUrlRegex.test(videoData.youtubeUrl)) {
  //     alert('Please provide a valid YouTube URL.');
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const payload = {
  //       title: videoData.title,
  //       youtubeUrl: videoData.youtubeUrl,
  //       timestamp: videoData.timestamp || new Date().toISOString(),
  //     };
  //     await updateDoc(doc(db, 'videos', videoData.id), payload);
  //     await fetchVideos();
  //     alert('Video updated successfully.');
  //   } catch (error) {
  //     console.error('Error editing video:', error);
  //     alert('Failed to edit video.');
  //   }
  //   setLoading(false);
  // };
  const handleEditVideo = async (videoData) => {
    console.log('Received video data for edit:', videoData); // This should show the full object
    
    // Check if videoData is just an ID (wrong) or a full object (correct)
    if (typeof videoData === 'string') {
      console.error('ERROR: Received only ID instead of full video object:', videoData);
      return;
    }
    
    if (!videoData.title?.trim() || !videoData.youtubeUrl?.trim()) {
      console.log('Validation failed - Title:', videoData.title, 'URL:', videoData.youtubeUrl);
      alert('Please provide both title and YouTube URL.');
      return;
    }
    
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})(\?.*)?$/;
    if (!youtubeUrlRegex.test(videoData.youtubeUrl)) {
      alert('Please provide a valid YouTube URL.');
      return;
    }
    
    try {
      setLoading(true);
      const payload = {
        title: videoData.title.trim(),
        youtubeUrl: videoData.youtubeUrl.trim(),
        timestamp: videoData.timestamp || new Date().toISOString(),
      };
      
      await updateDoc(doc(db, 'videos', videoData.id), payload);
      await fetchVideos();
      alert('Video updated successfully.');
    } catch (error) {
      console.error('Error editing video:', error);
      alert('Failed to edit video.');
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteVideo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'videos', id));
      await fetchVideos();
      alert('Video deleted successfully.');
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video.');
    }
    setLoading(false);
  };

  const handleUpdateUser = async (userId, updatedData) => {
    if (!updatedData.name?.trim() || !updatedData.email?.trim()) {
      alert('Please provide both name and email for the user.');
      return;
    }
    try {
      setLoading(true);
      const payload = {
        name: updatedData.name,
        email: updatedData.email,
        phoneNumber: updatedData.phoneNumber || '',
        role: updatedData.role || 'user',
        timestamp: updatedData.timestamp || new Date().toISOString(),
      };
      await updateDoc(doc(db, 'users', userId), payload);
      await fetchUsers();
      alert('User updated successfully.');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    }
    setLoading(false);
  };

  const handleUpdateEmiPayment = async (emiPaymentId, updatedData) => {
    if (
      !updatedData.user_id?.trim() ||
      !updatedData.amount ||
      !updatedData.membership_type ||
      !updatedData.payment_status
    ) {
      alert('Please provide user ID, amount, membership type, and payment status.');
      return;
    }
    try {
      setLoading(true);
      const existingEmiPayment = emi_payments.find((payment) => payment.id === emiPaymentId) || {};
      const payload = {
        user_id: updatedData.user_id.trim(),
        amount: parseFloat(updatedData.amount) || 0,
        membership_type: updatedData.membership_type.trim(),
        payment_status: updatedData.payment_status || 'pending',
        payment_month: updatedData.payment_month || existingEmiPayment.payment_month || '',
        transaction_id: updatedData.transaction_id?.trim() || '',
        sankalpam_id: updatedData.sankalpam_id?.trim() || '',
        receipt_image: updatedData.receipt_image || '',
        created_at: updatedData.created_at || existingEmiPayment.created_at || new Date().toISOString(),
      };
      console.log('Updating EMI payment with payload:', payload);

      // Update EMI payment in Firestore
      await updateDoc(doc(db, 'emi_payments', emiPaymentId), payload);

      // Update user's paidmonths if payment_status changes to 'approved'
      if (updatedData.payment_status === 'approved' && existingEmiPayment.payment_status !== 'approved') {
        const userId = updatedData.user_id.trim();
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef); // Fixed: Use getDoc for single document

        if (userDoc.exists()) {
          const currentUser = userDoc.data();
          const currentPaidMonths = parseFloat(currentUser.paidmonths) || 0;
          let increment = 0;
          const membershipType = updatedData.membership_type.trim().replace(/\s+/g, '');
          if (membershipType === '12months') {
            increment = 21;
          } else if (membershipType === '24months') {
            increment = 10.5;
          }

          if (increment > 0) {
            const newPaidMonths = currentPaidMonths + increment;
            await updateDoc(userDocRef, {
              paidmonths: newPaidMonths
            });
            console.log(`Updated user ${userId} paidmonths from ${currentPaidMonths} to ${newPaidMonths}`);
          }
        }
      }

      await fetchEmiPayments();
      alert('EMI Payment updated successfully.');
    } catch (error) {
      console.error('Error updating EMI payment:', {
        message: error.message,
        code: error.code,
      });
      alert(`Failed to update EMI payment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSankalpa = async (sankalpaId, updatedData) => {
    try {
      setLoading(true);
      const existingSankalpa = sankalpams.find((sankalpa) => sankalpa.id === sankalpaId) || {};
      const payload = {
        email: updatedData.email || existingSankalpa.email || '',
        sankalpam_name: updatedData.sankalpam_name,
        sankalpam_location: updatedData.sankalpam_location || existingSankalpa.sankalpam_location || '',
        status: updatedData.status || existingSankalpa.status || 'pending',
        timestamp: updatedData.timestamp || existingSankalpa.timestamp || new Date().toISOString(),
      };
      await updateDoc(doc(db, 'sankalpams', sankalpaId), payload);
      await fetchSankalpams();
      alert('Sankalpa updated successfully.');
    } catch (error) {
      console.error('Error updating sankalpa:', error);
      alert('Failed to update sankalpa.');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out.');
    }
  };

  const renderContent = () => {
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    switch (activeTab) {
      case 'users':
        return <Users users={users} loading={loading} onUpdateUser={handleUpdateUser} />;
      case 'sankalpams':
        return <Sankalpams sankalpams={sankalpams} loading={loading} onUpdateSankalpa={handleUpdateSankalpa} />;
      case 'notifications':
        return (
          <Notifications
            notifications={notifications}
            loading={loading}
            onAdd={handleAddNotification}
            onEdit={handleEditNotification}
            onDelete={handleDeleteNotification}
          />
        );
      case 'leaderboard':
        return <Leaderboard loading={loading} db={db} />;
          case 'videos':
        return (
          <YouTubeVideos
            videos={videos}
            loading={loading}
            onAdd={handleAddVideo}
            onEdit={handleEditVideo}
            onDelete={handleDeleteVideo}
          />
        );
      case 'emi_payments':
        return (
          <EmiPayments
            emiPayments={emi_payments}
            loading={loading}
            onUpdateEmiPayment={handleUpdateEmiPayment}
          />
        );
      default:
        return <Users users={users} loading={loading} onUpdateUser={handleUpdateUser} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        handleLogout={handleLogout}
        userRole={userRole}
      />
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;