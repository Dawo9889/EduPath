import axios from 'axios';
import UserRole from '../types/UserRole';
import User from '../types/User';


const LOGIN_URL = `${import.meta.env.VITE_API_URL}/user/login`;
const WHOAMI_URL = `${import.meta.env.VITE_API_URL}/user/whoami`;
const USER_URL = `${import.meta.env.VITE_API_URL}/user`;

export const loginApi = async (email: string, password: string): Promise<{
  email: string;
  role: UserRole;
  token: string;
}> => {
  try {
    const response = await axios.post(LOGIN_URL, { email, password });
    sessionStorage.setItem('accessToken', response.data.accessToken);

    const userData = await whoami();
    const roles: string[] = userData.roles;

    const lowerRoles = userData.roles.map((r: string) => r.toLowerCase());

   if (lowerRoles.includes("admin")) {
  return {
    email: userData.email,
    role: 'admin' as UserRole,
    token: response.data.accessToken
  };
} else if (lowerRoles.includes("lecturer")) {
  return {
    email: userData.email,
    role: 'lecturer' as UserRole,
    token: response.data.accessToken
  };
} else if (lowerRoles.includes("student")) {
  return {
    email: userData.email,
    role: 'student' as UserRole,
    token: response.data.accessToken
  };
} else {
  throw new Error("Unrecognized role");
}

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
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


export const fetchUsers = async () => {
  try {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axios.get<User[]>(`${USER_URL}/get-all-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
  catch (error) {
    console.error('Error fetching users:', error);
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

export const deleteUser = async (userId: string) => {
  try {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axios.delete(`${USER_URL}/delete-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
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