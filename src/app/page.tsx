import { mockInventory } from '@/lib/data';
import ItemCard from '@/components/trade/ItemCard';
import TradeInterface from '@/components/trade/TradeInterface';

export default function TradePage() {
  return (
    <>
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold">Smart Bartering Platform</h1>
        <p className="text-xl text-neutral-600 mt-2">
          Trade items with cash adjustments for fair exchanges
        </p>
      </div>

      {/* Main Trading Interface */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Panel: User Inventory */}
        <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Your Inventory</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockInventory.map((item) => (
              <ItemCard key={item.id} item={item} isDraggable={true} />
            ))}
          </div>
        </div>

        {/* Center Panel: Trade Interface */}
        <div className="lg:col-span-2">
          <TradeInterface inventory={mockInventory} />
        </div>

        {/* Right Panel: Trade Summary */}
        <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Trade Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Your Items:</span>
              <span>0</span>
            </div>
            <div className="flex justify-between">
              <span>Their Items:</span>
              <span>0</span>
            </div>
            <div className="flex justify-between">
              <span>Cash Amount:</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t">
              <span>Total Value:</span>
              <span>$0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}