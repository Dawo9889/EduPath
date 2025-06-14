import axios from "axios";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.status === 401) {
      throw new Error("Unauthorized access");
    } else if (
      error.code === "ECONNABORTED" ||
      error.message === "Network Error"
    ) {
      throw new Error("Server error");
    } else {
      throw new Error("An unexpected error occurred");
    }
  } else {
    throw new Error("An unexpected error occurred");
  }
};

export const getAccessToken = () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  return token;
};
