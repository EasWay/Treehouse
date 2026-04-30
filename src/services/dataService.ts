import metadata from '../../extracted_metadata.json';

export const restaurantData = {
  name: metadata.name,
  phone: metadata.phone,
  address: metadata.address,
  website: metadata.website,
  socials: {
    instagram: metadata.socials[0],
    facebook: metadata.socials[1]
  },
  hours: metadata.hours,
  images: metadata.images,
  reviews: metadata.reviews,
  menu: metadata.menu
};

export type RestaurantData = typeof restaurantData;
