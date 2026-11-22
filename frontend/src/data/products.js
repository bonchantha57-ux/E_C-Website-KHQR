export const PRODUCTS = [
  {
    id: 1,
    name: 'Laptop',
    khmerName: 'កុំព្យូទ័រយួរដៃ (Laptop)',
    price: 650,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
    description: 'High-performance laptop with 15.6" FHD display, Intel Core i5, 16GB RAM, 512GB NVMe SSD.',
    rating: 4.8,
    reviews: 124,
    badge: 'Popular',
    stock: 15
  },
  {
    id: 2,
    name: 'Mouse',
    khmerName: 'កណ្ដុរឥតខ្សែ (Mouse)',
    price: 15,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
    description: 'Ergonomic wireless optical mouse with 2.4GHz USB receiver, silent clicks and long battery life.',
    rating: 4.6,
    reviews: 89,
    badge: 'Best Seller',
    stock: 45
  },
  {
    id: 3,
    name: 'Keyboard',
    khmerName: 'ក្ដារចុចមេកានិច (Keyboard)',
    price: 25,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    description: 'Custom mechanical keyboard with RGB backlighting, tactile blue switches, and durable keycaps.',
    rating: 4.7,
    reviews: 95,
    badge: 'Gaming',
    stock: 30
  },
  {
    id: 4,
    name: 'Monitor',
    khmerName: 'អេក្រង់កុំព្យូទ័រ (Monitor)',
    price: 120,
    category: 'Displays',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    description: '27-inch Full HD (1920x1080) IPS ultra-slim frameless monitor, 75Hz refresh rate with HDMI & VGA.',
    rating: 4.9,
    reviews: 62,
    badge: 'Featured',
    stock: 12
  }
];

export const SHIPPING_OPTIONS = [
  {
    id: 'vet',
    name: 'Virak Buntham (VET Express)',
    price: 0,
    deliveryTime: '1-2 Days',
    description: 'Free nationwide delivery across Phnom Penh and provinces via Virak Buntham'
  },
  {
    id: 'lnt',
    name: 'LNT Express',
    price: 2,
    deliveryTime: 'Same Day / 24 Hours',
    description: 'Fast priority doorstep delivery via LNT Express'
  },
  {
    id: 'jt',
    name: 'J&T Express',
    price: 1.5,
    deliveryTime: '1-2 Days',
    description: 'Standard fast delivery via J&T Express Cambodia'
  }
];
