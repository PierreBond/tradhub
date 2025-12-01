'use client';

import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  filters: FilterOptions;
}

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  categories: string[];
  distance: number;
  conditions: string[];
  ratings: string[];
}

export default function FilterSidebar({ onFilterChange, filters }: FilterSidebarProps) {
  const updateFilters = (updates: Partial<FilterOptions>) => {
    const newFilters = { ...filters, ...updates };
    onFilterChange(newFilters);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const categories = [
    { value: 'electronics', label: 'Electronics', count: 124 },
    { value: 'watches', label: 'Watches', count: 89 },
    { value: 'audio', label: 'Audio Equipment', count: 67 },
    { value: 'gaming', label: 'Gaming', count: 45 },
    { value: 'furniture', label: 'Furniture', count: 32 },
    { value: 'collectibles', label: 'Collectibles', count: 28 },
  ];

  const conditions = [
    { value: 'new', label: 'New' },
    { value: 'like-new', label: 'Like New' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
  ];

  return (
    <motion.div
      className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 flex items-center text-lg font-semibold">
        <SlidersHorizontal className="mr-3 h-5 w-5" />
        Filters
      </h2>
      {/* Price Range */}
      <div className="space-y-4 border-b pb-6">
        <h3 className="font-medium">Price Range</h3>
        <div className="flex items-center justify-between space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full rounded-md border bg-input p-2 text-sm text-foreground"
            value={filters.minPrice || ''}
            onChange={(e) => updateFilters({ minPrice: Number(e.target.value) || 0 })}
          />
          <span className="text-muted-foreground">-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-full rounded-md border bg-input p-2 text-sm text-foreground"
            value={filters.maxPrice || ''}
            onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) || 10000 })}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3 border-b py-6">
        <h3 className="font-medium">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.value)}
                  onChange={() => toggleCategory(category.value)}
                  className="h-4 w-4 cursor-pointer rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm">{category.label}</span>
              </label>
              <span className="text-xs text-muted-foreground">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Distance */}
      <div className="space-y-3 border-b py-6">
        <h3 className="font-medium">Distance</h3>
        <input
          type="range"
          min="1"
          max="100"
          value={filters.distance}
          onChange={(e) => updateFilters({ distance: Number(e.target.value) })}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 mile</span>
          <span className="font-semibold text-primary">{filters.distance} miles</span>
          <span>100 miles</span>
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-3 border-b py-6">
        <h3 className="font-medium">Condition</h3>
        <div className="grid grid-cols-2 gap-2">
          {conditions.map((condition) => (
            <label key={condition.value} className="flex cursor-pointer items-center space-x-3">
              <input
                type="checkbox"
                checked={filters.conditions.includes(condition.value)}
                onChange={() => {
                  const newConditions = filters.conditions.includes(condition.value)
                    ? filters.conditions.filter((c) => c !== condition.value)
                    : [...filters.conditions, condition.value];
                  updateFilters({ conditions: newConditions });
                }}
                className="h-4 w-4 cursor-pointer rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm">{condition.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Seller Rating */}
      <div className="space-y-3 pt-6">
        <h3 className="font-medium">Seller Rating</h3>
        <div className="space-y-2">
          {[
            { value: '5-star', label: '★★★★★', rating: '5.0' },
            { value: '4-star', label: '★★★★☆', rating: '4.0+' },
            { value: '3-star', label: '★★★☆☆', rating: '3.0+' },
          ].map((rating) => (
            <label key={rating.value} className="flex cursor-pointer items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-border text-primary focus:ring-primary"
              />
              <span className="flex items-baseline">
                <span className="text-sm text-yellow-500">{rating.label}</span>
                <span className="ml-2 text-xs text-muted-foreground">{rating.rating}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
}