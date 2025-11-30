'use client';

import { Item } from '@/lib/types';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { useState } from 'react';

interface ItemModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleWishlist: (itemId: number) => void;
  isInWishlist: boolean;
}

export default function ItemModal({
  item,
  isOpen,
  onClose,
  onToggleWishlist,
  isInWishlist,
}: ItemModalProps) {
  const [imageError, setImageError] = useState(false);

  if (!item) return null;

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
    
      {isOpen && (
        
          <motion.div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            
              {/* Header */}
              
                
                  {item.name}
                
                
                  
                
              

              
                {/* Left Column - Image and Info */}
                
                  
                    {!imageError ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      
                        No Image Available
                      
                    )}
                  

                  
                    
                      {item.seller}
                    
                    
                      ★★★★★
                      {item.rating}
                    
                    
                      {formatCondition(item.condition)}
                    
                  
                

                {/* Right Column - Details */}
                
                  
                    
                      ${item.value.toLocaleString()}
                    
                    
                      {item.description}
                    
                  

                  {/* Stats */}
                  
                    
                      
                        Trade Responsiveness
                        {item.responsiveness}%
                      
                      
                        
                      
                    

                    
                      
                        Item Authenticity
                        {item.authenticity}%
                      
                      
                        
                      
                    

                    
                      
                        Shipping Speed
                        {item.shipping}%
                      
                      
                        
                      
                    
                  

                  {/* Actions */}
                  
                    <button
                      className="trade-button flex-1"
                      onClick={() => alert(`Trade proposal for ${item.name}`)}
                    >
                      Propose Trade
                    
                    <button
                      className={`px-4 py-3 rounded-xl border-2 transition-all font-medium flex items-center space-x-2 ${
                        isInWishlist
                          ? 'bg-accent border-accent text-white'
                          : 'border-neutral hover:border-accent hover:bg-accent/10'
                      }`}
                      onClick={() => onToggleWishlist(item.id)}
                    >
                      
                      
                        {isInWishlist ? 'Wishlisted' : 'Wishlist'}
                      
                    
                  
                
              
            
          
        
      )}
    
  );
}