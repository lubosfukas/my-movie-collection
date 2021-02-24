import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import StarIcon from '@material-ui/icons/Star'

import { LoadingSpinner, Auxiliary, useFetch } from '../components'
import { styled } from '../styled'
import { config } from '../utils'

interface IProps {
    isFavorite?: boolean
}

const TitleFlexBox = styled.div`
    display: flex;
    justify-content: 'space-between';
`

const SectionWrapper = styled.div`
    margin-top: 15px;
`

const MovieDetail: React.FC<IProps> = ({ isFavorite = false }) => {
    const { movieId } = useParams<{ movieId: string }>()
    const [{ data, error, loading }] = useFetch({
        url: `http://www.omdbapi.com/?apiKey=${config.API_KEY}&i=${movieId}`
    })

    if (loading) return <LoadingSpinner />
    if (error)
        return (
            <Alert severity="error">
                <AlertTitle>Failed to load - {error.message}</AlertTitle>
            </Alert>
        )

    const tooltip = isFavorite ? '' : 'Add to favorites'

    return (
        <Auxiliary>
            {data && (
                <Card style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                        <TitleFlexBox style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h4" component="h1">
                                {data['Title']} ({data['Year']})
                            </Typography>
                            <CardActions>
                                <Tooltip title={tooltip}>
                                    <IconButton aria-label="favorite" color="secondary" disabled={isFavorite}>
                                        <StarIcon />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                        </TitleFlexBox>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            style={{ marginBottom: '20px' }}
                        >
                            {data['Rated']} | {data['Runtime']} | {data['Genre']} | {data['Released']}
                        </Typography>
                        <Typography variant="body2" component="p" style={{ marginBottom: '10px' }}>
                            {data['Plot']}
                        </Typography>
                        <Typography variant="body1" component="p">
                            <strong>Directors:</strong> {data['Director']}
                        </Typography>
                        <Typography variant="body1" component="p">
                            <strong>Writers:</strong> {data['Writer']}
                        </Typography>
                        <Typography variant="body1" component="p">
                            <strong>Producers:</strong> {data['Production']}
                        </Typography>
                        <Typography variant="body1" component="p">
                            <strong>Stars:</strong> {data['Actors']}
                        </Typography>
                        <SectionWrapper>
                            <Typography variant="h5" component="h3">
                                Details
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>Oficial sites:</strong> {data['Website']}
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>Country:</strong> {data['Country']}
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>Language:</strong> {data['Language']}
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>Genre:</strong> {data['Genre']}
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>Release Date:</strong> {data['Released']}
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>Released on DVD:</strong> {data['DVD']}
                            </Typography>
                        </SectionWrapper>
                        <SectionWrapper>
                            <Typography variant="h5" component="h3">
                                Box Office
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>Cumulative Worldwide Gross:</strong> {data['BoxOffice']}
                            </Typography>
                        </SectionWrapper>
                        <SectionWrapper>
                            <Typography variant="h5" component="h3">
                                Rating
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>IMDB:</strong> {data['imdbRating']}/10 ({data['imdbVotes']} votes)
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>Metascore:</strong> {data['Metascore']}/100
                            </Typography>
                            {data['Ratings'] &&
                                data['Ratings'].length > 0 &&
                                data['Ratings'].map((rating: { Source: string; Value: string }) => {
                                    return (
                                        <Typography variant="body1" component="p">
                                            <strong>{rating['Source']}:</strong> {rating['Value']}
                                        </Typography>
                                    )
                                })}
                            <Typography variant="body1" component="p">
                                <strong>Awards:</strong> {data['Awards']}
                            </Typography>
                        </SectionWrapper>
                    </CardContent>
                    <CardContent>
                        <CardMedia
                            style={{
                                height: 500,
                                width: 300,
                                padding: '30px'
                            }}
                            image={data['Poster']}
                            title={data['Title']}
                        />
                    </CardContent>
                </Card>
            )}
        </Auxiliary>
    )
}

export default MovieDetail
