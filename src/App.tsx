import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Layout } from './components'
import { SearchMovies, MovieDetail, FavoriteMovies, NoMatch } from './pages'
import { pages } from './utils'
import './App.scss'

function App(): React.ReactElement {
    return (
        <Layout>
            <Switch>
                <Route exact path={pages.HOME}>
                    <SearchMovies title="Search movies" />
                </Route>
                <Route exact path={pages.MOVIE_DETAIL}>
                    <MovieDetail />
                </Route>
                <Route path={pages.FAVORITES}>
                    <FavoriteMovies title="Favorite movies" />
                </Route>
                <Route>
                    <NoMatch />
                </Route>
            </Switch>
        </Layout>
    )
}

export default App
