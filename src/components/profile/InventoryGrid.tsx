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
    const statusMap: Record<string, string> = {
      'available': 'Available',
      'pending': 'Pending',
      'traded': 'Traded'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="relative h-48 w-full">
            <Image
              src={item.image || ''}
              alt={item.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold">{item.name}</h3>
              <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                {formatStatus(item.status || 'available')}
              </span>
            </div>
            <p className="mt-1 text-lg font-bold text-primary">
              ${item.value.toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.category} • {item.condition} • Added{' '}
              {formatDate(item.dateAdded || '')}
            </p>
            <div className="mt-3 flex justify-between text-sm text-muted-foreground">
              <span>{item.views} views</span>
              <span>{item.proposals} proposals</span>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex flex-1 items-center justify-center rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </button>
              <button className="flex flex-1 items-center justify-center rounded-md bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/20">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}