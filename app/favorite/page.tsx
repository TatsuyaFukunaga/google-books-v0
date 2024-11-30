'use client'

import { useState, useEffect } from 'react';
import { CustomAppBar } from '../../components/AppBar';
import { SideMenu } from '../../components/SideMenu';
import { Favorites } from '../../components/Favorites';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { TooltipProvider } from '@radix-ui/react-tooltip';

export default function FavoritePage() {
    const [user, setUser] = useState<User | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/');
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        localStorage.removeItem('searchResults');
    }, []);

    return (
        <TooltipProvider>
            <div>
                <CustomAppBar user={user} onMenuClick={() => setIsMenuOpen(true)} />
                <SideMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                <main className="container mx-auto p-4">
                    {user && <Favorites userId={user.uid} />}
                </main>
            </div>
        </TooltipProvider>
    );
}

