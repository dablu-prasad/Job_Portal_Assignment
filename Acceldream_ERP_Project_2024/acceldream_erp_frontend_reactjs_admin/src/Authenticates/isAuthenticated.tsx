
export const setUserToken = async (token:string) => {
    const expirationTime = Date.now() + 3600 * 1000;
    localStorage.setItem("tokenExpiration", expirationTime.toString());
    return await localStorage.setItem("token", token)
}

export const IsAuthenticated = ():boolean => {
    removeTokenIfExpired()
    return !!localStorage.getItem('token'); // Replace this with real auth logic
};

export const getUserRole = () => {
    return localStorage.getItem('role'); // Example: returns 'admin', 'user', etc.
};

export const removeToken = async () => {
    return await localStorage.removeItem('token')
}

export const getAuthHeaders = () => {
    removeTokenIfExpired()
    const token = localStorage.getItem('token'); // Retrieve the token
    return {
        context:{
      headers: {
        authorization: token ? `${token}` : '',
      },
    }
}
  };

  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem("tokenExpiration");
    if (!expirationTime) {
      return true; // If no expiration time, consider it expired
    }
    return Date.now() > parseInt(expirationTime, 10);
  };
  
  const removeTokenIfExpired = () => {
    if (isTokenExpired()) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      console.log("Token has expired and has been removed.");
    }
  };
  