export interface Media {
    id: number;
    title: string;
    type: 'movie' | 'tv';
    posterPath: string;
    comment: string;
    watched: boolean;
    seasons?: number;
    episodes?: number;
  }
  
  export type FilterType = 'all' | 'watching' | 'watched' | 'movies' | 'tv';
  
  