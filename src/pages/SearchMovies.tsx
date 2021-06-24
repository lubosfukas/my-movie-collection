import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Alert, AlertTitle } from '@material-ui/lab'

import { Thumbnail, LoadingSpinner } from '../components'
import { useFetchMovies } from '../hooks'
import { IMovie } from '../utils/types'
import { MovieContext } from '../App'

interface IProps {
    title: string
}

const SearchMovies: React.FC<IProps> = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    const history = useHistory()
    const movieContext = useContext(MovieContext)

    if (!movieContext) {
        throw new Error('useCount must be used within a CountProvider')
    }

    const { data, isFetching, fetchNextPage } = useFetchMovies(movieContext.searchTerm)

    const responseError = data && data.pages.length === 1 ? data.pages[0].Error : ''

    const moviesArrays =
        data && data.pages.map(response => (response.Search ? response.Search.map(movie => movie) : []))
    const movies = moviesArrays ? moviesArrays.reduce((prev, cur) => prev.concat(cur), []) : []

    const dataLength = movies.length
    const totalResults = data && data.pages[0].totalResults ? parseInt(data.pages[0].totalResults, 10) : 0

    const handleOpenDetail = (imdbId: string) => {
        const movie = movies.find((movie: IMovie) => movie['imdbID'].toString() === imdbId)

        if (!movie) return
        history.push(`/movie/${movie['imdbID']}`, { title: movie['Title'], year: movie['Year'] })
    }

    const hasMovies = movies && movies.length > 0
    const moreMovies = movies && movies.length < totalResults

    if (!hasMovies && !isFetching && responseError)
        return (
            <Alert severity="warning">
                <AlertTitle>{responseError}</AlertTitle>
            </Alert>
        )

    return (
        <InfiniteScroll
            dataLength={dataLength}
            next={fetchNextPage}
            hasMore={!!moreMovies}
            loader={<LoadingSpinner />}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
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
        </InfiniteScroll>
    )
}

export default SearchMovies
