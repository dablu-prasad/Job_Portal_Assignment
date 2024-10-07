// PublicRoute.js
import { Navigate } from 'react-router-dom';
import { IsAuthenticated } from '../Authenticates/isAuthenticated.js';

const PublicRoute = ({ children }) => {
  return IsAuthenticated() ? <Navigate to="/" /> : children;
};

export default PublicRoute;  
