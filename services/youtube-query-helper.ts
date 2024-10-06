import axios, { AxiosResponse, AxiosError } from "axios";
import { BaseApiResponse } from "./types";

interface YouTubeSearchParams {
  query: string;
  lang: string;
  order_by: string;
  country: string;
}

interface YouTubeSearchOptions {
  method: "GET";
  url: string;
  params: YouTubeSearchParams;
  headers: {
    "x-rapidapi-key": string;
    "x-rapidapi-host": string;
  };
}

export async function searchYouTube(
  searchQuery: string
): Promise<BaseApiResponse<any>> {
  const options: YouTubeSearchOptions = {
    method: "GET",
    url: "https://youtube-v2.p.rapidapi.com/search/",
    params: {
      query: searchQuery,
      lang: "en",
      order_by: "this_month",
      country: "us",
    },
    headers: {
      "x-rapidapi-key": "55cc28568emsh9e708db9bf53c80p1f4a42jsn639663033b65",
      "x-rapidapi-host": "youtube-v2.p.rapidapi.com",
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
