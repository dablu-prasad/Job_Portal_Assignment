import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import PublicRoute from './Routes/PublicRoutes';
import PrivateRoute from './Routes/PrivateRoutes';
import DashboardPage from './Components/DashboardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/*Public Routes*/}
        <Route path="/" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/*Public Routes*/}
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage/></PrivateRoute>}/>
      </Routes>
    </Router>
  );
};

export default App;
