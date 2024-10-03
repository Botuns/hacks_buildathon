export type SearchResult = {
  imageUrl: string;
  descriptionAnswer: string;
  confidenceLevel: number;
  externalLink: string;
};

export interface OpenAiSearchResults {
  overviewDescription: string;
  results: SearchResult[];
}
