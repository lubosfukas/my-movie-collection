import React from 'react'
import { Route, Switch } from 'react-router-dom'

import MovieSearch from './MovieSearch'
import { pages } from '../utils'

const Pages = (): React.ReactElement => (
    <Switch>
        <Route exact path={pages.HOME}>
            <MovieSearch />
        </Route>
        <Route path={pages.FAVORITES}>favorites</Route>
    </Switch>
)

export default Pages
