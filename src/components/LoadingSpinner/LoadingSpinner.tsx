import { CircularProgress } from '@material-ui/core'

import './LoadingSpinner.scss'

const LoadingSpinner = (): React.ReactElement => (
    <div className="centered">
        <CircularProgress className="spinner" />
    </div>
)

export default LoadingSpinner
