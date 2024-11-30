'use client'

import { useState, useEffect } from 'react';
import { CustomAppBar } from '../../components/AppBar';
import { SideMenu } from '../../components/SideMenu';
import { Search } from '../../components/Search';
import { BookCard } from '../../components/BookCard';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';

interface GoogleBookItem {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        publisher?: string;
        description?: string;
        imageLinks?: {
            thumbnail?: string;
        };
    };
}

interface Book {
    id: string;
    title: string;
    authors: string[];
    publisher: string;
    description: string;
    thumbnail: string;
}

export default function SearchPage() {
    const [user, setUser] = useState<User | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
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

    const handleSearch = async (query: string) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            const formattedBooks = data.items.map((item: GoogleBookItem) => ({
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [],
                publisher: item.volumeInfo.publisher || 'Unknown',
                description: item.volumeInfo.description || 'No description available',
                thumbnail: item.volumeInfo.imageLinks?.thumbnail || '/placeholder.png',
            }));
            setBooks(formattedBooks);
        } catch (error) {
            console.error('Error searching books', error);
        }
    };

    return (
        <div>
            <CustomAppBar user={user} onMenuClick={() => setMenuOpen(true)} />
            <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
            <main className="container mx-auto p-4">
                <Search onSearch={handleSearch} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {books.map((book) => (
                        <BookCard key={book.id} {...book} userId={user?.uid || ''} />
                    ))}
                </div>
            </main>
        </div>
    );
}

