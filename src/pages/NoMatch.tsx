import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'

const NoMatch = (): React.ReactElement => (
    <Alert severity="warning">
        <AlertTitle>Couldn't find page</AlertTitle>
    </Alert>
)

export default NoMatch
