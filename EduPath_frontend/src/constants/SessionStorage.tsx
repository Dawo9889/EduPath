import User from "../types/User";

const storeAccessToken = async (token: string) => {
    try {
        sessionStorage.setItem('accessToken', token);
    } catch (error) {
        console.error('Failed to store access token:', error);
    }
}
const getAccessToken = () => {
    try {
        return sessionStorage.getItem('accessToken');
    } catch (error) {
        console.error('Failed to retrieve access token:', error);
        return null;
    }
}
const removeAccessToken = () => {
    try {
        sessionStorage.removeItem('accessToken');
    } catch (error) {
        console.error('Failed to remove access token:', error);
    }
}
const storeUserData = async (user: User) => {
    try {
        sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('userId', user.id);
        // sessionStorage.setItem('userName', user.name);
        sessionStorage.setItem('userRole', user.role);
    } catch (error) {
        console.error('Failed to store user data:', error);
    }
}
const getUserData = () => {
    try {
        const email = sessionStorage.getItem('userEmail');
        const id = sessionStorage.getItem('userId');
        // const name = sessionStorage.getItem('userName');
        const role = sessionStorage.getItem('userRole');
        return { email, id, role };
    } catch (error) {
        console.error('Failed to retrieve user data:', error);
        return null;
    }
}
const removeUserData = () => {
    try {
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('userId');
        // sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userRole');
    } catch (error) {
        console.error('Failed to remove user data:', error);
    }
}

export const SessionStorage = {
    storeAccessToken,
    getAccessToken,
    removeAccessToken,
    storeUserData,
    getUserData,
    removeUserData
};
