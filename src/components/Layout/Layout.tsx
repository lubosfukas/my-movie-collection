import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Drawer, IconButton, MenuList, MenuItem, ListItemIcon, ListItemText, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import StarIcon from '@material-ui/icons/Star'

import Auxiliary from '../common/Auxiliary'
import SearchBar from '../SearchBar/SearchBar'
import useWindowSize from '../hooks/useWindowSize'
import './Layout.scss'

interface IProps {
    children: React.ReactNode
}

const Layout: React.FC<IProps> = ({ children }) => {
    const [showDrawer, setShowDrawer] = useState(false)
    const { width } = useWindowSize()

    let drawerWidth = '15%'
    if (width && width < 425) drawerWidth = '60%'
    else if (width && width < 1024) drawerWidth = '40%'

    return (
        <Auxiliary>
            <AppBar position="static" className="app-bar">
                <Toolbar>
                    <IconButton onClick={() => setShowDrawer(!showDrawer)}>
                        <MenuIcon className="menu-icon" />
                    </IconButton>
                    <SearchBar />
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={showDrawer}
                onClick={() => setShowDrawer(false)}
                PaperProps={{ style: { width: drawerWidth } }}
            >
                <MenuList>
                    <MenuItem component={NavLink} exact to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </MenuItem>
                    <MenuItem component={NavLink} to="/favorites">
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText>Favorites</ListItemText>
                    </MenuItem>
                </MenuList>
            </Drawer>
            <main className="main">{children}</main>
        </Auxiliary>
    )
}

export default Layout
