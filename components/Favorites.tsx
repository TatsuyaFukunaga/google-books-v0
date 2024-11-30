import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { BookCard } from './BookCard';

interface Book {
    id: string;
    title: string;
    author: string;
    authors: string[];
    publisher: string;
    description: string;
    thumbnail: string;
}

interface FavoritesProps {
    userId: string;
}

export function Favorites({ userId }: FavoritesProps) {
    const [favorites, setFavorites] = useState<Book[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favoritesCollection = collection(db, `users/${userId}/favorites`);
            const favoritesSnapshot = await getDocs(favoritesCollection);
            const favoritesList = favoritesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Book));
            setFavorites(favoritesList);
        };

        fetchFavorites();
    }, [userId]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((book) => (
                <BookCard key={book.id} {...book} userId={userId} />
            ))}
        </div>
    );
}

