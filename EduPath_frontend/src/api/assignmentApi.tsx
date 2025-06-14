import axios from "axios";
import { getAccessToken, handleError } from "./utils";

const ASSIGNMENT_URL = `${import.meta.env.VITE_API_URL}/assingment`

export type AssignmentData = {
  courseId: string;
  name: string;
  content: string;
  dateStart: string;
  dateEnd: string;
  visible: boolean;
};

export const fetchedAssignments = async () => {
  try {
    const token = getAccessToken();
    const response = await axios.get(`${ASSIGNMENT_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    handleError(error);
  }
};


export const getAssignmentByCourse = async (courseId: string) => {
  try {
    const token = getAccessToken();
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
};

export const getAssignmentByUser = async (userId: string) => {
  try {
    const token = getAccessToken();
    const response = await axios.get(`${ASSIGNMENT_URL}/by-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    handleError(error);
  }
};

export const createAssignment = async (assignmentData: AssignmentData) => {
  try {
    const token = getAccessToken();
    const response = await axios.post(`${ASSIGNMENT_URL}/create`, assignmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    handleError(error);
  }
};

export const updateAssignment = async (id: string, assignmentData: Partial<AssignmentData>) => {
  try {
    const token = getAccessToken();
    const response = await axios.put(`${ASSIGNMENT_URL}/update/${id}`, assignmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating assignment:", error);
    handleError(error);
  }
};

export const deleteAssignment = async (id: string) => {
  try {
    const token = getAccessToken();
    const response = await axios.delete(`${ASSIGNMENT_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment:", error);
    handleError(error);
  }
};
