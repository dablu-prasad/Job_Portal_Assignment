// // ProtectedRoute.js
// import { Navigate } from 'react-router-dom';
// import { isAuthenticated, getUserRole } from './auth';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const role = getUserRole();
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" />;
//   }
//   if (role !== requiredRole) {
//     return <Navigate to="/unauthorized" />; // or a 403 page
//   }
//   return children;
// };

// export default ProtectedRoute;

import React from 'react'

const ProtectedRoute = () => {
  return (
    <div>
      
    </div>
  )
}

export default ProtectedRoute
