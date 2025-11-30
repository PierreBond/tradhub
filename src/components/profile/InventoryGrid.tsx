'use client';

import { Item } from '@/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

interface InventoryGridProps {
  items: Item[];
}

export default function InventoryGrid({ items }: InventoryGridProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatStatus = (status: string) => {
    const statusMap: Record = {
      'available': 'Available',
      'pending': 'Pending',
      'traded': 'Traded'
    };
    return statusMap[status] || status;
  };

  return (
    
      {items.map((item, index) => (
        
          
            
          
          
            
              {item.name}
              
                {formatStatus(item.status || 'available')}
              
            
            
              ${item.value.toLocaleString()}
            
            
              {item.category} • {item.condition}
              Added {formatDate(item.dateAdded || '')}
            
            
              {item.views} views
              {item.proposals} proposals
            
            
              
                
                Edit
              
              
                
                Remove
              
            
          
        
      ))}
    
  );
}