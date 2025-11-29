'use client';
import React from 'react';
import {PanInfo} from 'framer-motion';

import { Item } from '@/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ItemCard({
  item,
  isDraggable = false,
  handleDragStart,
}: {
  item: Item;
  isDraggable?: boolean;
  handleDragStart?: (item: Item, info: PanInfo) => void;
}) {
  const handleDragStartMemoized = React.useCallback(
  (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (handleDragStart) {
      handleDragStart(item, info);
    }
  },
  [handleDragStart, item]
);

  return (
    <motion.div
      className="item-card p-3"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      draggable={isDraggable}
      onDragStart={handleDragStartMemoized}
    >
      <Image
        src={item.image}
        alt={item.name}
        width={400}
        height={400}
        className="w-full h-auto object-cover"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 15vw"
        loading="lazy"
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-lg font-medium">{item.value.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}