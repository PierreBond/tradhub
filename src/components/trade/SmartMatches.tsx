
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
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Smart Matches</h2>
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="flex items-center space-x-4">
            <Image
              src={match.image}
              alt={match.name}
              width={64}
              height={64}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div className="grow">
              <p className="font-semibold">{match.name}</p>
              <p className="text-sm text-muted-foreground">
                {match.matchText}
              </p>
            </div>
            <div className="font-medium">
              ${match.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}