import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Layout } from './components'
import { MovieDetail, MovieSearch, NoMatch } from './pages'
import { GlobalStyle } from './styled'
import { theme } from './styled/theme'
import { pages } from './utils'

function App(): React.ReactElement {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>
                <Switch>
                    <Route exact path={pages.HOME}>
                        <MovieSearch />
                    </Route>
                    <Route exact path={pages.MOVIE_DETAIL}>
                        <MovieDetail />
                    </Route>
                    <Route path={pages.FAVORITES}>favorites</Route>
                    <Route>
                        <NoMatch />
                    </Route>
                </Switch>
            </Layout>
        </ThemeProvider>
    )
}

export default App
