// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard/Dashboard';
// import './index.css';
// function App() {
  
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Navigate to="/dashboard/users" replace />} />
//         <Route path="/dashboard/users" element={<Dashboard />} />
//         <Route path="/dashboard/payments" element={<Dashboard />} />
//         <Route path="/dashboard/sankalpams" element={<Dashboard />} />
//         <Route path="/dashboard/notifications" element={<Dashboard />} />    
//           <Route path="/dashboard/leaderboard" element={<Dashboard />} />
//           <Route path="/dashboard/videos" element={<Dashboard />} />
//         <Route path="/dashboard/emi_payments" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css';

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
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        } else {
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Define role-based route access
  const routeAccess = {
    admin: [
      '/dashboard/users',
      '/dashboard/payments',
      '/dashboard/sankalpams',
      '/dashboard/notifications',
      '/dashboard/leaderboard',
      '/dashboard/videos',
      '/dashboard/emi_payments'
    ],
    kshetralevel_admin: [
      '/dashboard/sankalpams',
      '/dashboard/notifications',
      '/dashboard/videos'
    ],
    accountant: [
      '/dashboard/payments',
      '/dashboard/emi_payments'
    ]
  };

  // Component to protect routes based on role
  const ProtectedRoute = ({ element, path }) => {
    if (!userRole) {
      return <Navigate to="/" replace />;
    }
    const allowedRoutes = routeAccess[userRole] || [];
    if (!allowedRoutes.includes(path)) {
      // Redirect to the first allowed route for the user's role, or to login if none
      const defaultRoute = allowedRoutes[0] || '/';
      return <Navigate to={defaultRoute} replace />;
    }
    return element;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            userRole ? (
              <Navigate
                to={
                  routeAccess[userRole][0] || '/dashboard/users'
                }
                replace
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/dashboard/users"
          element={<ProtectedRoute path="/dashboard/users" element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/payments"
          element={<ProtectedRoute path="/dashboard/payments" element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/sankalpams"
          element={<ProtectedRoute path="/dashboard/sankalpams" element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/notifications"
          element={<ProtectedRoute path="/dashboard/notifications" element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/leaderboard"
          element={<ProtectedRoute path="/dashboard/leaderboard" element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/videos"
          element={<ProtectedRoute path="/dashboard/videos" element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/emi_payments"
          element={<ProtectedRoute path="/dashboard/emi_payments" element={<Dashboard />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;