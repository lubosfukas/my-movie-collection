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

    const { data, isFetching } = useFetchMovieDetail(movieId)
    const [favoriteMovies, setFavoriteMovies] = useLocalStorage<Array<IMovie>>('favorite', [])

    const responseError = data && data.Response && data.Response === 'False' ? data.Error : ''

    if (isFetching) return <LoadingSpinner />
    if (!isFetching && responseError) {
        return (
            <Alert severity="error">
                <AlertTitle>{responseError}</AlertTitle>
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
