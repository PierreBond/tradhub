'use client';

import { mockUser } from '@/lib/data';
import { motion } from 'framer-motion';

export default function ProfileHeader() {
  return (
    <motion.div
      className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent text-4xl font-bold text-primary">
          {mockUser.initials}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{mockUser.name}</h1>
          <p className="text-muted-foreground">
            Member since {mockUser.memberSince} • Verified Trader
          </p>
          <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
            <span className="text-yellow-500">★★★★★</span>
            <span>
              {mockUser.rating} ({mockUser.reviews} reviews)
            </span>
            <span>•</span>
            <span>{mockUser.location}</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <div className="text-center">
          <p className="text-2xl font-bold">{mockUser.stats.itemsTraded}</p>
          <p className="text-sm text-muted-foreground">Items Traded</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">
            ${mockUser.stats.totalValue.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Value</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{mockUser.stats.successRate}%</p>
          <p className="text-sm text-muted-foreground">Success Rate</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{mockUser.stats.daysActive}</p>
          <p className="text-sm text-muted-foreground">Days Active</p>
        </div>
      </div>
    </motion.div>
  );
}