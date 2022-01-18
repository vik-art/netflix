export interface Movie {
    id: number,
    favourite?: boolean,
    selected?: boolean,
    genre_ids: Array<Number>,
    title: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
    overview: string,
    original_language: string,
    backdrop_path: string
}

export interface SearchMovieresponse {
    results?: Array<Movie>
}