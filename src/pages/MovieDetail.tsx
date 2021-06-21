import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Alert, AlertTitle } from '@material-ui/lab'

import { Detail, LoadingSpinner } from '../components'
import { useLocalStorage } from '../hooks'
import { setMovies, hasMovie } from '../utils/helpers'
import { IMovie, IMovieDetail, IResponseError } from '../utils/types'
import axios, { AxiosError } from 'axios'

const fetchMovieDetail = async (movieId: string) => {
    const { data } = await axios.get<IMovieDetail>(
        `http://www.omdbapi.com/?apiKey=${process.env.REACT_APP_API_KEY}&i=${movieId}&plot=full`
    )

    return data
}

const MovieDetail = (): React.ReactElement => {
    const { movieId } = useParams<{ movieId: string }>()
    const location = useLocation<{ title: string; year: string }>()

    useEffect(() => {
        if (!location.state) document.title = 'Movie detail'
        else document.title = `${location.state?.title} (${location.state.year})`
    }, [location])

    const { isFetching, error, data } = useQuery<IMovieDetail, AxiosError<IResponseError>>(
        'fetchMovieDetail',
        () => fetchMovieDetail(movieId),
        { retry: false }
    )

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
        const isFavorite = hasMovie(favoriteMovies, movieId)
        const handleFavoriteClicked = () => setFavoriteMovies(setMovies(favoriteMovies, data))

        return <Detail isFavorite={isFavorite} handleFavoriteClicked={handleFavoriteClicked} {...data} />
    }

    return (
        <Alert severity="info">
            <AlertTitle>No data to display!</AlertTitle>
        </Alert>
    )
}

export default MovieDetail
