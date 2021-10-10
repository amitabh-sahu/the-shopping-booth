import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { LOGOUT_USER } from '../utils/constants';
import { Store } from '../utils/Store';

export default function UserMenu({ userInfo }) {
    const router = useRouter();
    const { dispatch } = useContext(Store);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const logoutHandler = () => {
        setAnchorEl(null);
        dispatch({ type: LOGOUT_USER });
        router.push('/');
    };

    return (
        <div>
            <IconButton onClick={handleClick} color="inherit">
                <Avatar alt={userInfo.name} src={`https://avatars.dicebear.com/api/human/${userInfo.name}${userInfo._id}.svg`} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'user-menu-button',
                }}
                sx={{ width: 200 }}
            >
                <MenuItem onClick={logoutHandler}>
                    <ListItemIcon sx={{ color: '#d32f2f' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}
