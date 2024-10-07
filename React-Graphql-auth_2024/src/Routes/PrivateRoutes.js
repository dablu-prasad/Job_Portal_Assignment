// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { IsAuthenticated } from '../Authenticates/isAuthenticated';

const PrivateRoute = ({ children }) => {
  return IsAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
