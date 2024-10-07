

export const IsAuthenticated = () => {
    return !!localStorage.getItem('token'); // Replace this with real auth logic
  };
  
export const getUserRole = () => {
    return localStorage.getItem('role'); // Example: returns 'admin', 'user', etc.
  };
  