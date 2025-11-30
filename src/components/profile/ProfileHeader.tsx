'use client';

import { mockUser } from '@/lib/data';
import { motion } from 'framer-motion';

export default function ProfileHeader() {
  return (
    
      
      
        
          
            {mockUser.initials}
          
          
            {mockUser.name}
            
              Member since {mockUser.memberSince} • Verified Trader
            
            
              
                ★★★★★
                {mockUser.rating}
                ({mockUser.reviews} reviews)
              
              •
              {mockUser.location}
            
          
        

        {/* Stats Overview */}
        
          
            
              {mockUser.stats.itemsTraded}
            
            Items Traded
          
          
            
              ${mockUser.stats.totalValue.toLocaleString()}
            
            Total Value
          
          
            
              {mockUser.stats.successRate}%
            
            Success Rate
          
          
            
              {mockUser.stats.daysActive}
            
            Days Active
          
        
      
    
  );
}