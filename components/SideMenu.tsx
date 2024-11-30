import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
}

export function SideMenu({ open, onClose }: SideMenuProps) {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
        onClose();
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/search')}>
                        <ListItemText primary="Search" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/favorite')}>
                        <ListItemText primary="Favorites" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}

