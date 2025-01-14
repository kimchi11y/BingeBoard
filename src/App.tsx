import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { MediaCard } from '@/components/MediaCard';
import { Filter } from '@/components/Filter';
import { Media, FilterType } from '@/types';

export default function App() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const savedMediaList = localStorage.getItem('mediaList');
    if (savedMediaList) {
      setMediaList(JSON.parse(savedMediaList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mediaList', JSON.stringify(mediaList));
  }, [mediaList]);

  const handleAddMedia = (media: Media) => {
    setMediaList((prevList) => [...prevList, media]);
  };

  const handleUpdateMedia = (updatedMedia: Media) => {
    setMediaList((prevList) =>
      prevList.map((item) => (item.id === updatedMedia.id ? updatedMedia : item))
    );
  };

  const filteredMediaList = mediaList.filter((media) => {
    switch (filter) {
      case 'watching':
        return !media.watched;
      case 'watched':
        return media.watched;
      case 'movies':
        return media.type === 'movie';
      case 'tv':
        return media.type === 'tv';
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Binge Board</h1>
        <h2 className="text-2xl  mb-8 text-center">Keep track of your binge-worthy movies and TV shows!</h2>
        <SearchBar onAddMedia={handleAddMedia} />
        <Filter currentFilter={filter} onFilterChange={setFilter} />
        <div className="space-y-4">
          {filteredMediaList.map((media) => (
            <MediaCard key={media.id} media={media} onUpdate={handleUpdateMedia} />
          ))}
        </div>
      </div>
    </div>
  );
}

