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
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Recent Trades</h2>
      <div className="space-y-4">
        {trades.map((trade, index) => (
          <motion.div
            key={trade.id}
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div>
              <p className="font-medium">
                {trade.from} → {trade.to}
              </p>
              <p className="text-sm text-muted-foreground">{trade.time}</p>
            </div>
            <div
              className={`font-semibold ${trade.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {trade.profit >= 0 ? '+' : ''}${trade.profit}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}