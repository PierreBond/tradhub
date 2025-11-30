
'use client';

import Image from 'next/image';

export default function SmartMatches() {
  const matches = [
    {
      id: 1,
      name: "Herman Miller Chair",
      matchText: "Matches your MacBook",
      price: 899,
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
    },
    {
      id: 2,
      name: "PS5 Bundle",
      matchText: "Great for your iPhone",
      price: 649,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
    },
  ];

  return (
    
      Smart Matches
      
        {matches.map((match) => (
          
            
              
            
            
              
                {match.name}
              
              {match.matchText}
            
            
              ${match.price}
            
          
        ))}
      
    
  );
}