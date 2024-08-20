interface Source {
  name: string;
  page: string;
  title: string;
}

interface Thumbnail {
  url: string;
  height: number;
  width: number;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface ImageSearchResult {
  source: Source;
  thumbnail: Thumbnail;
  image: Image;
  dominantColor: string | null;
}

interface ExtractedImageInfo {
  imageUrl: string;
  description: string;
}

/**
 * Extracts a maximum of 10 images with their URLs and descriptions from the search results.
 * @param results - The API response array.
 * @returns An array of objects containing image URLs and descriptions.
 */
export function extractImageInfo(
  results: ImageSearchResult[]
): ExtractedImageInfo[] {
  return results.slice(0, 10).map((result) => ({
    imageUrl: result.image.url,
    description: result.source.title,
  }));
}
