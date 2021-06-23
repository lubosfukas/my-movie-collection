import React from 'react'
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import StarOutlineIcon from '@material-ui/icons/StarOutline'

import { IMovieDetail, IMovieRating } from '../../utils/types'
import './Detail.scss'

interface IProps extends IMovieDetail {
    isFavorite: boolean
    handleFavoriteClicked: () => void
}

const Section = ({ name, children }: { name?: string; children: React.ReactNode }) => (
    <div className="margin-bottom">
        {name && (
            <Typography variant="h5" component="h3">
                {name}
            </Typography>
        )}
        {children}
    </div>
)
const SectionItem = ({ name, value }: { name: string; value: string }) => (
    <Typography variant="body1" component="p">
        <strong>{name}:</strong> {value}
    </Typography>
)

const Detail: React.FC<IProps> = props => {
    const tooltip = props.isFavorite ? 'Remove from favorites' : 'Add to favorites'
    const imdb = `${props['imdbRating']}/10 (${props['imdbVotes']} votes)`
    const metascore = `${props['Metascore']}/100`
    const ratings = props['Ratings']

    return (
        <Card className="card">
            <CardContent className="card-content">
                <div className="title">
                    <Typography variant="h4" component="h1">
                        {props['Title']} ({props['Year']})
                    </Typography>
                    <CardActions>
                        <Tooltip title={tooltip}>
                            <IconButton
                                aria-label="favorite"
                                onClick={(_: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                                    props.handleFavoriteClicked()
                                }
                            >
                                {props.isFavorite ? (
                                    <StarIcon className="icon" />
                                ) : (
                                    <StarOutlineIcon className="icon" />
                                )}
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </div>

                <Typography variant="body2" color="textSecondary" component="p" className="margin-bottom">
                    {props['Rated']} | {props['Runtime']} | {props['Genre']} | {props['Released']}
                </Typography>

                <Typography variant="body2" component="p" className="margin-bottom">
                    {props['Plot']}
                </Typography>

                <Section>
                    <SectionItem name="Directors" value={props['Director']} />
                    <SectionItem name="Writers" value={props['Writer']} />
                    <SectionItem name="Producers" value={props['Production']} />
                    <SectionItem name="Stars" value={props['Actors']} />
                </Section>

                <Section name="Details">
                    <SectionItem name="Oficial sites" value={props['Website']} />
                    <SectionItem name="Country" value={props['Country']} />
                    <SectionItem name="Language" value={props['Language']} />
                    <SectionItem name="Genre" value={props['Genre']} />
                    <SectionItem name="Release Date" value={props['Released']} />
                    <SectionItem name="Released on DVD" value={props['DVD']} />
                </Section>

                <Section name="Box Office">
                    <SectionItem name="Country" value={props['Country']} />
                </Section>

                <Section name="Rating">
                    <SectionItem name="IMDB" value={imdb} />
                    <SectionItem name="Metascore" value={metascore} />
                    {ratings &&
                        ratings.length > 0 &&
                        ratings.map((rating: IMovieRating) => {
                            const source = rating['Source']
                            return <SectionItem key={source} name={source} value={rating['Value']} />
                        })}
                    <SectionItem name="Awards" value={props['Awards']} />
                </Section>
            </CardContent>

            <CardContent>
                <CardMedia image={props['Poster']} title={props['Title']} className="poster" />
            </CardContent>
        </Card>
    )
}

export default Detail
