import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { DataGrid, SelectionModelChangeParams } from '@material-ui/data-grid'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import OpenIcon from '@material-ui/icons/OpenInNew'

import { Auxiliary, useLocalStorage } from '../components'
import { styled } from '../styled'
import { IMovie } from '../utils/types'
import { removeMoviesByIds } from '../utils/helpers'

interface IProps {
    title: string
}

const Wrapper = styled.div`
    height: 630px;
    width: 100%;
`

const FlexBox = styled.div`
    display: flex;
    justify-content: flex-end;
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

const FavoriteMovies: React.FC<IProps> = ({ title }) => {
    const [selectedMovieIds, setSelectedMovieIds] = useState<Array<string>>([])

    useEffect(() => {
        document.title = title
    }, [title])

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
        const movie = favoriteMovies.find((movie: IMovie) => movie.id.toString() === id)

        if (!movie) return
        history.push(`/movie/${movie['imdbID']}`, { title: movie['Title'], year: movie['Year'] })
    }

    if (favoriteMovies.length === 0)
        return (
            <Alert severity="info">
                <AlertTitle>No results!</AlertTitle>
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
                    startIcon={<OpenIcon />}
                >
                    Open detail
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={selectedMovieIds.length === 0}
                    onClick={handleRemove}
                    startIcon={<DeleteIcon />}
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
                    onSelectionModelChange={handleSelectionChange}
                    checkboxSelection
                />
            </Wrapper>
        </Auxiliary>
    )
}

export default FavoriteMovies
