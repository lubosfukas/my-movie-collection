import React from 'react'

import ToolbarItem from './ToolbarItem'
import { styled } from '../../styled'
import { pages } from '../../utils'

const Ul = styled.ul`
    width: ${({ theme }) => theme.container.width};
    margin: 0 auto;
    padding: 0;
    list-style: none;
    overflow: hidden;
`

const ToolbarItems = (): React.ReactElement => (
    <Ul>
        <ToolbarItem exact to={pages.HOME}>
            Home
        </ToolbarItem>
        <ToolbarItem to={pages.FAVORITES}>Favorites</ToolbarItem>
    </Ul>
)

export default ToolbarItems
