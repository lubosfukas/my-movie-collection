import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { Thumbnail, LoadingSpinner } from '../../components'
import { useFetchMovies } from '../../hooks'
import { IMovie } from '../../utils/types'
import './SearchMovies.scss'
import { MovieContext } from '../../App'

interface IProps {
    title: string
}

const SearchMovies: React.FC<IProps> = ({ title }) => {
    const [page, setPage] = useState(1)
    useEffect(() => {
        document.title = title
    }, [title])

    const history = useHistory()
    const movieContext = useContext(MovieContext)

    if (!movieContext) {
        throw new Error('useCount must be used within a CountProvider')
    }

    const { data, error, isFetching } = useFetchMovies({
        page: 1,
        searchTerm: movieContext.searchTerm
    })

    const movies = data && data['Search'] ? data['Search'] : []
    const totalResults = data && data.totalResults ? parseInt(data.totalResults, 10) : 0

    const handlePageChange = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setPage(page + 1)
    }

    const handleOpenDetail = (imdbId: string) => {
        const movie = movies.find((movie: IMovie) => movie['imdbID'].toString() === imdbId)

        if (!movie) return
        history.push(`/movie/${movie['imdbID']}`, { title: movie['Title'], year: movie['Year'] })
    }

    const hasMovies = movies && movies.length > 0
    const moreMovies = movies && movies.length < totalResults

    if (!hasMovies && !isFetching && error)
        return (
            <Alert severity="error">
                <AlertTitle>{error}</AlertTitle>
            </Alert>
        )
    if (!hasMovies && !isFetching && !error)
        return (
            <Alert severity="info">
                <AlertTitle>No results!</AlertTitle>
            </Alert>
        )

    return (
        <div className="column-flex-box">
            {isFetching && <LoadingSpinner />}
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
