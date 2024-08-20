import axios, { AxiosResponse, AxiosError } from "axios";
import { BaseApiResponse } from "./types";

export async function searchImages(
  query: string
): Promise<BaseApiResponse<any>> {
  const options = {
    method: "GET",
    url: "https://joj-image-search.p.rapidapi.com/v2/",
    params: {
      q: query,
      hl: "en",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY ?? "",
      "x-rapidapi-host": "joj-image-search.p.rapidapi.com",
    },
  };

  try {
    const response: AxiosResponse = await axios.request(options);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      errorMessage = axiosError.message;
      if (axiosError.response) {
        console.error("Response data:", axiosError.response.data);
        console.error("Response status:", axiosError.response.status);
      }
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
}
