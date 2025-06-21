import axios from "axios";
import { getAccessToken, handleError } from "./utils";

const SOLUTION_URL = `${import.meta.env.VITE_API_URL}/solution`;

export type SolutionResponseData = {
  id: string;
  assignmentId: string;
  userId: string;
  filepath: string;
  dateSubmitted: string;
};

export const fetchSolutionsByAssignment = async (assignmentId: string) => {
  try {
    const token = getAccessToken();
    const response = await axios.get<SolutionResponseData[]>(
      `${SOLUTION_URL}/by-assignment/${assignmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching solutions:", error);
    handleError(error);
  }
};

export const fetchSolutionsByUser = async (userId: string) => {
  try {
    const token = getAccessToken();
    const response = await axios.get<SolutionResponseData[]>(
      `${SOLUTION_URL}/by-user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching solutions:", error);
    handleError(error);
  }
};

