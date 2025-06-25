import axios from "axios";
import { getAccessToken, handleError } from "./utils";
import { use } from "react";

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

export const completeRegistration = async (
  userId: string,
  resetToken: string,
  emailToken: string,
  newPassword: string
) => {
  try {
    console.log("Sending data:", { userId, resetToken, emailToken, newPassword });

    const response = await axios.post(
      `${USER_URL}/complete-registration`,
      { 
        UserId: userId,
        ResetToken: resetToken,
        EmailToken: emailToken,
        NewPassword: newPassword
       },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Registration response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error completing registration:", error);
    console.error("Server response:", error.response?.data);
    throw error; // <- rzuć dalej, żeby móc go pokazać użytkownikowi
  }
};
