'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { useState } from 'react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    value: '',
    condition: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Item added successfully!');
    onClose();
  };

  return (
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-card text-card-foreground shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card p-6">
              <h2 className="text-xl font-semibold">Add New Item</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="mb-1 block text-sm font-medium">Item Name</label>
                  <input
                    type="text"
                    className="w-full rounded-md border bg-input p-2 text-foreground"
                    placeholder="e.g., iPhone 14 Pro"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Category</label>
                    <select
                      className="w-full rounded-md border bg-input p-2 text-foreground"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="" disabled>Select category</option>
                      <option>Electronics</option>
                      <option>Watches</option>
                      <option>Audio Equipment</option>
                      <option>Gaming</option>
                      <option>Furniture</option>
                      <option>Collectibles</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Estimated Value ($)</label>
                    <input
                      type="number"
                      className="w-full rounded-md border bg-input p-2 text-foreground"
                      placeholder="e.g., 899"
                      min="1"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Condition</label>
                  <select
                    className="w-full rounded-md border bg-input p-2 text-foreground"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select condition</option>
                    <option>New</option>
                    <option>Like New</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Description</label>
                  <textarea
                    className="w-full rounded-md border bg-input p-2 text-foreground"
                    placeholder="Describe your item in detail..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Photos</label>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-6 text-center">
                    <div className="text-muted-foreground">
                      <Upload className="mx-auto h-10 w-10" />
                      <p className="mt-2">Drag and drop photos here</p>
                      <p className="text-xs">or click to browse</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Add Item
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}