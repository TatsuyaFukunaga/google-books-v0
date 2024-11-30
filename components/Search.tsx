import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchProps {
    onSearch: (query: string) => void;
}

export function Search({ onSearch }: SearchProps) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="flex gap-2">
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books..."
            />
            <Button onClick={handleSearch}>Search</Button>
        </div>
    );
}

