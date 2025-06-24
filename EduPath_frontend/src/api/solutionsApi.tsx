import axios, { AxiosResponse } from "axios";
import { getAccessToken, handleError } from "./utils";

const SOLUTION_URL = `${import.meta.env.VITE_API_URL}/solution`;

export type SolutionResponseData = {
  id: string;
  assignmentId: string;
  userId: string;
  filepath: string;
  dateSubmitted: string;
};

export type SolutionRequestData = {
  assignmentId: string;
  courseId: string;
  userId: string;
  filename: string;
  file: File;
  dateSubmitted: Date;
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

export const downloadSolution = async (solutionId: string) => {
  try {
    const token = getAccessToken();
    const response = await axios.get(
      `${SOLUTION_URL}/download/${solutionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error downloading solution:", error);
    handleError(error);
  }
};

export const downloadAllSolutionsByAssignment = async (assignmentId: string) => {
  try {
    const token = getAccessToken();
    const response = await axios.get(
      `${SOLUTION_URL}/download-by-assignment/${assignmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );
    return response;
  } catch (error) {
    console.error("Error downloading all solutions:", error);
    handleError(error);
  }
};

export const parseFileResponse = async (response: AxiosResponse) => {
  const contentType = response.headers["content-type"] || "application/octet-stream";
  let filename = "default.zip";

  const contentDisposition = response.headers["content-disposition"];
  console.log(response.headers);
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename=?(.+)?;/);
    if (filenameMatch && filenameMatch[1]) {
      console.log(filenameMatch[1]);
      filename = filenameMatch[1];
    }
  }

  const blob = new Blob([response.data], { type: contentType as string });
  const blobUrl = window.URL.createObjectURL(blob);

  return {
    blobUrl, filename};
}

export const uploadSolution = async (solutionData: SolutionRequestData) => {
  try {
    const data = new FormData();

    data.append("assignmentId", solutionData.assignmentId);
    data.append("courseId", solutionData.courseId);
    data.append("userId", solutionData.userId);
    data.append("filename", solutionData.filename);
    data.append("file", solutionData.file);
    data.append("dateSubmitted", solutionData.dateSubmitted.toDateString());

    const token = getAccessToken();
    const response = await axios.post<SolutionRequestData>(
      `${SOLUTION_URL}/upload-solution`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form"
        }
      }
    );
    return response;
  } catch (error) {
    console.log("Error uploading solution:", error);
    handleError(error);
  }
};

