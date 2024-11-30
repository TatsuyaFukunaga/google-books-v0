import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';

interface AppBarProps {
    user: User | null;
    onMenuClick: () => void;
}

export function CustomAppBar({ user, onMenuClick }: AppBarProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/search');
        } catch (error) {
            console.error('Error signing in with Google', error);
        }
        handleClose();
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.push('/');
        } catch (error) {
            console.error('Error signing out', error);
        }
        handleClose();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={onMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Favorite Google Books
                </Typography>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        {user ? (
                            <Avatar alt={user.displayName || ''} src={user.photoURL || ''} />
                        ) : (
                            <Typography variant="button">Login</Typography>
                        )}
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {user ? (
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        ) : (
                            <MenuItem onClick={handleLogin}>Login</MenuItem>
                        )}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}

