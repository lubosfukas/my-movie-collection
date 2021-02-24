import React from 'react'

import Auxiliary from './Auxiliary'
import Toolbar from './Navigation/Toolbar'
import { styled } from '../styled'

interface IProps {
    children: React.ReactNode
}

const Main = styled.main`
    padding: 100px 0 50px 0;
    margin: 0 auto;
    width: 1000px;
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
