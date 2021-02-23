import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { pages } from '../utils'

const Pages = (): React.ReactElement => (
    <Switch>
        <Route exact path={pages.HOME}>
            home
        </Route>
        <Route path={pages.FAVORITES}>favorites</Route>
    </Switch>
)

export default Pages
