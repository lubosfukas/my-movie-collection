import React from 'react'
import { DataGrid, SearchBar, LoadingSpinner } from '../components'
import { PageChangeParams } from '@material-ui/data-grid'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'

import { changePage, searchMovies } from '../modules/movies/actions'
import { IState } from '../modules/movies/types'
import { styled } from '../styled'

const Wrapper = styled.div`
    padding: 50px 0;
    margin: 0 auto;
    width: 1000px;
`

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
    const dispatch = useDispatch()
    const { movies, totalResults, page, loading, error } = useSelector((state: IState) => ({
        movies: state.data.movies,
        totalResults: state.data.totalResults,
        page: state.page,
        loading: state.loading,
        error: state.error
    }))

    const handlePageChange = (params: PageChangeParams) => dispatch(changePage(params.page))
    const handleSubmit = (searchTerm: string) => dispatch(searchMovies(searchTerm))

    return (
        <Wrapper>
            {loading && <LoadingSpinner />}
            <SearchBar onSubmit={handleSubmit} />
            {error && (
                <Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            )}
            {movies.length > 0 && (
                <DataGrid
                    rows={movies}
                    columns={columns}
                    pageSize={10}
                    rowCount={totalResults}
                    page={page}
                    handlePageChange={handlePageChange}
                />
            )}
        </Wrapper>
    )
}

export default MovieSearch
