import React, { useContext } from 'react';
import Nextlink from 'next/link';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserMenu from './UserMenu';
import { Store } from '../utils/Store';
import { DARK_MODE_OFF, DARK_MODE_ON } from '../utils/constants';

function Navbar() {
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart, userInfo } = state;
    const toggleAppTheme = () => {
        dispatch({ type: darkMode ? DARK_MODE_OFF : DARK_MODE_ON });
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <CardMedia
                        component="img"
                        width="50"
                        image="/logo.png"
                        alt="the shopping booth logo"
                        sx={{ pr: 1, width: 60 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="h1"
                        sx={{ fontFamily: "'Cinzel', serif", cursor: 'default', flexGrow: 1 }}
                    >
                        The Shopping Booth
                    </Typography>
                    <IconButton sx={{ ml: 1 }} onClick={toggleAppTheme} color="inherit">
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <Nextlink href="/cart" passRef>
                        <IconButton
                            size="large"
                            aria-label="cart"
                            color="inherit"
                        >
                            {cart.cartItems.length > 0 ? <Badge badgeContent={cart.cartItems.length} color="error">
                                <ShoppingCartIcon />
                            </Badge> : <ShoppingCartIcon />}
                        </IconButton>
                    </Nextlink>
                    {userInfo ? (
                        <UserMenu userInfo={userInfo} />
                    ) : (
                        <Nextlink href="/signin" passRef>
                            <Button variant="outlined" color="inherit" sx={{ ml: 1 }}>Sign In</Button>
                        </Nextlink>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });