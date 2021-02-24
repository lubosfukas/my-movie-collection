import { IMovie } from '../types'

export const addId = (movie: IMovie): IMovie => {
    const imdbId = movie['imdbID'] as string
    const id = parseFloat(imdbId.substring(2))

    return { ...movie, id }
}

export const addIds = (movies: Array<IMovie>): Array<IMovie> => {
    if (!movies) return []

    return movies.map((movie: IMovie) => addId(movie))
}

export const containsMovie = (favoriteMovies: Array<IMovie>, imdbId: string): boolean =>
    favoriteMovies && favoriteMovies.length > 0 ? favoriteMovies.some(p => p.imdbID === imdbId) : false

export const addMovie = (movies: Array<IMovie>, movie: IMovie): Array<IMovie> => {
    if (!movie) return movies

    const hasMovie = containsMovie(movies, movie.imdbID)
    const moviesCopy = movies && movies.length > 0 ? [...movies] : []

    if (!hasMovie) moviesCopy.push({ ...movie })

    return moviesCopy
}

export const removeMovieByImdbId = (movies: Array<IMovie>, imdbId: string): Array<IMovie> => {
    const moviesCopy = [...movies]
    return moviesCopy.filter(movie => movie.imdbID !== imdbId)
}

export const removeMoviesByIds = (movies: Array<IMovie>, ids: Array<string>): Array<IMovie> =>
    movies.filter(movie => !ids.some(id => id === movie.id.toString()))
