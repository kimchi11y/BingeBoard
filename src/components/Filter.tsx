import React from 'react';
import { FilterType } from '@/types';
import { Button } from "@/components/ui/button"

interface FilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function Filter({ currentFilter, onFilterChange }: FilterProps) {
  const filters: FilterType[] = ['all', 'watching', 'watched', 'movies', 'tv'];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter}
          onClick={() => onFilterChange(filter)}
          variant={currentFilter === filter ? "default" : "outline"}
          size="sm"
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </Button>
      ))}
    </div>
  );
}

