'use client'

import { useEffect } from 'react';
import { CustomAppBar } from '../components/AppBar';
import { SideMenu } from '../components/SideMenu';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/search');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      <CustomAppBar user={null} onMenuClick={() => { }} />
      <SideMenu open={false} onClose={() => { }} />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Favorite Google Books</h1>
        <p>Please sign in to start searching and saving your favorite books.</p>
      </main>
    </div>
  );
}

