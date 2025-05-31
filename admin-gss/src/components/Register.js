// // import React, { useState } from 'react';
// // import axios from 'axios';

// // function Register() {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phoneNumber: '',
// //     password: ''
// //   });
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setSuccess('');

// //     try {
// //       // Check if email already exists
// //       const response = await axios.get(
// //         `https://react-native-e20b7-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${formData.email}"`
// //       );

// //       if (Object.keys(response.data).length > 0) {
// //         setError('Email already exists');
// //         return;
// //       }

// //       // Store new admin data
// //       await axios.post('https://react-native-e20b7-default-rtdb.firebaseio.com/users.json', {
// //         ...formData,
// //         timestamp: new Date().toISOString(),
// //         role: 'admin' // Adding role to differentiate admin users
// //       });

// //       setSuccess('Registration successful!');
// //       setFormData({ name: '', email: '', phoneNumber: '', password: '' });
// //     } catch (error) {
// //       console.error('Error registering admin:', error);
// //       setError('Error registering admin');
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
// //       <h2>Admin Registration</h2>
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //       {success && <p style={{ color: 'green' }}>{success}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <div style={{ marginBottom: '15px' }}>
// //           <label htmlFor="name">Name:</label>
// //           <input
// //             type="text"
// //             id="name"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             required
// //             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '15px' }}>
// //           <label htmlFor="email">Email:</label>
// //           <input
// //             type="email"
// //             id="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '15px' }}>
// //           <label htmlFor="phoneNumber">Phone Number:</label>
// //           <input
// //             type="tel"
// //             id="phoneNumber"
// //             name="phoneNumber"
// //             value={formData.phoneNumber}
// //             onChange={handleChange}
// //             required
// //             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '15px' }}>
// //           <label htmlFor="password">Password:</label>
// //           <input
// //             type="password"
// //             id="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           style={{
// //             padding: '10px 20px',
// //             background: '#007bff',
// //             color: 'white',
// //             border: 'none',
// //             cursor: 'pointer'
// //           }}
// //         >
// //           Register
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Register;


// import React, { useState } from 'react';
// import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';
// import axios from 'axios';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAoxO_n9LLMBKEVu6WdBjKwivnVofPymy8",
//   authDomain: "gss-application.firebaseapp.com",
//   projectId: "gss-application",
//   storageBucket: "gss-application.firebasestorage.app",
//   messagingSenderId: "892589054641",
//   appId: "1:892589054641:web:fc4bd659e82e07dce7a090",
//   measurementId: "G-DDSV3NVS7F"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       // Check if email already exists
//       const usersRef = collection(db, 'users');
//       const q = query(usersRef, where('email', '==', formData.email));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         setError('Email already exists');
//         return;
//       }

//       // Store new admin data
//       await addDoc(collection(db, 'users'), {
//         ...formData,
//         timestamp: new Date().toISOString(),
//         role: 'admin'
//       });

//       setSuccess('Registration successful!');
//       setFormData({ name: '', email: '', phoneNumber: '', password: '' });
//     } catch (error) {
//       console.error('Error registering admin:', error);
//       setError('Error registering admin');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
//       <h2>Admin Registration</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '15px' }}>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label htmlFor="phoneNumber">Phone Number:</label>
//           <input
//             type="tel"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             padding: '10px 20px',
//             background: '#007bff',
//             color: 'white',
//             border: 'none',
//             cursor: 'pointer'
//           }}
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

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

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'admin'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate role
    const validRoles = ['admin', 'kshetralevel_admin', 'accountant'];
    if (!validRoles.includes(formData.role)) {
      setError('Invalid role selected');
      return;
    }

    try {
      // Check if email already exists in Firestore
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', formData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError('Email already exists');
        return;
      }

      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Store user data in Firestore with UID as document ID
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        timestamp: new Date().toISOString()
      });

      setSuccess('Registration successful!');
      setFormData({ name: '', email: '', phoneNumber: '', password: '', role: 'admin' });
    } catch (error) {
      console.error('Error registering user:', error);
      setError(error.message || 'Error registering user');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>User Registration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="admin">Admin</option>
            <option value="kshetralevel_admin">Kshetralevel Admin</option>
            <option value="accountant">Accountant</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;