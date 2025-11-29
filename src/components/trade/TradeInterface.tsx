'use client';

import { useState } from 'react';
import { Item } from '@/lib/types';
import ItemCard from './ItemCard';
import { motion, AnimatePresence } from 'framer-motion';

interface TradeInterfaceProps {
  inventory: Item[];
}

export default function TradeInterface({ inventory }: TradeInterfaceProps) {
  const [yourOffer, setYourOffer] = useState<Item[]>([]);
  const [theirOffer, setTheirOffer] = useState<Item[]>([]);
  const [cashAdjustment, setCashAdjustment] = useState(0);
  
  const yourTotal = yourOffer.reduce((sum, item) => sum + item.value, 0);
  const theirTotal = theirOffer.reduce((sum, item) => sum + item.value, 0);
  const balance = theirTotal - yourTotal - cashAdjustment;
  const isBalanced = Math.abs(balance) < 10;
  
  const handleDragStart = (e: React.DragEvent, item: Item) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
  };
  
  const handleItemDrop = (event: React.DragEvent, dropZone: 'your' | 'their') => {
    event.preventDefault();
    const droppedItem = JSON.parse(event.dataTransfer.getData('item'));

    if (dropZone === 'your') {
      setYourOffer((prevItems) => [...prevItems, droppedItem]);
    } else {
      setTheirOffer((prevItems) => [...prevItems, droppedItem]);
    }
  };
  
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Trade Interface</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Your Offer Zone */}
        <div
          className="border-2 border-dashed border-neutral rounded-lg p-6 min-h-64 transition-all"
          onDrop={(e) => handleItemDrop(e, 'your')}
          onDragOver={handleDragOver}
        >
          <h2 className="text-xl font-bold mb-4">Your Offer</h2>
          {yourOffer.length === 0 ? (
            <p className="text-neutral-500">Drag items here to make an offer</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {yourOffer.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Their Offer Zone */}
        <div
          className="border-2 border-dashed border-neutral rounded-lg p-6 min-h-64 transition-all"
          onDrop={(e) => handleItemDrop(e, 'their')}
          onDragOver={handleDragOver}
        >
          <h2 className="text-xl font-bold mb-4">Their Offer</h2>
          {theirOffer.length === 0 ? (
            <p className="text-neutral-500">
              Trade partners items will appear here
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {theirOffer.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Trade Balance */}
      <div className="mt-6 p-4 bg-neutral-100 rounded-lg text-center">
        <p className="text-2xl font-bold">
          ${Math.abs(balance).toLocaleString()}
        </p>
        <p className="text-neutral-600">
          {balance === 0
            ? 'Trade is perfectly balanced!'
            : balance > 0
            ? 'You receive extra'
            : 'You pay extra'}
        </p>
      </div>

      {/* Cash Adjustment */}
      <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold">Cash Adjustment</label>
          <div className="flex items-center gap-2">
            <span>You pay:</span>
            <input
              type="number"
              className="bg-white border-2 border-neutral rounded-lg px-3 py-2 w-24 text-center font-semibold focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all"
              value={cashAdjustment}
              onChange={(e) => setCashAdjustment(Number(e.target.value))}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Trade Action */}
      <div className="mt-6">
        <button className="w-full bg-primary text-white font-bold py-3 rounded-lg disabled:bg-neutral-300 transition-all">
          {isBalanced ? 'Execute Trade' : 'Balance Trade to Enable'}
        </button>
      </div>
    </div>
  );
}