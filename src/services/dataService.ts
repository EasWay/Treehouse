export interface RestaurantData {
  name: string;
  phone: string;
  address: string;
  website: string;
  socials: string[];
  hours: Record<string, string>;
  images: string[];
  reviews: string[];
  menu: {
    category: string;
    items: { name: string; price: string }[];
  }[];
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
