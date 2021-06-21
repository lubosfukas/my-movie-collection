import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { Thumbnail, LoadingSpinner } from '../../components'
import { changePage } from '../../modules/movies/actions'
import { IState } from '../../modules/movies/types'
import { IMovie } from '../../utils/types'
import './SearchMovies.scss'

interface IProps {
    title: string
}

const SearchMovies: React.FC<IProps> = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    const history = useHistory()
    const dispatch = useDispatch()
    const { movies, totalResults, page, loading, error } = useSelector((state: IState) => ({
        movies: state.data.movies,
        totalResults: state.data.totalResults,
        page: state.page,
        loading: state.loading,
        error: state.error
    }))

    const handlePageChange = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(changePage(page + 1))
    }

    const handleOpenDetail = (imdbId: string) => {
        const movie = movies.find((movie: IMovie) => movie['imdbID'].toString() === imdbId)

        if (!movie) return
        history.push(`/movie/${movie['imdbID']}`, { title: movie['Title'], year: movie['Year'] })
    }

    const hasMovies = movies && movies.length > 0
    const moreMovies = movies.length < totalResults

    if (!hasMovies && !loading && error)
        return (
            <Alert severity="error">
                <AlertTitle>{error}</AlertTitle>
            </Alert>
        )
    if (!hasMovies && !loading && !error)
        return (
            <Alert severity="info">
                <AlertTitle>No results!</AlertTitle>
            </Alert>
        )

    return (
        <div className="column-flex-box">
            {loading && <LoadingSpinner />}
            <div className="row-flex-box">
                {movies.map((movie: IMovie) => {
                    const imdbId = movie['imdbID']
                    const title = movie['Title']

                    return (
                        <Thumbnail
                            key={`${imdbId}-${title}`}
                            imdbId={imdbId}
                            title={title}
                            year={movie['Year']}
                            poster={movie['Poster']}
                            onClicked={(imdbId: string) => handleOpenDetail(imdbId)}
                        />
                    )
                })}
            </div>
            {moreMovies && (
                <IconButton onClick={handlePageChange}>
                    <ExpandMore />
                </IconButton>
            )}
        </div>
    )
}

export default SearchMovies
