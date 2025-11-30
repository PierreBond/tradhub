'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  categories: string[];
  distance: number;
  conditions: string[];
  ratings: string[];
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    categories: ['electronics'],
    distance: 25,
    conditions: [],
    ratings: [],
  });

  const updateFilters = (updates: Partial) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
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
    
      Filters

      {/* Price Range */}
      
        Price Range
        
          <input
            type="number"
            placeholder="Min"
            className="bg-tertiary border-2 border-neutral rounded-lg px-3 py-2 w-20 text-sm focus:border-accent focus:outline-none"
            value={filters.minPrice || ''}
            onChange={(e) => updateFilters({ minPrice: Number(e.target.value) })}
          />
          -
          <input
            type="number"
            placeholder="Max"
            className="bg-tertiary border-2 border-neutral rounded-lg px-3 py-2 w-20 text-sm focus:border-accent focus:outline-none"
            value={filters.maxPrice || ''}
            onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
          />
        
      

      {/* Categories */}
      
        Categories
        
          {categories.map((category) => (
            
              <input
                type="checkbox"
                checked={filters.categories.includes(category.value)}
                onChange={() => toggleCategory(category.value)}
                className="w-5 h-5 rounded border-2 border-neutral text-secondary focus:ring-2 focus:ring-accent/20 cursor-pointer"
              />
              
                {category.label}
              
              ({category.count})
            
          ))}
        
      

      {/* Distance */}
      
        Distance
        <input
          type="range"
          min="1"
          max="100"
          value={filters.distance}
          onChange={(e) => updateFilters({ distance: Number(e.target.value) })}
          className="w-full h-2 bg-neutral rounded-lg appearance-none cursor-pointer accent-secondary"
        />
        
          1 mile
          {filters.distance} miles
          100 miles
        
      

      {/* Condition */}
      
        Condition
        
          {conditions.map((condition) => (
            
              <input
                type="checkbox"
                checked={filters.conditions.includes(condition.value)}
                onChange={() => {
                  const newConditions = filters.conditions.includes(condition.value)
                    ? filters.conditions.filter(c => c !== condition.value)
                    : [...filters.conditions, condition.value];
                  updateFilters({ conditions: newConditions });
                }}
                className="w-5 h-5 rounded border-2 border-neutral text-secondary focus:ring-2 focus:ring-accent/20 cursor-pointer"
              />
              
                {condition.label}
              
            
          ))}
        
      

      {/* Seller Rating */}
      
        Seller Rating
        
          {[
            { value: '5-star', label: '★★★★★', rating: '5.0' },
            { value: '4-star', label: '★★★★☆', rating: '4.0+' },
            { value: '3-star', label: '★★★☆☆', rating: '3.0+' },
          ].map((rating) => (
            
              
              
                {rating.label}
                {rating.rating}
              
            
          ))}
        
      

      <button
        className="trade-button w-full"
        onClick={() => onFilterChange(filters)}
      >
        Apply Filters
      
    
  );
}