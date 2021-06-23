type Response = 'True' | 'False'
type Type = 'movie' | 'series' | 'episode'

export interface IMovie {
    Title: string
    Year: string
    imdbID: string
    Poster: string
    Type: Type
}

export interface IMoviesResponse {
    Search: Array<IMovie>
    totalResults: string
    Response: Response
}

export interface IMovieRating {
    Source: string
    Value: string
}

export interface IMovieDetail {
    Actors: string
    Awards: string
    BoxOffice: string
    Country: string
    DVD: string
    Director: string
    Genre: string
    Language: string
    Metascore: string
    Plot: string
    Poster: string
    Production: string
    Rated: string
    Ratings: Array<IMovieRating>
    Released: string
    Response: string
    Runtime: string
    Title: string
    Type: Type
    Website: string
    Writer: string
    Year: string
    imdbID: string
    imdbRating: string
    imdbVotes: string
}

export interface IResponseError {
    Error: string
    Response: Response
}
