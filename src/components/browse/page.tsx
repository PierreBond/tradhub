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
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 10000,
    categories: [],
    distance: 100,
    conditions: [],
    ratings: [], // Assuming FilterOptions has this
  });
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-primary">Browse Items</h1>
            <p className="text-muted-foreground">Discover amazing items available for trade</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <select
              className="cursor-pointer rounded-lg border-2 border-border bg-background px-4 py-2 focus:border-accent focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="distance">Nearest First</option>
            </select>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search items..."
                className="w-64 rounded-xl border-2 border-border bg-background py-2 pl-10 pr-4 focus:border-accent focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Items Grid */}
          <div className="lg:col-span-3">
            {filteredItems.length === 0 ? (
              <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card text-center">
                <div className="text-5xl">🔍</div>
                <h3 className="mt-4 text-xl font-semibold">No items found</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredItems.map((item) => (
                    <motion.div key={item.id} layout>
                      <BrowseCard
                        item={item}
                        isWishlisted={wishlist.has(item.id)}
                        onToggleWishlist={() => toggleWishlist(item.id)}
                        onViewDetails={() => openModal(item)}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Load More Button */}
                <div className="text-center">
                  <button
                    className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    onClick={() => alert('Loading more items...')}
                  >
                    Load More Items
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      <ItemModal
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={closeModal}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedItem ? wishlist.has(selectedItem.id) : false}
      />
    </>
  );
}