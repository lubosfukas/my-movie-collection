import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab'

import { Detail, LoadingSpinner } from '../components'
import { useFetchMovieDetail, useLocalStorage } from '../hooks'
import { updateFavoriteMovies, isFavoriteMovie } from '../utils/helpers'
import { IMovie } from '../utils/types'

const MovieDetail = (): React.ReactElement => {
    const { movieId } = useParams<{ movieId: string }>()
    const location = useLocation<{ title: string; year: string }>()

    useEffect(() => {
        if (!location.state) document.title = 'Movie detail'
        else document.title = `${location.state?.title} (${location.state.year})`
    }, [location])

    const { isFetching, error, data } = useFetchMovieDetail(movieId)
    const [favoriteMovies, setFavoriteMovies] = useLocalStorage<Array<IMovie>>('favorite', [])

    if (isFetching) return <LoadingSpinner />
    if (!isFetching && error) {
        const response = error.response?.data

        if (response?.Response === 'False')
            return (
                <Alert severity="error">
                    <AlertTitle>{response?.Error}</AlertTitle>
                </Alert>
            )

        return (
            <Alert severity="error">
                <AlertTitle>Failed to load!</AlertTitle>
            </Alert>
        )
    }

    if (!isFetching && data) {
        const isFavorite = isFavoriteMovie(favoriteMovies, movieId)
        const handleFavoriteClicked = () => setFavoriteMovies(updateFavoriteMovies(favoriteMovies, data))

        return <Detail isFavorite={isFavorite} handleFavoriteClicked={handleFavoriteClicked} {...data} />
    }

    return (
        <Alert severity="info">
            <AlertTitle>No data to display!</AlertTitle>
        </Alert>
    )
}

export default MovieDetail
