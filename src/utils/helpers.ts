import { IMovie } from './types'

export const isFavoriteMovie = (movies: Array<IMovie>, imdbId: string): boolean =>
    movies && movies.length > 0 ? movies.some(x => x['imdbID'] === imdbId) : false

export const updateFavoriteMovies = (movies: Array<IMovie>, movie: IMovie): Array<IMovie> => {
    if (!movie) return movies

    const isFavorite = isFavoriteMovie(movies, movie['imdbID'])
    const moviesCopy = movies && movies.length > 0 ? [...movies] : []

    if (isFavorite) return moviesCopy.filter(movie => movie['imdbID'] !== movie.imdbID)

    moviesCopy.push({ ...movie })
    return moviesCopy
}
