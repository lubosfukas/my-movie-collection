type Response = 'True' | 'False'
type Type = 'movie' | 'series' | 'episode'

interface IApiResponseError {
    Response?: Response
    Error?: string
}

export interface IMovie {
    Title: string
    Year: string
    imdbID: string
    Poster: string
    Type: Type
}

export interface IMoviesApiResponse extends IApiResponseError {
    Search?: Array<IMovie>
    totalResults?: string
}

export interface IMoviesResponse extends IMoviesApiResponse {
    nextPage: number
}

export interface IMovieRating {
    Source: string
    Value: string
}

export interface IMovieDetail extends IApiResponseError {
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
