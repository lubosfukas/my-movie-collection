import { CircularProgress } from '@material-ui/core'

import { styled } from '../styled'

const Centered = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const LoadingSpinner = (): React.ReactElement => (
    <Centered>
        <CircularProgress />
    </Centered>
)

export default LoadingSpinner
