import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid, PageChangeParams, SelectionModelChangeParams } from '@material-ui/data-grid'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Button } from '@material-ui/core'
import OpenIcon from '@material-ui/icons/OpenInNew'

import { SearchBar, LoadingSpinner, Auxiliary } from '../components'
import { changePage, searchMovies } from '../modules/movies/actions'
import { styled } from '../styled'
import { IState } from '../modules/movies/types'
import { IMovie } from '../utils/types'

interface IProps {
    title: string
}

const Wrapper = styled.div`
    height: 630px;
    width: 100%;
`

const FlexBox = styled.div`
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

const columns = [
    {
        field: 'id',
        headerName: 'IMDB ID',
        width: 130,
        sortable: false,
        filterable: false
    },
    { field: 'Title', headerName: 'Title', width: 670 },
    { field: 'Year', headerName: 'Year', width: 130 }
]

const MovieSearch: React.FC<IProps> = ({ title }) => {
    const [selectedMovieIds, setSelectedMovieIds] = useState<Array<string>>([])

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

    const handlePageChange = (param: PageChangeParams) => {
        dispatch(changePage(param.page))
        setSelectedMovieIds([])
    }
    const handleSubmit = (searchTerm: string) => {
        dispatch(searchMovies(searchTerm))
        setSelectedMovieIds([])
    }
    const handleSelectionChange = (params: SelectionModelChangeParams) =>
        setSelectedMovieIds(params.selectionModel as Array<string>)
    const handleOpenDetail = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = selectedMovieIds[0]
        const movie = movies.find((movie: IMovie) => movie.id.toString() === id)

        if (!movie) return
        history.push(`/movie/${movie['imdbID']}`, { title: movie['Title'], year: movie['Year'] })
    }

    const hasMovies = movies && movies.length > 0

    return (
        <Auxiliary>
            {loading && <LoadingSpinner />}
            <FlexBox>
                <SearchBar onSubmit={handleSubmit} />
                {hasMovies && (
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={selectedMovieIds.length !== 1}
                        onClick={handleOpenDetail}
                        style={{ marginLeft: 15 }}
                        startIcon={<OpenIcon />}
                    >
                        Open detail
                    </Button>
                )}
            </FlexBox>

            {!loading && error && (
                <Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            )}
            {!hasMovies && !loading && !error && (
                <Alert severity="info">
                    <AlertTitle>No results!</AlertTitle>
                </Alert>
            )}
            {hasMovies && (
                <Wrapper>
                    <DataGrid
                        rows={movies}
                        columns={columns}
                        rowCount={totalResults}
                        pagination
                        page={page}
                        pageSize={10}
                        paginationMode="server"
                        onPageChange={handlePageChange}
                        onSelectionModelChange={handleSelectionChange}
                        checkboxSelection
                    />
                </Wrapper>
            )}
        </Auxiliary>
    )
}

export default MovieSearch
