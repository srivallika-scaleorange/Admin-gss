// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Leaderboard = ({ loading,users }) => {
//   const [leaders, setLeaders] = useState([]);
//   const [localLoading, setLocalLoading] = useState(true);

//   // Helper function to apply responsive styles
//   const responsiveStyle = (desktop, mobile, extraSmall = mobile) => ({
//     ...desktop,
//     '@media (max-width: 768px)': mobile,
//     '@media (max-width: 400px)': extraSmall,
//   });

//   useEffect(() => {
//     fetchLeaderboard();
//   }, []);

//   const fetchLeaderboard = async () => {
//     try {
//       setLocalLoading(true);
//       const response = await axios.get('https://react-native-e20b7-default-rtdb.firebaseio.com/users.json');
//       const data = response.data || {};
      
//       // Convert to array and filter users with referral counts
//       const usersArray = Object.keys(data).map(key => ({
//         id: key,
//         name: data[key].name || 'Anonymous',
//         email: data[key].email || '',
//         referral_count: data[key].referral_count.increment || 0,
//         phoneNumber: data[key].phoneNumber || '',
//         role: data[key].role || 'user',
//         timestamp: data[key].timestamp || ''
//       }));

//       // Sort by referral count descending and take top 10
//       const leaderboard = usersArray
//         .sort((a, b) => b.referral_count - a.referral_count)
//         .slice(0, 10);

//       setLeaders(leaderboard);
//     } catch (error) {
//       console.error('Error fetching leaderboard:', error);
//       setLeaders([]);
//     } finally {
//       setLocalLoading(false);
//     }
//   };

//   const getRankIcon = (rank) => {
//     switch (rank) {
//       case 1:
//         return '🥇';
//       case 2:
//         return '🥈';
//       case 3:
//         return '🥉';
//       default:
//         return '🏅';
//     }
//   };

//   const getRankStyle = (rank) => {
//     switch (rank) {
//       case 1:
//         return { backgroundColor: '#FFD700', color: '#000' };
//       case 2:
//         return { backgroundColor: '#C0C0C0', color: '#000' };
//       case 3:
//         return { backgroundColor: '#CD7F32', color: '#fff' };
//       default:
//         return { backgroundColor: '#f8f9fa', color: '#333' };
//     }
//   };

//   if (localLoading || loading) {
//     return (
//       <div style={responsiveStyle(
//         { 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '400px',
//           fontSize: '18px',
//           color: '#666'
//         },
//         { 
//           height: '300px',
//           fontSize: '16px',
//           padding: '10px'
//         }
//       )}>
//         Loading leaderboard...
//       </div>
//     );
//   }

//   return (
//     <div style={responsiveStyle(
//       { padding: '20px', maxWidth: '800px', margin: '0 auto' },
//       { padding: '10px', maxWidth: '100%' }
//     )}>
//       <div style={{
//         backgroundColor: 'white',
//         borderRadius: '10px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         overflow: 'hidden'
//       }}>
//         <div style={responsiveStyle(
//           {
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             padding: '20px',
//             textAlign: 'center'
//           },
//           {
//             padding: '15px'
//           }
//         )}>
//           <h2 style={responsiveStyle(
//             { margin: '0', fontSize: '28px', fontWeight: 'bold' },
//             { fontSize: '24px' },
//             { fontSize: '20px' }
//           )}>
//             🏆 Referral Leaderboard
//           </h2>
//           <p style={responsiveStyle(
//             { margin: '10px 0 0 0', opacity: '0.9', fontSize: '16px' },
//             { fontSize: '14px', margin: '8px 0 0 0' },
//             { fontSize: '12px' }
//           )}>
//             Top performers in our referral program
//           </p>
//         </div>

//         <div style={responsiveStyle(
//           { padding: '20px' },
//           { padding: '10px' }
//         )}>
//           {leaders.length === 0 ? (
//             <div style={responsiveStyle(
//               {
//                 textAlign: 'center',
//                 padding: '40px',
//                 color: '#666',
//                 fontSize: '18px'
//               },
//               {
//                 padding: '20px',
//                 fontSize: '16px'
//               },
//               { fontSize: '14px' }
//             )}>
//               <div style={responsiveStyle(
//                 { fontSize: '48px', marginBottom: '10px' },
//                 { fontSize: '36px', marginBottom: '8px' },
//                 { fontSize: '28px' }
//               )}>📊</div>
//               No referrals yet. Be the first to start referring!
//             </div>
//           ) : (
//             <div>
//               {leaders.map((leader, index) => {
//                 const rank = index + 1;
//                 const rankStyle = getRankStyle(rank);
                
//                 return (
//                   <div
//                     key={leader.id}
//                     style={responsiveStyle(
//                       {
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: '15px 20px',
//                         marginBottom: '10px',
//                         backgroundColor: rankStyle.backgroundColor,
//                         color: rankStyle.color,
//                         borderRadius: '8px',
//                         border: rank <= 3 ? '2px solid #ddd' : '1px solid #eee',
//                         transition: 'transform 0.2s, box-shadow 0.2s',
//                         cursor: 'pointer'
//                       },
//                       {
//                         padding: '10px 15px',
//                         marginBottom: '8px',
//                         borderRadius: '6px'
//                       },
//                       {
//                         flexDirection: 'column',
//                         alignItems: 'flex-start',
//                         padding: '10px'
//                       }
//                     )}
//                     onMouseEnter={(e) => {
//                       if (window.innerWidth > 768) {
//                         e.currentTarget.style.transform = 'translateY(-2px)';
//                         e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       if (window.innerWidth > 768) {
//                         e.currentTarget.style.transform = 'translateY(0)';
//                         e.currentTarget.style.boxShadow = rank <= 3 ? '0 2px 10px rgba(0,0,0,0.1)' : 'none';
//                       }
//                     }}
//                   >
//                     <div style={responsiveStyle(
//                       {
//                         display: 'flex',
//                         alignItems: 'center',
//                         minWidth: '60px'
//                       },
//                       {
//                         minWidth: '50px'
//                       },
//                       {
//                         marginBottom: '8px'
//                       }
//                     )}>
//                       <span style={responsiveStyle(
//                         { fontSize: '24px', marginRight: '10px' },
//                         { fontSize: '20px', marginRight: '8px' },
//                         { fontSize: '18px' }
//                       )}>
//                         {getRankIcon(rank)}
//                       </span>
//                       <span style={responsiveStyle(
//                         {
//                           fontSize: rank <= 3 ? '20px' : '18px',
//                           fontWeight: rank <= 3 ? 'bold' : 'normal'
//                         },
//                         {
//                           fontSize: rank <= 3 ? '18px' : '16px'
//                         },
//                         {
//                           fontSize: rank <= 3 ? '16px' : '14px'
//                         }
//                       )}>
//                         #{rank}
//                       </span>
//                     </div>

//                     <div style={responsiveStyle(
//                       { flex: 1, marginLeft: '20px' },
//                       { marginLeft: '10px' },
//                       { marginLeft: '0', marginBottom: '8px' }
//                     )}>
//                       <div style={responsiveStyle(
//                         {
//                           fontSize: rank <= 3 ? '18px' : '16px',
//                           fontWeight: rank <= 3 ? 'bold' : '600',
//                           marginBottom: '4px'
//                         },
//                         {
//                           fontSize: rank <= 3 ? '16px' : '14px'
//                         },
//                         {
//                           fontSize: rank <= 3 ? '15px' : '13px'
//                         }
//                       )}>
//                         {leader.name}
//                       </div>
//                       {leader.email && (
//                         <div style={responsiveStyle(
//                           {
//                             fontSize: '14px',
//                             opacity: '0.8'
//                           },
//                           {
//                             fontSize: '12px'
//                           },
//                           {
//                             fontSize: '11px'
//                           }
//                         )}>
//                           {leader.email}
//                         </div>
//                       )}
//                     </div>

//                     <div style={responsiveStyle(
//                       {
//                         textAlign: 'right',
//                         marginLeft: '20px'
//                       },
//                       {
//                         marginLeft: '10px'
//                       },
//                       {
//                         marginLeft: '0',
//                         textAlign: 'left'
//                       }
//                     )}>
//                       <div style={responsiveStyle(
//                         {
//                           fontSize: rank <= 3 ? '20px' : '18px',
//                           fontWeight: 'bold',
//                           marginBottom: '4px'
//                         },
//                         {
//                           fontSize: rank <= 3 ? '18px' : '16px'
//                         },
//                         {
//                           fontSize: rank <= 3 ? '16px' : '14px'
//                         }
//                       )}>
//                         {leader.referral_count}
//                       </div>
//                       <div style={responsiveStyle(
//                         {
//                           fontSize: '12px',
//                           opacity: '0.8',
//                           textTransform: 'uppercase',
//                           letterSpacing: '0.5px'
//                         },
//                         {
//                           fontSize: '10px'
//                         }
//                       )}>
//                         {leader.referral_count === 1 ? 'Referral' : 'Referrals'}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           <div style={responsiveStyle(
//             {
//               marginTop: '30px',
//               padding: '20px',
//               backgroundColor: '#f8f9fa',
//               borderRadius: '8px',
//               textAlign: 'center'
//             },
//             {
//               marginTop: '20px',
//               padding: '15px',
//               borderRadius: '6px'
//             }
//           )}>
//           </div>            {/* Empty div for future content, kept as is */}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;


import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

// Helper function to apply responsive styles
const responsiveStyle = (desktop, mobile, extraSmall = mobile) => ({
  ...desktop,
  '@media (max-width: 768px)': mobile,
  '@media (max-width: 400px)': extraSmall,
});

const Leaderboard = ({ loading, db }) => {
  const [leaders, setLeaders] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLocalLoading(true);
        const usersRef = collection(db, 'users');
        const topUsersQuery = query(usersRef, orderBy('referral_count.increment', 'desc'), limit(10));
        const snapshot = await getDocs(topUsersQuery);

        if (!snapshot.empty) {
          const leaderboard = snapshot.docs
            .map((doc) => ({
              id: doc.id,
              name: doc.data().name || 'Anonymous',
              email: doc.data().email || '',
              referral_count: doc.data().referral_count?.increment || 0,
              phoneNumber: doc.data().phoneNumber || '',
              role: doc.data().role || 'user',
              timestamp: doc.data().timestamp || '',
            }))
            .slice(0, 10); // Ensure max 10
          setLeaders(leaderboard);
        } else {
          setLeaders([]);
        }
      } catch (error) {
        console.error('Leaderboard error:', error.message, error.code);
        alert('Failed to load leaderboard. Please try again.');
      } finally {
        setLocalLoading(false);
      }
    };

    fetchLeaderboard();
  }, [db]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏅';
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return { backgroundColor: '#FFD700', color: '#000' };
      case 2:
        return { backgroundColor: '#C0C0C0', color: '#000' };
      case 3:
        return { backgroundColor: '#CD7F32', color: '#fff' };
      default:
        return { backgroundColor: '#f8f9fa', color: '#333' };
    }
  };

  if (localLoading || loading) {
    return (
      <div style={responsiveStyle(
        { 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          fontSize: '18px',
          color: '#666'
        },
        { 
          height: '300px',
          fontSize: '16px',
          padding: '10px'
        }
      )}>
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div style={responsiveStyle(
      { padding: '20px', maxWidth: '800px', margin: '0 auto' },
      { padding: '10px', maxWidth: '100%' }
    )}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={responsiveStyle(
          {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px',
            textAlign: 'center'
          },
          {
            padding: '15px'
          }
        )}>
          <h2 style={responsiveStyle(
            { margin: '0', fontSize: '28px', fontWeight: 'bold' },
            { fontSize: '24px' },
            { fontSize: '20px' }
          )}>
            🏆 Referral Leaderboard
          </h2>
          <p style={responsiveStyle(
            { margin: '10px 0 0 0', opacity: '0.9', fontSize: '16px' },
            { fontSize: '14px', margin: '8px 0 0 0' },
            { fontSize: '12px' }
          )}>
            Top performers in our referral program
          </p>
        </div>

        <div style={responsiveStyle(
          { padding: '20px' },
          { padding: '10px' }
        )}>
          {leaders.length === 0 ? (
            <div style={responsiveStyle(
              {
                textAlign: 'center',
                padding: '40px',
                color: '#666',
                fontSize: '18px'
              },
              {
                padding: '20px',
                fontSize: '16px'
              },
              { fontSize: '14px' }
            )}>
              <div style={responsiveStyle(
                { fontSize: '48px', marginBottom: '10px' },
                { fontSize: '36px', marginBottom: '8px' },
                { fontSize: '28px' }
              )}>📊</div>
              No referrals yet. Be the first to start referring!
            </div>
          ) : (
            <div>
              {leaders.map((leader, index) => {
                const rank = index + 1;
                const rankStyle = getRankStyle(rank);
                
                return (
                  <div
                    key={leader.id}
                    style={responsiveStyle(
                      {
                        display: 'flex',
                        alignItems: 'center',
                        padding: '15px 20px',
                        marginBottom: '10px',
                        backgroundColor: rankStyle.backgroundColor,
                        color: rankStyle.color,
                        borderRadius: '8px',
                        border: rank <= 3 ? '2px solid #ddd' : '1px solid #eee',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer'
                      },
                      {
                        padding: '10px 15px',
                        marginBottom: '8px',
                        borderRadius: '6px'
                      },
                      {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '10px'
                      }
                    )}
                    onMouseEnter={(e) => {
                      if (window.innerWidth > 768) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (window.innerWidth > 768) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = rank <= 3 ? '0 2px 10px rgba(0,0,0,0.1)' : 'none';
                      }
                    }}
                  >
                    <div style={responsiveStyle(
                      {
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: '60px'
                      },
                      {
                        minWidth: '50px'
                      },
                      {
                        marginBottom: '8px'
                      }
                    )}>
                      <span style={responsiveStyle(
                        { fontSize: '24px', marginRight: '10px' },
                        { fontSize: '20px', marginRight: '8px' },
                        { fontSize: '18px' }
                      )}>
                        {getRankIcon(rank)}
                      </span>
                      <span style={responsiveStyle(
                        {
                          fontSize: rank <= 3 ? '20px' : '18px',
                          fontWeight: rank <= 3 ? 'bold' : 'normal'
                        },
                        {
                          fontSize: rank <= 3 ? '18px' : '16px'
                        },
                        {
                          fontSize: rank <= 3 ? '16px' : '14px'
                        }
                      )}>
                        #{rank}
                      </span>
                    </div>

                    <div style={responsiveStyle(
                      { flex: 1, marginLeft: '20px' },
                      { marginLeft: '10px' },
                      { marginLeft: '0', marginBottom: '8px' }
                    )}>
                      <div style={responsiveStyle(
                        {
                          fontSize: rank <= 3 ? '18px' : '16px',
                          fontWeight: rank <= 3 ? 'bold' : '600',
                          marginBottom: '4px'
                        },
                        {
                          fontSize: rank <= 3 ? '16px' : '14px'
                        },
                        {
                          fontSize: rank <= 3 ? '15px' : '13px'
                        }
                      )}>
                        {leader.name}
                      </div>
                      {leader.email && (
                        <div style={responsiveStyle(
                          {
                            fontSize: '14px',
                            opacity: '0.8'
                          },
                          {
                            fontSize: '12px'
                          },
                          {
                            fontSize: '11px'
                          }
                        )}>
                          {leader.email}
                        </div>
                      )}
                    </div>

                    <div style={responsiveStyle(
                      {
                        textAlign: 'right',
                        marginLeft: '20px'
                      },
                      {
                        marginLeft: '10px'
                      },
                      {
                        marginLeft: '0',
                        textAlign: 'left'
                      }
                    )}>
                      <div style={responsiveStyle(
                        {
                          fontSize: rank <= 3 ? '20px' : '18px',
                          fontWeight: 'bold',
                          marginBottom: '4px'
                        },
                        {
                          fontSize: rank <= 3 ? '18px' : '16px'
                        },
                        {
                          fontSize: rank <= 3 ? '16px' : '14px'
                        }
                      )}>
                        {leader.referral_count}
                      </div>
                      <div style={responsiveStyle(
                        {
                          fontSize: '12px',
                          opacity: '0.8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        },
                        {
                          fontSize: '10px'
                        }
                      )}>
                        {leader.referral_count === 1 ? 'Referral' : 'Referrals'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={responsiveStyle(
            {
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            },
            {
              marginTop: '20px',
              padding: '15px',
              borderRadius: '6px'
            }
          )}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;