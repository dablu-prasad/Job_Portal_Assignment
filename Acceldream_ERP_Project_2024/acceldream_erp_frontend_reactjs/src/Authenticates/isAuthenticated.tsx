
export const setUserToken = async (token:string) => {
    return await localStorage.setItem("token", token)
}

export const IsAuthenticated = ():boolean => {
    return !!localStorage.getItem('token'); // Replace this with real auth logic
};

export const getUserRole = () => {
    return localStorage.getItem('role'); // Example: returns 'admin', 'user', etc.
};

export const removeToken = async () => {
    return await localStorage.removeItem('token')
}
