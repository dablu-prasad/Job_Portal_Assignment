import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoute from './Routes/PublicRoutes';
import HomePage from './Components/HomePage/HomePage';
import PrivateRoute from './Routes/PrivateRoutes';
import DashboardPage from './Components/DashboardPage/DashboardPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Navigation */}
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />

        {/* Add Private Navigation here as needed */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
