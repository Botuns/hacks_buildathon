import { tavily } from "@tavily/core";

export interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  rawContent?: string;
  score: number;
  publishedDate?: string;
}

export interface TavilyImage {
  url: string;
  description?: string;
}

export interface TavilySearchResponse {
  answer?: string;
  query: string;
  responseTime: number;
  images: TavilyImage[];
  results: TavilySearchResult[];
}

export interface AiSearchResults {
  overviewDescription: string;
  results: TavilySearchResult[];
  images: TavilyImage[];
}

// Instantiate Tavily client
export const tvly = tavily({ apiKey: "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" });
