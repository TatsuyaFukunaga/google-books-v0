import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface DrawerMenuProps {
    onSearchClick: () => void;
    onFavoritesClick: () => void;
}

export function DrawerMenu({ onSearchClick, onFavoritesClick }: DrawerMenuProps) {
    const [open, setOpen] = useState(false);

    const handleSearchClick = () => {
        onSearchClick();
        setOpen(false);
    };

    const handleFavoritesClick = () => {
        onFavoritesClick();
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="flex flex-col space-y-4">
                    <Button onClick={handleSearchClick}>Search</Button>
                    <Button onClick={handleFavoritesClick}>Favorites</Button>
                </nav>
            </SheetContent>
        </Sheet>
    );
}

