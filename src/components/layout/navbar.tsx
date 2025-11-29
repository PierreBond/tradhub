'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockUser } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();

  const getActiveLinkClassName = (path: string) =>
    pathname === path
      ? 'text-primary font-medium border-b-2 border-accent pb-1'
      : 'text-secondary hover:text-primary';

  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className={getActiveLinkClassName('/')}>
        TradeHub
      </Link>
      <Link href="/browse" className={getActiveLinkClassName('/browse')}>
        Browse
      </Link>
      <Link href="/profile" className={getActiveLinkClassName('/profile')}>
        Profile
      </Link>
      <p className="text-right">
        Balance: {mockUser.balance.toLocaleString()}
      </p>
      <div className="flex items-center gap-2">
        {mockUser.initials}
      </div>
    </nav>
    );
}