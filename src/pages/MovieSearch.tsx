import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PageChangeParams, RowSelectedParams } from '@material-ui/data-grid'
import { Alert, AlertTitle } from '@material-ui/lab'

import { DataGrid, SearchBar, LoadingSpinner, Auxiliary } from '../components'
import { changePage, searchMovies } from '../modules/movies/actions'
import { IState } from '../modules/movies/types'
import { IMovie } from '../types'

const columns = [
    {
        field: 'id',
        headerName: 'IMDB ID',
        width: 130
    },
    { field: 'Title', headerName: 'Title', width: 670 },
    { field: 'Year', headerName: 'Year', width: 130 }
]

const MovieSearch = (): React.ReactElement => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { movies, totalResults, page, loading, error } = useSelector((state: IState) => ({
        movies: state.data.movies,
        totalResults: state.data.totalResults,
        page: state.page,
        loading: state.loading,
        error: state.error
    }))

    const handlePageChange = (param: PageChangeParams) => dispatch(changePage(param.page))
    const handleSubmit = (searchTerm: string) => dispatch(searchMovies(searchTerm))
    const handleSelectionChange = (param: RowSelectedParams) => {
        const movie = param.data as IMovie
        history.push(`/movie/${movie.imdbID}`)
    }

    const hasMovies = movies && movies.length > 0

    return (
        <Auxiliary>
            {loading && <LoadingSpinner />}
            <SearchBar onSubmit={handleSubmit} />

            {error && (
                <Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            )}
            {hasMovies && (
                <DataGrid
                    rows={movies}
                    columns={columns}
                    pageSize={10}
                    rowCount={totalResults}
                    page={page}
                    handlePageChange={handlePageChange}
                    handleSelectionChange={handleSelectionChange}
                />
            )}
        </Auxiliary>
    )
}

export default MovieSearch
