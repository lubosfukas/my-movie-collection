import React from 'react'

import ToolbarItems from './ToolbarItems'
import { styled } from '../../styled'

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 90;
    background-color: ${({ theme }) => theme.color.dark};
`

const Toolbar = (): React.ReactElement => (
    <Nav>
        <ToolbarItems />
    </Nav>
)

export default Toolbar
