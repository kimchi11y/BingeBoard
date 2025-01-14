import React, { useState } from 'react';
import { searchMedia } from '@/utils/api';
import { Media } from '@/types';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

interface SearchBarProps {
  onAddMedia: (media: Media) => void;
}

export function SearchBar({ onAddMedia }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Media[]>([]);

  const handleSearch = async () => {
    if (query.trim()) {
      const searchResults = await searchMedia(query);
      setResults(searchResults);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
          placeholder="Search for a movie or TV show"
        />
        <Button onClick={handleSearch} variant="outline">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
      {results.length > 0 && (
        <ul className="mt-2 border rounded-md bg-background shadow-sm">
          {results.map((media) => (
            <li
              key={media.id}
              className="p-2 hover:bg-accent cursor-pointer transition-colors"
              onClick={() => {
                onAddMedia(media);
                setResults([]);
                setQuery('');
              }}
            >
              {media.title} ({media.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

