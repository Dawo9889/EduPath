import axios from "axios";
import { handleError } from "./utils";

const ASSIGNMENT_URL = `${import.meta.env.VITE_API_URL}/assingment`

export const getAssignmentByCourse = async (courseId: string) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await axios.get(`${ASSIGNMENT_URL}/by-course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    handleError(error);
  }
}