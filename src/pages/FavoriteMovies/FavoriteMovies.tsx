import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab'

import { Thumbnail, useLocalStorage } from '../../components'
import { IMovie } from '../../utils/types'
import './FavoriteMovies.scss'

interface IProps {
    title: string
}

const FavoriteMovies: React.FC<IProps> = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    const [favoriteMovies] = useLocalStorage<Array<IMovie>>('favorite', [])
    const history = useHistory()

    const handleOpenDetail = (imdbId: string) => {
        const movie = favoriteMovies.find((movie: IMovie) => movie['imdbID'].toString() === imdbId)

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
        <div className="flex-container">
            {favoriteMovies.map((movie: IMovie) => {
                const imdbId = movie['imdbID']

                return (
                    <Thumbnail
                        key={imdbId}
                        imdbId={imdbId}
                        title={movie['Title']}
                        year={movie['Year']}
                        poster={movie['Poster']}
                        onClicked={(imdbId: string) => handleOpenDetail(imdbId)}
                    />
                )
            })}
        </div>
    )
}

export default FavoriteMovies
