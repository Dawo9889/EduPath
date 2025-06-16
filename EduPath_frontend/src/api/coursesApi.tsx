import axios from "axios";
import { getAccessToken, handleError } from "./utils";

const COURSE_URL = `${import.meta.env.VITE_API_URL}/course`;

export type CourseRequestData = {
  name: string;
  description: string;
  isPublic: boolean;
  passwordPlainText: string;
  ownerId: string;
};

export type CourseResponseData = {
  courseId: string;
  name: string;
  description: string;
  isPublic: boolean;
  ownerName: string;
};

export const fetchCourses = async () => {
  try {
    const token = getAccessToken();
    const response = await axios.get<CourseResponseData[]>(
      `${COURSE_URL}/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    handleError(error);
  }
};

export const getCourse = async (id: string) => {
  try {
    const token = getAccessToken();
    const response = await axios.get<CourseResponseData>(
      `${COURSE_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    handleError(error);
  }
};

export const getCourseUsers = async (id: string) => {
  try {
    const token = getAccessToken();
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
};

export const createCourse = async (courseData: CourseRequestData) => {
  try {
    const token = getAccessToken();
    const response = await axios.post<CourseRequestData>(
      `${COURSE_URL}/create`,
      courseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    handleError(error);
  }
};

export const enrollCourse = async (courseId: string, password: string) => {
  try {
    const token = getAccessToken();
    const response = await axios.post(
      `${COURSE_URL}/${courseId}/join`,
      { password: password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error joining course:", error);
    handleError(error);
  }
};

export const updateCourse = async (
  id: string,
  courseData: Partial<CourseRequestData>
) => {
  try {
    const token = getAccessToken();
    const response = await axios.put<CourseRequestData>(
      `${COURSE_URL}/${id}`,
      courseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    handleError(error);
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const token = getAccessToken();
    const response = await axios.delete(`${COURSE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    handleError(error);
  }
};
