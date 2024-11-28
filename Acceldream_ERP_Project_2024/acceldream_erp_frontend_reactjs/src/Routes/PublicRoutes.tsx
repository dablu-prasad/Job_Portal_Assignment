// PublicRoute.js
import { Navigate } from 'react-router-dom';
import { IsAuthenticated } from '../Authenticates/isAuthenticated';

const PublicRoute = ({ children }:{children:any}) => {
  return IsAuthenticated() ? <Navigate to="/" /> : children;
};

export default PublicRoute;  
