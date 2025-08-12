// Mock data for ice cream shop - replace with real data later
export const shopInfo = {
  name: "Sweet Dreams Ice Cream",
  tagline: "Handcrafted happiness in every scoop",
  description: "Family-owned artisanal ice cream shop serving premium flavors made with the finest ingredients since 1985.",
  phone: "(555) 123-CREAM",
  email: "hello@sweetdreamsicecream.com",
  address: "123 Sunshine Boulevard, Happy Valley, CA 90210",
  hours: {
    weekdays: "11:00 AM - 9:00 PM",
    weekends: "10:00 AM - 10:00 PM"
  },
  social: {
    instagram: "@sweetdreamsicecream",
    facebook: "Sweet Dreams Ice Cream",
    twitter: "@sweetdreams_ic"
  }
};

export const iceCreamFlavors = [
  {
    id: 1,
    name: "Vanilla Dream",
    description: "Classic Madagascar vanilla with real vanilla bean specks",
    price: 4.50,
    category: "Classic",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop",
    popular: true,
    allergens: ["dairy"],
    available: true
  },
  {
    id: 2,
    name: "Chocolate Fudge Brownie",
    description: "Rich chocolate ice cream with chunks of fudgy brownies",
    price: 5.25,
    category: "Chocolate",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    popular: true,
    allergens: ["dairy", "gluten"],
    available: true
  },
  {
    id: 3,
    name: "Strawberry Fields",
    description: "Fresh strawberry ice cream with real strawberry pieces",
    price: 4.75,
    category: "Fruit",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    popular: false,
    allergens: ["dairy"],
    available: true
  },
  {
    id: 4,
    name: "Mint Chocolate Chip",
    description: "Cool mint ice cream with premium dark chocolate chips",
    price: 4.95,
    category: "Classic",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    popular: true,
    allergens: ["dairy"],
    available: true
  },
  {
    id: 5,
    name: "Salted Caramel Swirl",
    description: "Creamy caramel ice cream with ribbons of salted caramel",
    price: 5.50,
    category: "Premium",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400&h=300&fit=crop",
    popular: true,
    allergens: ["dairy"],
    available: true
  },
  {
    id: 6,
    name: "Cookies & Cream",
    description: "Vanilla ice cream loaded with chocolate cookie pieces",
    price: 5.00,
    category: "Classic",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop",
    popular: true,
    allergens: ["dairy", "gluten"],
    available: true
  },
  {
    id: 7,
    name: "Pistachio Gelato",
    description: "Authentic Italian-style pistachio gelato with real nuts",
    price: 6.25,
    category: "Premium",
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop",
    popular: false,
    allergens: ["dairy", "nuts"],
    available: true
  },
  {
    id: 8,
    name: "Rocky Road",
    description: "Chocolate ice cream with marshmallows and almonds",
    price: 5.75,
    category: "Chocolate",
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop",
    popular: false,
    allergens: ["dairy", "nuts"],
    available: true
  }
];

export const specialOffers = [
  {
    id: 1,
    title: "Family Pack Special",
    description: "Buy 4 scoops, get 1 free! Perfect for family outings.",
    discount: "20% OFF",
    validUntil: "2024-08-31",
    code: "FAMILY20"
  },
  {
    id: 2,
    title: "Happy Hour",
    description: "25% off all premium flavors between 2-4 PM weekdays",
    discount: "25% OFF",
    validUntil: "2024-08-15",
    code: "HAPPY25"
  },
  {
    id: 3,
    title: "Birthday Special",
    description: "Free scoop on your birthday with valid ID",
    discount: "FREE SCOOP",
    validUntil: "Ongoing",
    code: "BIRTHDAY"
  }
];

export const customerReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely the best ice cream in town! The salted caramel is divine.",
    date: "2024-07-15",
    verified: true
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    rating: 5,
    comment: "Family-friendly atmosphere and incredible flavors. My kids love this place!",
    date: "2024-07-12",
    verified: true
  },
  {
    id: 3,
    name: "Emily Chen",
    rating: 4,
    comment: "Great variety of flavors and the staff is so friendly. Highly recommend!",
    date: "2024-07-10",
    verified: true
  },
  {
    id: 4,
    name: "David Wilson",
    rating: 5,
    comment: "The homemade quality really shows. You can taste the difference!",
    date: "2024-07-08",
    verified: true
  }
];

export const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&h=500&fit=crop",
    alt: "Colorful ice cream scoops",
    category: "products"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&h=500&fit=crop",
    alt: "Ice cream cone with multiple flavors",
    category: "products"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=500&h=500&fit=crop",
    alt: "Ice cream shop interior",
    category: "store"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=500&fit=crop",
    alt: "Strawberry ice cream close-up",
    category: "products"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&h=500&fit=crop",
    alt: "Vanilla ice cream scoop",
    category: "products"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=500&h=500&fit=crop",
    alt: "Pistachio gelato",
    category: "products"
  }
];

export const sizeOptions = [
  { id: 'single', name: 'Single Scoop', multiplier: 1 },
  { id: 'double', name: 'Double Scoop', multiplier: 1.8 },
  { id: 'triple', name: 'Triple Scoop', multiplier: 2.5 }
];

export const containerOptions = [
  { id: 'cone', name: 'Waffle Cone', extraCost: 0.50 },
  { id: 'cup', name: 'Cup', extraCost: 0 },
  { id: 'bowl', name: 'Waffle Bowl', extraCost: 1.00 }
];