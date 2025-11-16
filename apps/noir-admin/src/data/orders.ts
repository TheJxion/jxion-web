export interface Order {
  id: number;
  customer: string;
  customerEmail: string;
  total: number;
  items: number;
  status: 'Paid' | 'Pending' | 'Delivered';
  date: string;
  products: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export const orders: Order[] = [
  {
    id: 1001,
    customer: 'Elif Kaya',
    customerEmail: 'elif.kaya@email.com',
    total: 2750,
    items: 2,
    status: 'Paid',
    date: '2025-11-03',
    products: [
      { id: 1, name: 'Altın Kaplama Yüzük', quantity: 1, price: 1250 },
      { id: 2, name: 'Gümüş Kolye', quantity: 1, price: 890 }
    ]
  },
  {
    id: 1002,
    customer: 'Merve Yılmaz',
    customerEmail: 'merve.yilmaz@email.com',
    total: 1250,
    items: 1,
    status: 'Pending',
    date: '2025-11-02',
    products: [
      { id: 1, name: 'Altın Kaplama Yüzük', quantity: 1, price: 1250 }
    ]
  },
  {
    id: 1003,
    customer: 'Ayşe Demir',
    customerEmail: 'ayse.demir@email.com',
    total: 2400,
    items: 2,
    status: 'Delivered',
    date: '2025-11-01',
    products: [
      { id: 3, name: 'Şahmeran Bileklik', quantity: 1, price: 1450 },
      { id: 4, name: 'Altın Küpe Seti', quantity: 1, price: 950 }
    ]
  },
  {
    id: 1004,
    customer: 'Zeynep Özkan',
    customerEmail: 'zeynep.ozkan@email.com',
    total: 680,
    items: 1,
    status: 'Paid',
    date: '2025-10-30',
    products: [
      { id: 5, name: 'Gümüş Yüzük', quantity: 1, price: 680 }
    ]
  },
  {
    id: 1005,
    customer: 'Selin Aktaş',
    customerEmail: 'selin.aktas@email.com',
    total: 3300,
    items: 3,
    status: 'Paid',
    date: '2025-10-28',
    products: [
      { id: 6, name: 'Altın Kaplama Kolye', quantity: 1, price: 1650 },
      { id: 7, name: 'Gümüş Bileklik', quantity: 1, price: 750 },
      { id: 8, name: 'Altın Küpe', quantity: 1, price: 1100 }
    ]
  },
  {
    id: 1006,
    customer: 'Deniz Çelik',
    customerEmail: 'deniz.celik@email.com',
    total: 890,
    items: 1,
    status: 'Pending',
    date: '2025-10-27',
    products: [
      { id: 2, name: 'Gümüş Kolye', quantity: 1, price: 890 }
    ]
  }
];

