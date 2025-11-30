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
    
      {isOpen && (
        
          <motion.div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            
              
                Add New Item
                
                  
                
              

              
                
                  
                    Item Name
                  
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., iPhone 14 Pro"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                

                
                  
                    Category
                  
                  <select
                    className="form-input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    Select category
                    Electronics
                    Watches
                    Audio Equipment
                    Gaming
                    Furniture
                    Collectibles
                  
                

                
                  
                    Estimated Value ($)
                  
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g., 899"
                    min="1"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    required
                  />
                

                
                  
                    Condition
                  
                  <select
                    className="form-input"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    required
                  >
                    Select condition
                    New
                    Like New
                    Good
                    Fair
                  
                

                
                  
                    Description
                  
                  <textarea
                    className="form-textarea"
                    placeholder="Describe your item in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                

                
                  
                    Photos
                  
                  
                    
                    Drag and drop photos here
                    or click to browse
                    
                  
                
