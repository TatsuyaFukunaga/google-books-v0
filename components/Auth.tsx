import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { Button } from '@/components/ui/button';

export function Auth({ onAuthStateChanged }: { onAuthStateChanged: (user: User | null) => void }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            onAuthStateChanged(user);
        });
        return () => unsubscribe();
    }, [onAuthStateChanged]);

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error signing in with Google', error);
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    if (user) {
        return (
            <div>
                <p>Welcome, {user.displayName}!</p>
                <Button onClick={signOut}>Sign Out</Button>
            </div>
        );
    }

    return <Button onClick={signIn}>Sign In with Google</Button>;
}

