'use client';

import { motion } from 'framer-motion';

export default function RecentTrades() {
  const trades = [
    {
      id: 1,
      from: "iPad Pro",
      to: "Camera Lens",
      time: "2 hours ago",
      profit: 150,
    },
    {
      id: 2,
      from: "Watch",
      to: "Headphones",
      time: "1 day ago",
      profit: 75,
    },
    {
      id: 3,
      from: "Guitar",
      to: "Tablet",
      time: "3 days ago",
      profit: -200,
    },
  ];

  return (
    
      Recent Trades
      
        {trades.map((trade, index) => (
          
            
              
                
                  {trade.from} → {trade.to}
                
                {trade.time}
              
              = 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trade.profit >= 0 ? '+' : ''}${trade.profit}
              
            
          
        ))}
      
    
  );
}