interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Video {
  video_id: string;
  title: string;
  author: string;
  number_of_views: number;
  video_length: string;
  description: string;
  is_live_content: boolean | null;
  published_time: string;
  channel_id: string;
  category: string | null;
  type: string;
  keywords: string[];
  thumbnails: Thumbnail[];
}

interface ApiResponse {
  number_of_videos: number;
  query: string;
  country: string;
  lang: string;
  timezone: string;
  continuation_token: string;
  videos: Video[];
}

export function extractVideoUrlsAndDescriptions(
  responseData: ApiResponse
): { url: string; description: string }[] {
  const maxVideos = 10;

  return responseData.videos.slice(0, maxVideos).map((video) => {
    const videoUrl = video.thumbnails.length > 0 ? video.thumbnails[0].url : "";
    return {
      url: `https://www.youtube.com/embed/${video.video_id}`,
      description: `Carefully and intelligently get the description from this title: ${video.title}`,
    };
  });
}
