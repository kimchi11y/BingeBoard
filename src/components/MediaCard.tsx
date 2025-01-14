import React from 'react';
import { Media } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Plus, Minus } from 'lucide-react'

interface MediaCardProps {
  media: Media;
  onUpdate: (updatedMedia: Media) => void;
}

export function MediaCard({ media, onUpdate }: MediaCardProps) {
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...media, comment: e.target.value });
  };

  const handleWatchedToggle = () => {
    onUpdate({ ...media, watched: !media.watched });
  };

  const handleSeasonUpdate = (increment: boolean) => {
    if (media.type === 'tv' && media.seasons !== undefined) {
      onUpdate({ ...media, seasons: increment ? media.seasons + 1 : Math.max(0, media.seasons - 1) });
    }
  };

  const handleEpisodeUpdate = (increment: boolean) => {
    if (media.type === 'tv' && media.episodes !== undefined) {
      onUpdate({ ...media, episodes: increment ? media.episodes + 1 : Math.max(0, media.episodes - 1) });
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <img src={media.posterPath} alt={media.title} className="w-24 h-36 object-cover rounded-md" />
        <div className="flex-grow">
          <CardTitle>{media.title}</CardTitle>
          <p className="text-muted-foreground">{media.type === 'movie' ? 'Movie' : 'TV Show'}</p>
          <div className="flex items-center mt-2">
            <Checkbox
              id={`watched-${media.id}`}
              checked={media.watched}
              onCheckedChange={handleWatchedToggle}
            />
            <label htmlFor={`watched-${media.id}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Watched
            </label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {media.type === 'tv' && (
          <div className="flex gap-4 mb-4">
            <div className="flex items-center">
              <span className="mr-2 text-sm">Seasons:</span>
              <Button variant="outline" size="icon" onClick={() => handleSeasonUpdate(false)}><Minus className="h-4 w-4" /></Button>
              <span className="mx-2">{media.seasons}</span>
              <Button variant="outline" size="icon" onClick={() => handleSeasonUpdate(true)}><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-sm">Episodes:</span>
              <Button variant="outline" size="icon" onClick={() => handleEpisodeUpdate(false)}><Minus className="h-4 w-4" /></Button>
              <span className="mx-2">{media.episodes}</span>
              <Button variant="outline" size="icon" onClick={() => handleEpisodeUpdate(true)}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
        <Textarea
          value={media.comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          rows={3}
        />
      </CardContent>
    </Card>
  );
}

