import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

import './Thumbnail.scss'

interface IProps {
    imdbId: string
    title: string
    year: string
    poster: string
    onClicked: (imdbId: string) => void
}

const Thumbnail: React.FC<IProps> = ({ imdbId, title, year, poster, onClicked }) => {
    const handleOnClick = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onClicked(imdbId)
    }

    return (
        <Card onClick={handleOnClick} className="thumbnail-card">
            <CardContent>
                <CardMedia image={poster} title={title} className="thumbnail-poster" />
            </CardContent>
            <CardContent className="thumbnail-card-content">
                <Typography variant="h6" component="h2" className="thumbnail-title">
                    {title} ({year})
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Thumbnail
