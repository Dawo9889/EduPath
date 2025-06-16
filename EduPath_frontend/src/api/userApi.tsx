import axios from "axios";
import { getAccessToken, handleError } from "./utils";

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