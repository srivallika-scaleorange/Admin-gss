// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       // Fetch user by email
//       const response = await axios.get(
//         `https://react-native-e20b7-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${formData.email}"`
//       );

//       const users = response.data;
//       if (!users || Object.keys(users).length === 0) {
//         setError('No account found with this email');
//         setLoading(false);
//         return;
//       }

//       // Check password and role
//       const userKey = Object.keys(users)[0];
//       const user = users[userKey];

//       if (user.password !== formData.password) {
//         setError('Incorrect password');
//         setLoading(false);
//         return;
//       }

//       if (user.role !== 'admin') {
//         setError('Not authorized as admin');
//         setLoading(false);
//         return;
//       }

//       setSuccess('Login successful! Redirecting...');

//       // Store user info in localStorage (optional)
//       localStorage.setItem(
//         'adminUser',
//         JSON.stringify({
//           id: userKey,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         })
//       );

//       // Redirect to dashboard after a short delay
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 1000);
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('Error logging in');
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: '400px',
//         margin: '50px auto',
//         padding: '24px',
//         background: '#ffffff',
//         border: '1px solid #e5e7eb',
//         borderRadius: '8px',
//         boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       <h2
//         style={{
//           color: '#1f2937',
//           fontSize: '1.5rem',
//           fontWeight: 600,
//           marginBottom: '16px',
//           textAlign: 'center',
//         }}
//       >
//         Admin Login
//       </h2>
//       {error && (
//         <p
//           style={{
//             color: '#ef4444',
//             background: '#fef2f2',
//             padding: '8px 12px',
//             borderRadius: '4px',
//             marginBottom: '16px',
//             fontSize: '0.875rem',
//             textAlign: 'center',
//           }}
//         >
//           {error}
//         </p>
//       )}
//       {success && (
//         <p
//           style={{
//             color: '#22c55e',
//             background: '#f0fdf4',
//             padding: '8px 12px',
//             borderRadius: '4px',
//             marginBottom: '16px',
//             fontSize: '0.875rem',
//             textAlign: 'center',
//           }}
//         >
//           {success}
//         </p>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '20px' }}>
//           <label
//             htmlFor="email"
//             style={{
//               color: '#374151',
//               fontSize: '0.875rem',
//               fontWeight: 500,
//               marginBottom: '6px',
//               display: 'block',
//             }}
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={{
//               width: '100%',
//               padding: '10px 12px',
//               fontSize: '0.875rem',
//               color: '#374151',
//               background: '#f8fafc',
//               border: '1px solid #d1d5db',
//               borderRadius: '6px',
//               outline: 'none',
//               transition: 'border-color 0.2s',
//             }}
//             onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
//             onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
//           />
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//           <label
//             htmlFor="password"
//             style={{
//               color: '#374151',
//               fontSize: '0.875rem',
//               fontWeight: 500,
//               marginBottom: '6px',
//               display: 'block',
//             }}
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             style={{
//               width: '100%',
//               padding: '10px 12px',
//               fontSize: '0.875rem',
//               color: '#374151',
//               background: '#f8fafc',
//               border: '1px solid #d1d5db',
//               borderRadius: '6px',
//               outline: 'none',
//               transition: 'border-color 0.2s',
//             }}
//             onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
//             onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: '100%',
//             padding: '10px 20px',
//             background: loading ? '#6b7280' : '#6366f1',
//             color: '#ffffff',
//             border: 'none',
//             borderRadius: '6px',
//             fontSize: '0.875rem',
//             fontWeight: 500,
//             cursor: loading ? 'not-allowed' : 'pointer',
//             transition: 'background 0.2s',
//           }}
//           onMouseOver={(e) => !loading && (e.target.style.background = '#4338ca')}
//           onMouseOut={(e) => !loading && (e.target.style.background = '#6366f1')}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>

//       <div style={{ textAlign: 'center', marginTop: '20px' }}>
//         <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
//           Don't have an account?{' '}
//           <a
//             href="/register"
//             style={{
//               color: '#6366f1',
//               textDecoration: 'none',
//               fontWeight: 500,
//             }}
//             onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
//             onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
//           >
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

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

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Authenticate user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        setError('No account found with this email');
        setLoading(false);
        return;
      }

      const userData = userDoc.data();
      const validRoles = ['admin', 'kshetralevel_admin', 'accountant'];
      if (!validRoles.includes(userData.role)) {
        setError('Invalid user role');
        setLoading(false);
        return;
      }

      // Store user info in localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: user.uid,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        })
      );

      setSuccess('Login successful! Redirecting...');

      // Redirect based on role
      setTimeout(() => {
        if (userData.role === 'admin') {
          navigate('/dashboard/users');
        } else if (userData.role === 'kshetralevel_admin') {
          navigate('/dashboard/sankalpams');
        } else if (userData.role === 'accountant') {
          navigate('/dashboard/payments');
        }
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error);
      setError(
        error.code === 'auth/wrong-password'
          ? 'Incorrect password'
          : error.code === 'auth/user-not-found'
          ? 'No account found with this email'
          : 'Error logging in'
      );
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '24px',
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2
        style={{
          color: '#1f2937',
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        User Login
      </h2>
      {error && (
        <p
          style={{
            color: '#ef4444',
            background: '#fef2f2',
            padding: '8px 12px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '0.875rem',
            textAlign: 'center',
          }}
        >
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            color: '#22c55e',
            background: '#f0fdf4',
            padding: '8px 12px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '0.875rem',
            textAlign: 'center',
          }}
        >
          {success}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="email"
            style={{
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: '6px',
              display: 'block',
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '0.875rem',
              color: '#374151',
              background: '#f8fafc',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
            onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="password"
            style={{
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: '6px',
              display: 'block',
            }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '0.875rem',
              color: '#374151',
              background: '#f8fafc',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
            onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px 20px',
            background: loading ? '#6b7280' : '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => !loading && (e.target.style.background = '#4338ca')}
          onMouseOut={(e) => !loading && (e.target.style.background = '#6366f1')}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          Don't have an account?{' '}
          <a
            href="/register"
            style={{
              color: '#6366f1',
              textDecoration: 'none',
              fontWeight: 500,
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;