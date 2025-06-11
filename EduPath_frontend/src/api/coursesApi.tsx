import axios from "axios";
import Course from "../types/Course";

const COURSE_URL = `${import.meta.env.VITE_API_URL}/course`

const handleError = (error: unknown) => {
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

export const fetchCourses = async () => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await axios.get<Course[]>(`${COURSE_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    handleError(error);
  }
}