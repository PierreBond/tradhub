'use client';

export default function TradeSummary() {
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Trade Summary</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Your Items:</span>
          <span className="font-medium">0</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Their Items:</span>
          <span className="font-medium">0</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Cash Amount:</span>
          <span className="font-medium">$0</span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex items-center justify-between font-bold">
        <span>Total Value:</span>
        <span>$0</span>
      </div>
    </div>
  );
}