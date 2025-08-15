"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  availableCategories: string[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  availableCategories,
  sortBy,
  onSortChange,
  onClearFilters,
}: SearchFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search sites by name or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          autoFocus
        />
      </div>

      {/* Sort and Clear Filters */}
      <div className="flex items-center justify-between gap-4">
        <Select value={sortBy} onValueChange={onSortChange} defaultValue="name">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent className="bg-transparent backdrop-blur-xl">
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="updated">Recently Updated</SelectItem>
            <SelectItem value="updated-desc">Oldest Updated</SelectItem>
          </SelectContent>
        </Select>

        {(selectedCategories.length > 0 || searchQuery) && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="gap-1 bg-transparent"
          >
            <X className="w-3 h-3" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Category Filters */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Filter by Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableCategories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <Badge
                key={category}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-300/60 transition-colors"
                onClick={() => onCategoryToggle(category)}
              >
                {category}
                {isSelected && <X className="w-3 h-3 ml-1" />}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(selectedCategories.length > 0 || searchQuery) && (
        <div className="text-sm text-muted-foreground">
          {searchQuery && <span>Searching for &quot;{searchQuery}&quot;</span>}
          {searchQuery && selectedCategories.length > 0 && <span> • </span>}
          {selectedCategories.length > 0 && (
            <span>
              {selectedCategories.length} category filter
              {selectedCategories.length !== 1 ? "s" : ""} active
            </span>
          )}
        </div>
      )}
    </div>
  );
}
