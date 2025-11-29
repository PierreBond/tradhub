export interface Item {
  id: number;
  name: string;
  value: number;
  category: string;
  condition: string;
  image: string;
  description?: string;
  seller?: string;
  rating?: number;
  distance?: string;
  views?: number;
  proposals?: number;
  status?: 'available' | 'pending' | 'traded';
  dateAdded?: string;
  responsiveness?: number;
  authenticity?: number;
  shipping?: number;
//   imageUrl : string;
}

export interface Trade {
  id: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
  yourItem: string;
  theirItem: string;
  cashAdjustment: number;
  partner: string;
  rating: number | null;
}

export interface User {
  name: string;
  initials: string;
  balance: number;
  memberSince: string;
  rating: number;
  reviews: number;
  location: string;
  stats: {
    itemsTraded: number;
    totalValue: number;
    successRate: number;
    daysActive: number;
  };
}