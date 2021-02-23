import React from 'react'

import Auxiliary from './Auxiliary'
import Toolbar from './Navigation/Toolbar'
import { styled } from '../styled'

interface IProps {
    children: React.ReactNode
}

const Main = styled.main`
    margin-top: 50px;
`

const Layout: React.FC<IProps> = ({ children }) => {
    return (
        <Auxiliary>
            <Toolbar />
            <Main>{children}</Main>
        </Auxiliary>
    )
}

export default Layout
