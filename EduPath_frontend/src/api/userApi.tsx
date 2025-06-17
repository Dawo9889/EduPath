import axios from "axios";
import { getAccessToken, handleError } from "./utils";

export interface UserResponseData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string | null;
}

const USER_URL = `${import.meta.env.VITE_API_URL}/user`;

export const addUserToCourse = async (courseId: string, userId: string) => {
  try {
    const token = getAccessToken();
    const response = await axios.post(
      `${USER_URL}/assignUserToCourse`,
      { userID: userId, courseID: courseId },
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

export const removeUserFromCourse = async (
  courseId: string,
  userId: string
) => {
  try {
    const token = getAccessToken();
    const response = await axios.delete(`${USER_URL}/deleteUserFromCourse`, {
      data: { userID: userId, courseID: courseId },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error joining course:", error);
    handleError(error);
  }
};
