'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockUser } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold text-primary">TradeHub</h1>
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`transition-colors ${
                isActive('/')
                  ? 'text-primary font-medium border-b-2 border-accent pb-1'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Trade
            </Link>
            <Link
              href="/browse"
              className={`transition-colors ${
                isActive('/browse')
                  ? 'text-primary font-medium border-b-2 border-accent pb-1'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Browse
            </Link>
            <Link
              href="/profile"
              className={`transition-colors ${
                isActive('/profile')
                  ? 'text-primary font-medium border-b-2 border-accent pb-1'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-secondary">
            Balance:{' '}
            <span className="font-semibold text-primary">
              ${mockUser.balance.toLocaleString()}
            </span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-bold text-primary">
            {mockUser.initials}
          </div>
        </div>
      </div>
    </nav>
  );
}
