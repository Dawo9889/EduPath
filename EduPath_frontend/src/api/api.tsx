import axios from 'axios';


const LOGIN_URL = `${import.meta.env.VITE_API_URL}/user/login`;
const WHOAMI_URL = `${import.meta.env.VITE_API_URL}/user/whoami`;

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_URL, { email, password });
    sessionStorage.setItem('accessToken', response.data.accessToken);

    const userData = await whoami(); // Zwróć usera

    const roles: string[] = userData.roles;

    if (roles.includes("Admin")) {
     return {
      email: userData.email,
      role: 'admin'
    };
    } else if (roles.includes("Lecturer")) {
     return {
      email: userData.email,
      role: 'lecturer'
    };
    } else if (roles.includes("Student")) {
     return {
      email: userData.email,
      role: 'student'
    };
    } else {
    throw new Error("Unrecognized role");
    }

    return {
      email: userData.email,
      role: userData.role.toLowerCase(),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
            throw new Error('Invalid email or password');
            } else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
            throw new Error('Server error');
            } else {
            throw new Error('An unexpected error occurred');
            }
        } else {
            throw new Error('An unexpected error occurred');
        }
  }
};

export const whoami = async () => {
    try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }

        const response = await axios.get(WHOAMI_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Whoami response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                throw new Error('Unauthorized access');
            } else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
                throw new Error('Server error');
            } else {
                throw new Error('An unexpected error occurred');
            }
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}