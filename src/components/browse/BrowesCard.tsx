'use client';

import { Item } from '@/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface BrowseCardProps {
  item: Item;
  onOpenModal: (item: Item) => void;
  onToggleWishlist: (itemId: number) => void;
  isInWishlist: boolean;
}

export default function BrowseCard({ 
  item, 
  onOpenModal, 
  onToggleWishlist,
  isInWishlist 
}: BrowseCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const formatCondition = (condition: string) => {
    const conditionMap: Record = {
      'new': 'New',
      'like-new': 'Like New',
      'good': 'Good',
      'fair': 'Fair'
    };
    return conditionMap[condition] || condition;
  };

  return (
    <motion.div
      className="item-card cursor-pointer"
      onClick={() => onOpenModal(item)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      
        {!imageError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          
            No Image
          
        )}
      
      
      
        {item.name}
        
          ${item.value.toLocaleString()}
        
        
        
          
            {item.seller}
          
          
            ★★★★★
            {item.rating}
          
        
        
        
          
            {formatCondition(item.condition)}
          
          {item.distance}
        
        
        
          <button
            className="trade-button flex-1 text-sm py-2"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Trade proposal for ${item.name}`);
            }}
          >
            Trade
          
          <button
            className={`p-2 rounded-lg border-2 transition-all ${
              isInWishlist
                ? 'bg-accent border-accent text-white'
                : 'border-neutral hover:border-accent hover:bg-accent/10'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(item.id);
            }}
          >
            
          
        
      
    
  );
}