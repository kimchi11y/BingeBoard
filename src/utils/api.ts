import { Media } from "@/types";

const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMedia(query: string): Promise<Media[]> {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  
  return data.results.map((item: any) => ({
    id: item.id,
    title: item.title || item.name,
    type: item.media_type,
    posterPath: item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : '/placeholder.svg',
    comment: '',
    watched: false,
    seasons: item.media_type === 'tv' ? 0 : undefined,
    episodes: item.media_type === 'tv' ? 0 : undefined,
  }));
}

