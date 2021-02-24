import React, { useContext } from 'react'
import { NavLink as PlainNavLink } from 'react-router-dom'
import { ThemeContext } from 'styled-components'
import { styled } from '../../styled'

const Li = styled.li`
    float: left;
`

const NavLink = styled(PlainNavLink)`
    display: block;
    padding: 15px;
    text-align: center;
    text-decoration: none;

    color: ${({ theme }) => theme.color.white};

    :hover {
        background-color: ${({ theme }) => theme.color.black};
    }
`

interface IProps {
    to: string
    children: React.ReactNode
    exact?: boolean
}

const ToolbarItem: React.FC<IProps> = ({ to, children, exact = false }) => {
    const themeContext = useContext(ThemeContext)
    return (
        <Li>
            <NavLink to={to} exact={exact} activeStyle={{ backgroundColor: themeContext.color.red }}>
                {children}
            </NavLink>
        </Li>
    )
}

export default ToolbarItem
