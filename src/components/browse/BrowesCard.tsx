'use client';

import { Item } from '@/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface BrowseCardProps {
  item: Item;
  onViewDetails: (item: Item) => void;
  onToggleWishlist: (itemId: number) => void;
  isInWishlist: boolean;
}

export default function BrowseCard({ 
  item, 
  onViewDetails, 
  onToggleWishlist,
  isInWishlist 
}: BrowseCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const formatCondition = (condition: string) => {
    const conditionMap: Record<string, string> = {
      'new': 'New',
      'like-new': 'Like New',
      'good': 'Good',
      'fair': 'Fair'
    };
    return conditionMap[condition] || condition;
  };

  return (
    <motion.div
      className="cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-lg"
      onClick={() => onViewDetails(item)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square w-full">
        {!imageError ? (
          <Image
            src={item.image || ''}
            alt={item.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="font-bold text-primary">${item.value.toLocaleString()}</p>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
          <p>{item.seller}</p>
          <p className="flex items-center">
            <span className="text-yellow-500">★★★★★</span>
            <span className="ml-1">{item.rating}</span>
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-1 font-medium text-secondary-foreground">
            {formatCondition(item.condition)}
          </span>
          <span>{item.distance} away</span>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 rounded-md bg-primary/10 py-2 text-sm font-medium text-primary hover:bg-primary/20">
            Trade
          </button>
          <button
            className={`rounded-md border-2 p-2 transition-all ${
              isInWishlist
                ? 'border-accent bg-accent text-white'
                : 'border-border hover:border-accent hover:bg-accent/10'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(item.id);
            }}
          >
            <Heart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}