/**
 * Products Store
 *
 * NOTE: This file should load products from contentStore, not static data.
 *
 * Migration: Update to use contentStore.content.home.featured.products
 */

import { writable, derived } from 'svelte/store';
import { contentStore } from './contentStore';
import type { Product } from '$types';

// FALLBACK: Demo product data (use only when contentStore unavailable)
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Ay Döngüsü Kolye',
    category: 'Kolye',
    description:
      'Ayın evrelerinden ilham alan zarif bir kolye. Gümüş kaplama ile özenle işlenmiş, zamanın ötesinde bir tasarım.',
    price: 1299,
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1603561596112-0a13211acd58?w=800&h=800&fit=crop',
    ],
    inStock: true,
  },
  {
    id: '2',
    name: 'Başak Burcu Yüzük',
    category: 'Yüzük',
    description:
      'Virgo burcunun zarafetini yansıtan özel tasarım yüzük. Altın kaplama ile muhteşem bir kombinasyon.',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
    ],
    inStock: true,
  },
  {
    id: '3',
    name: 'Lale Motifli Bilezik',
    category: 'Bilezik',
    description:
      'Türk kültürünün simgesi lale motifleriyle bezeli zarif bilezik. Her detayı özenle işlenmiş.',
    price: 1599,
    image:
      'https://images.unsplash.com/photo-1611591437281-8a0f72382c2d?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611591437281-8a0f72382c2d?w=800&h=800&fit=crop',
    ],
    inStock: true,
  },
  {
    id: '4',
    name: 'Şahmeran Koleksiyonu Küpe',
    category: 'Küpe',
    description:
      "Efsanevi Şahmeran'dan ilham alan muhteşem küpe tasarımı. Güçlü ve zarif bir ifade.",
    price: 1199,
    image:
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop',
    ],
    inStock: true,
  },
  {
    id: '5',
    name: 'Zarif Toka Seti',
    category: 'Yetişkin Tokaları',
    description:
      'Yetişkin kadınlar için özel tasarlanmış zarif toka seti. Günlük kullanım için ideal.',
    price: 599,
    image:
      'https://images.unsplash.com/photo-1603561596112-0a13211acd58?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1603561596112-0a13211acd58?w=800&h=800&fit=crop',
    ],
    inStock: true,
  },
  {
    id: '6',
    name: 'İpek Fular - Özel Tasarım',
    category: 'Fular',
    description:
      'Lüks ipekten üretilmiş özel tasarım fular. Her mevsim için şık bir aksesuar.',
    price: 799,
    image:
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop',
    ],
    inStock: true,
  },
  {
    id: '7',
    name: 'Ay Tutulması Kolye',
    category: 'Kolye',
    description:
      'Ay tutulmasının büyüsünü yansıtan derin ve anlamlı bir kolye tasarımı.',
    price: 1699,
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
    ],
    inStock: true,
  },
  {
    id: '8',
    name: 'Yıldız Kümeleri Yüzük',
    category: 'Yüzük',
    description:
      'Gökyüzündeki yıldız kümelerinden ilham alan zarif yüzük. Gümüş kaplama.',
    price: 749,
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
    ],
    inStock: true,
  },
];

// Create derived store from contentStore
// Falls back to demoProducts if contentStore unavailable
export const products = derived(contentStore, ($contentStore) => {
  const dbProducts = $contentStore.content?.home?.featured?.products;
  if (dbProducts && Array.isArray(dbProducts) && dbProducts.length > 0) {
    // Transform database products to Product type
    return dbProducts.map((p: any) => ({
      id: p.id || '',
      name: p.name || '',
      description: p.description || '',
      price: typeof p.price === 'number' ? p.price : 0,
      image: p.image || p.images?.[0] || '',
      category: p.category || 'kolye',
      collection: p.collection || 'classic',
      inStock: p.inStock !== false,
      featured: p.featured === true,
    })) as Product[];
  }
  return demoProducts;
});

// Helper functions
export function getProductById(id: string): Product | undefined {
  let product: Product | undefined;
  products.subscribe((p) => {
    product = p.find((item) => item.id === id);
  })();
  return product;
}

export function getProductsByCategory(category: string): Product[] {
  let filtered: Product[] = [];
  products.subscribe((p) => {
    filtered = p.filter((item) => item.category === category);
  })();
  return filtered;
}

export function getFeaturedProducts(count: number = 4): Product[] {
  let featured: Product[] = [];
  products.subscribe((p) => {
    featured = p.slice(0, count);
  })();
  return featured;
}
