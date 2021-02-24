import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DataGrid, SelectionModelChangeParams } from '@material-ui/data-grid'
import { Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

import { Auxiliary, useLocalStorage } from '../components'
import { styled } from '../styled'
import { IMovie } from '../types'
import { removeMoviesByIds } from '../utils/helpers'

const Wrapper = styled.div<{ height?: string }>`
    height: ${({ height }) => height || '630px'};
    width: 100%;
`

const FlexBox = styled.div`
    display: flex;
    margin-bottom: 20px;
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

const FavoriteMovies = (): React.ReactElement => {
    const [selectedMovieIds, setSelectedMovieIds] = useState<Array<string>>([])
    const [favoriteMovies, setFavoriteMovies] = useLocalStorage<Array<IMovie>>('favorite', [])
    const history = useHistory()

    const handleSelectionChange = (param: SelectionModelChangeParams) =>
        setSelectedMovieIds(param.selectionModel as Array<string>)

    const handleRemove = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setFavoriteMovies(removeMoviesByIds(favoriteMovies, selectedMovieIds))
        setSelectedMovieIds([])
    }

    const handleOpenDetail = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = selectedMovieIds[0]
        const imdb = favoriteMovies.find((movie: IMovie) => movie.id.toString() === id)?.imdbID

        if (!imdb) return
        history.push(`/movie/${imdb}`)
    }

    if (favoriteMovies.length === 0)
        return (
            <Alert severity="info">
                <AlertTitle>No movies!</AlertTitle>
            </Alert>
        )

    return (
        <Auxiliary>
            <FlexBox>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={selectedMovieIds.length !== 1}
                    onClick={handleOpenDetail}
                    style={{ marginRight: 15 }}
                >
                    Open detail
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={selectedMovieIds.length === 0}
                    onClick={handleRemove}
                >
                    Remove
                </Button>
            </FlexBox>
            <Wrapper>
                <DataGrid
                    rows={favoriteMovies}
                    rowCount={favoriteMovies.length}
                    pageSize={10}
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={handleSelectionChange}
                />
            </Wrapper>
        </Auxiliary>
    )
}

export default FavoriteMovies
