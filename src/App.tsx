import React, { createContext, useState, useMemo } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Layout } from './components'
import { SearchMovies, MovieDetail, FavoriteMovies, NoMatch } from './pages'
import { pages } from './utils'
import './App.scss'

interface IMovieContext {
    searchTerm: string
    setSearchTerm: (newSearchTerm: string) => void
}

export const MovieContext = createContext<IMovieContext | undefined>(undefined)

function App(): React.ReactElement {
    const [searchTerm, setSearchTerm] = useState('')

    const memoizedProvider = useMemo(
        () => ({
            searchTerm,
            setSearchTerm: (newSearchTerm: string) => setSearchTerm(newSearchTerm)
        }),
        [searchTerm]
    )

    return (
        <MovieContext.Provider value={memoizedProvider}>
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
        </MovieContext.Provider>
    )
}

export default App
