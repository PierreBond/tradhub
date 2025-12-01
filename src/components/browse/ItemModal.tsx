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
    const conditionMap: Record<string, string> = {
      'new': 'New',
      'like-new': 'Like New',
      'good': 'Good',
      'fair': 'Fair'
    };
    return conditionMap[condition] || condition;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card text-card-foreground shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card p-6">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
              {/* Left Column - Image and Info */}
              <div className="space-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
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
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Seller</p>
                    <p className="font-medium">{item.seller}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="font-medium">★★★★★ {item.rating}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <p className="font-medium">{formatCondition(item.condition)}</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="flex flex-col space-y-6">
                <div>
                  <p className="text-3xl font-bold text-primary">${item.value.toLocaleString()}</p>
                  <p className="mt-4 text-muted-foreground">{item.description}</p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  {[
                    { label: 'Trade Responsiveness', value: item.responsiveness },
                    { label: 'Item Authenticity', value: item.authenticity },
                    { label: 'Shipping Speed', value: item.shipping },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium">{stat.label}</span>
                        <span className="text-muted-foreground">{stat.value}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${stat.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-3 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <button className="flex-1 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                    Propose Trade
                  </button>
                  <button
                    className={`flex items-center justify-center rounded-lg border-2 px-4 py-3 font-medium transition-all ${
                      isInWishlist
                        ? 'border-accent bg-accent text-white'
                        : 'border-border bg-transparent hover:border-accent hover:bg-accent/10'
                    }`}
                    onClick={() => onToggleWishlist(item.id)}
                  >
                    <Heart size={20} className="mr-2" />
                    {isInWishlist ? 'Wishlisted' : 'Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
//                     {!imageError ? (
//                       <Image
//                         src={item.image}
//                         alt={item.name}
//                         fill
//                         className="object-cover"
//                         onError={() => setImageError(true)}
//                       />
//                     ) : (
                      
//                         No Image Available
                      
//                     )}
                  

                  
                    
//                       {item.seller}
                    
                    
//                       ★★★★★
//                       {item.rating}
                    
                    
//                       {formatCondition(item.condition)}
                    
                  
                

//                 {/* Right Column - Details */}
                
                  
                    
//                       ${item.value.toLocaleString()}
                    
                    
//                       {item.description}
                    
                  

//                   {/* Stats */}
                  
                    
                      
//                         Trade Responsiveness
//                         {item.responsiveness}%
                      
                      
                        
                      
                    

                    
                      
//                         Item Authenticity
//                         {item.authenticity}%
                      
                      
                        
                      
                    

                    
                      
//                         Shipping Speed
//                         {item.shipping}%
                      
                      
                        
                      
                    
                  

//                   {/* Actions */}
                  
//                     <button
//                       className="trade-button flex-1"
//                       onClick={() => alert(`Trade proposal for ${item.name}`)}
//                     >
//                       Propose Trade
                    
//                     <button
//                       className={`px-4 py-3 rounded-xl border-2 transition-all font-medium flex items-center space-x-2 ${
//                         isInWishlist
//                           ? 'bg-accent border-accent text-white'
//                           : 'border-neutral hover:border-accent hover:bg-accent/10'
//                       }`}
//                       onClick={() => onToggleWishlist(item.id)}
//                     >
                      
                      
//                         {isInWishlist ? 'Wishlisted' : 'Wishlist'}
                      
                    
                  
                
              
            
          
        
//       )}
    
//   );
// }