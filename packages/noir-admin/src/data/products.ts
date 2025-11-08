export interface Product {
  id: number;
  name: string;
  category: 'Kolye' | 'Bileklik' | 'Yüzük' | 'Küpe';
  metal: 'Altın Kaplama' | 'Gümüş';
  price: number;
  stock: number;
  status: 'Active' | 'Hidden';
  image: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Altın Kaplama Yüzük',
    category: 'Yüzük',
    metal: 'Altın Kaplama',
    price: 1250,
    stock: 12,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    description: 'Elegant gold-plated ring with intricate design'
  },
  {
    id: 2,
    name: 'Gümüş Kolye',
    category: 'Kolye',
    metal: 'Gümüş',
    price: 890,
    stock: 8,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
    description: 'Beautiful silver necklace with pendant'
  },
  {
    id: 3,
    name: 'Şahmeran Bileklik',
    category: 'Bileklik',
    metal: 'Altın Kaplama',
    price: 1450,
    stock: 4,
    status: 'Hidden',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
    description: 'Unique mythological bracelet design'
  },
  {
    id: 4,
    name: 'Altın Küpe Seti',
    category: 'Küpe',
    metal: 'Altın Kaplama',
    price: 950,
    stock: 15,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
    description: 'Elegant gold-plated earring set'
  },
  {
    id: 5,
    name: 'Gümüş Yüzük',
    category: 'Yüzük',
    metal: 'Gümüş',
    price: 680,
    stock: 20,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400',
    description: 'Classic silver ring design'
  },
  {
    id: 6,
    name: 'Altın Kaplama Kolye',
    category: 'Kolye',
    metal: 'Altın Kaplama',
    price: 1650,
    stock: 6,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
    description: 'Luxury gold-plated necklace'
  },
  {
    id: 7,
    name: 'Gümüş Bileklik',
    category: 'Bileklik',
    metal: 'Gümüş',
    price: 750,
    stock: 10,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
    description: 'Delicate silver bracelet'
  },
  {
    id: 8,
    name: 'Altın Küpe',
    category: 'Küpe',
    metal: 'Altın Kaplama',
    price: 1100,
    stock: 9,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
    description: 'Premium gold-plated earrings'
  }
];

