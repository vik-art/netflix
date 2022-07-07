export interface Movie {
  id: number;
  favourite?: boolean;
  selected?: boolean;
  genres: Array<any>;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  original_language: string;
  backdrop_path: string;
  adult: boolean;
  budget: number;
  runtime: number;
  spoken_languages: Array<any>;
  production_countries: Array<any>;
  status: string;
  tagline: string;
  vote_count: number;
}

export interface SearchMovieresponse {
  results?: Array<Movie>;
  page: number;
}
