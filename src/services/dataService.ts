export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  dietary?: string;
  image?: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface RestaurantData {
  name: string;
  phone: string;
  address: string;
  website: string;
  socials: string[];
  hours: Record<string, string>;
  images: string[]; // Still keep for compatibility or general use
  gallery: string[]; // Full gallery list
  story: string;
  reviews: string[];
  menu: {
    category: string;
    items: MenuItem[];
  }[];
  reservations: Reservation[];
  suspended?: boolean;
}

export async function getRestaurantData(): Promise<RestaurantData> {
  const res = await fetch('/api/data');
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function updateRestaurantData(data: RestaurantData): Promise<void> {
  const res = await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update data');
}

export async function submitReservation(reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>): Promise<void> {
  const res = await fetch('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error('Failed to submit reservation');
}
