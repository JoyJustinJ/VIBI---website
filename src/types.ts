export type CategoryId = 
  | 'combos'
  | 'fried'
  | 'burgers'
  | 'rolls'
  | 'subway'
  | 'soups_sides'
  | 'drinks';

export interface Category {
  id: CategoryId;
  label: string;
  note: string;
}

export interface SizeOption {
  name: string;
  price: number;
  originalPrice?: number;
}

export interface Dish {
  id: number | string;
  itemNumber?: string;
  category: CategoryId;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  ingredients: string[];
  image: string;
  sizes?: SizeOption[];
  badge?: string;
}

export interface ReservationData {
  guest_name: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
}
