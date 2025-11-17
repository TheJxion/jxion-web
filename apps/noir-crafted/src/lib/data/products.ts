export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category:
    | 'kolye'
    | 'bilezik'
    | 'yuzuk'
    | 'kupe'
    | 'sahmeran'
    | 'toka'
    | 'fular';
  collection: 'virgo' | 'ay-donguleri' | 'lale' | 'sahmeran' | 'classic';
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'virgo-kolye-001',
    name: 'Virgo Kolye',
    description:
      'Yapay zeka güdümlü tasarımı Türk mirasıyla sorunsuz bir şekilde bütünleştiren özel koleksiyon parçası.',
    price: 1299,
    image: 'https://placehold.co/400x400/4C1C3D/FFF?text=VIRGO+KOLYE',
    category: 'kolye',
    collection: 'virgo',
    inStock: true,
    featured: true,
  },
  {
    id: 'ay-donguleri-bilezik-001',
    name: 'Ay Döngüleri Bilezik',
    description:
      'Zamanın ritmini yansıtan tasarım. Ay döngülerinden ilham alan özel koleksiyon.',
    price: 899,
    image: 'https://placehold.co/400x400/4C1C3D/FFF?text=AY+BILEZIK',
    category: 'bilezik',
    collection: 'ay-donguleri',
    inStock: true,
    featured: true,
  },
  {
    id: 'lale-yuzuk-001',
    name: 'Lale Yüzük',
    description: 'Türk kültürünün simgesi lale motifli zarif yüzük tasarımı.',
    price: 599,
    image: 'https://placehold.co/400x400/4C1C3D/FFF?text=LALE+YUZUK',
    category: 'yuzuk',
    collection: 'lale',
    inStock: true,
    featured: false,
  },
  {
    id: 'sahmeran-kupe-001',
    name: 'Şahmeran Küpe',
    description:
      'Efsanevi güç ve zarafeti simgeleyen Şahmeran motifli küpe koleksiyonu.',
    price: 799,
    image: 'https://placehold.co/400x400/4C1C3D/FFF?text=SAHMERAN+KUPE',
    category: 'kupe',
    collection: 'sahmeran',
    inStock: true,
    featured: true,
  },
  {
    id: 'virgo-yuzuk-001',
    name: 'Başak Burcu Yüzük',
    description:
      'Virgo burcunun zarafetini yansıtan özel tasarım yüzük. Altın kaplama ile muhteşem bir kombinasyon.',
    price: 899,
    image: 'https://placehold.co/400x400/4C1C3D/FFF?text=VIRGO+YUZUK',
    category: 'yuzuk',
    collection: 'virgo',
    inStock: true,
    featured: true,
  },
  {
    id: 'toka-seti-001',
    name: 'Zarif Toka Seti',
    description:
      'Yetişkin kadınlar için özel tasarlanmış zarif toka seti. Günlük kullanım için ideal.',
    price: 599,
    image: 'https://placehold.co/400x400/4C1C3D/FFF?text=TOKA+SETI',
    category: 'toka',
    collection: 'classic',
    inStock: true,
    featured: false,
  },
  {
    id: 'ipek-fular-001',
    name: 'İpek Fular - Özel Tasarım',
    description:
      'Lüks ipekten üretilmiş özel tasarım fular. Her mevsim için şık bir aksesuar.',
    price: 799,
    image: 'https://placehold.co/400x400/4C1C3D/FFF?text=IPEK+FULAR',
    category: 'fular',
    collection: 'classic',
    inStock: true,
    featured: false,
  },
];

export const getProductsByCategory = (category: Product['category']) => {
  return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter((p) => p.featured);
};

export const getProductsByCollection = (collection: Product['collection']) => {
  return products.filter((p) => p.collection === collection);
};

export const getProductById = (id: string) => {
  return products.find((p) => p.id === id);
};
