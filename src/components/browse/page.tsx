'use client';

import { useState, useMemo } from 'react';
import { mockBrowseItems } from '@/lib/data';
import { Item } from '@/lib/types';
import BrowseCard from '@/components/browse/BrowseCard';
import FilterSidebar, { FilterOptions } from '@/components/browse/FilterSidebar';
import ItemModal from '@/components/browse/ItemModal';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BrowsePage() {
  const [items] = useState(mockBrowseItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    categories: [],
    distance: 100,
    conditions: [],
    ratings: [],
  });
  const [wishlist, setWishlist] = useState<Set>(new Set());
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = items.filter((item) => {
      // Search filter
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Price filter
      const matchesPrice = item.value >= filters.minPrice && item.value <= filters.maxPrice;

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(item.category);

      // Distance filter
      const itemDistance = parseInt(item.distance || '0');
      const matchesDistance = itemDistance <= filters.distance;

      // Condition filter
      const matchesCondition =
        filters.conditions.length === 0 || filters.conditions.includes(item.condition);

      return matchesSearch && matchesPrice && matchesCategory && matchesDistance && matchesCondition;
    });

    // Sort items
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.value - b.value);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.value - a.value);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'distance':
        filtered.sort((a, b) => parseInt(a.distance || '0') - parseInt(b.distance || '0'));
        break;
      default:
        // relevance - keep original order
        break;
    }

    return filtered;
  }, [items, searchTerm, sortBy, filters]);

  const toggleWishlist = (itemId: number) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(itemId)) {
        newWishlist.delete(itemId);
      } else {
        newWishlist.add(itemId);
      }
      return newWishlist;
    });
  };

  const openModal = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <>
      
        {/* Header */}
        
          
            Browse Items
            Discover amazing items available for trade
          

          
            {/* Sort Dropdown */}
            <select
              className="bg-white border-2 border-neutral rounded-lg px-4 py-2 focus:border-accent focus:outline-none cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              Sort by Relevance
              Price: Low to High
              Price: High to Low
              Newest First
              Nearest First
            

            {/* Search */}
            
              
              <input
                type="text"
                placeholder="Search items..."
                className="bg-white border-2 border-neutral rounded-xl pl-10 pr-4 py-2 w-64 focus:border-accent focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            
          
        

        
          {/* Filter Sidebar */}
          
            
          

          {/* Items Grid */}
          
            {filteredItems.length === 0 ? (
              
                🔍
                No items found
                Try adjusting your filters or search terms
              
            ) : (
              <>
                
                  {filteredItems.map((item, index) => (
                    
                      
                    
                  ))}
                

                {/* Load More Button */}
                
                  <button
                    className="trade-button px-8 py-3"
                    onClick={() => alert('Loading more items...')}
                  >
                    Load More Items
                  
                
              </>
            )}
          
        
      

      {/* Item Detail Modal */}
      
    </>
  );
}