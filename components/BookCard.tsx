import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import Image from 'next/image';

interface BookCardProps {
    id: string;
    title: string;
    authors: string[];
    publisher: string;
    description: string;
    thumbnail: string;
    userId: string;
}

export function BookCard({ id, title, authors, publisher, description, thumbnail, userId }: BookCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (userId) {
                const docRef = doc(db, `users/${userId}/favorites`, id);
                const docSnap = await getDoc(docRef);
                setIsFavorite(docSnap.exists());
            }
        };
        checkFavoriteStatus();
    }, [id, userId]);

    const toggleFavorite = async () => {
        if (!userId) return;

        if (isFavorite) {
            setShowDeleteConfirmation(true);
        } else {
            try {
                const docRef = doc(db, `users/${userId}/favorites`, id);
                await setDoc(docRef, {
                    title,
                    authors,
                    publisher,
                    description,
                    thumbnail,
                });
                setIsFavorite(true);
            } catch (error) {
                console.error('Error adding favorite', error);
            }
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            const docRef = doc(db, `users/${userId}/favorites`, id);
            await deleteDoc(docRef);
            setIsFavorite(false);
        } catch (error) {
            console.error('Error removing favorite', error);
        }
        setShowDeleteConfirmation(false);
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="line-clamp-2">{title}</CardTitle>
                <CardDescription>{authors.join(', ')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Image 
                    src={thumbnail} 
                    alt={title} 
                    width={500}
                    height={192}
                    className="w-full h-48 object-cover mb-4" 
                />
                <p className="text-sm mb-2">Publisher: {publisher}</p>
                <p className="text-sm line-clamp-3">{description}</p>
            </CardContent>
            <CardFooter>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" onClick={toggleFavorite}>
                                <Heart className={isFavorite ? 'fill-current text-red-500' : ''} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
            <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove from Favorites</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove this book from your favorites?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
}

