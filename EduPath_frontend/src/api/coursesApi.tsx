import axios from "axios";
import Course from "../types/Course";
import { handleError } from "./utils";

const COURSE_URL = `${import.meta.env.VITE_API_URL}/course`

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

export const getCourse = async (id: string) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await axios.get<Course>(`${COURSE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    handleError(error);
  }
}

export const getCourseUsers = async (id: string) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await axios.get(`${COURSE_URL}/${id}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching course users:", error);
    handleError(error);
  }
}