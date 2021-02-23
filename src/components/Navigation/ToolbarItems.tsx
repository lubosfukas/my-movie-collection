import React from 'react'

import ToolbarItem from './ToolbarItem'
import { styled } from '../../styled'
import { pages } from '../../utils'

const Ul = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
`

const ToolbarItems = (): React.ReactElement => (
    <Ul>
        <ToolbarItem to={pages.HOME}>Home</ToolbarItem>
        <ToolbarItem to={pages.FAVORITES}>Favorites</ToolbarItem>
    </Ul>
)

export default ToolbarItems
