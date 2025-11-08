export interface Customer {
  id: number;
  name: string;
  email: string;
  totalOrders: number;
  lifetimeValue: number;
  memberSince: string;
  recentOrders: number[];
}

export const customers: Customer[] = [
  {
    id: 1,
    name: 'Elif Kaya',
    email: 'elif.kaya@email.com',
    totalOrders: 3,
    lifetimeValue: 8500,
    memberSince: '2024-03-15',
    recentOrders: [1001, 1002, 1003]
  },
  {
    id: 2,
    name: 'Merve Yılmaz',
    email: 'merve.yilmaz@email.com',
    totalOrders: 2,
    lifetimeValue: 4100,
    memberSince: '2024-05-20',
    recentOrders: [1002, 1004]
  },
  {
    id: 3,
    name: 'Ayşe Demir',
    email: 'ayse.demir@email.com',
    totalOrders: 5,
    lifetimeValue: 12000,
    memberSince: '2023-11-10',
    recentOrders: [1003, 1005]
  },
  {
    id: 4,
    name: 'Zeynep Özkan',
    email: 'zeynep.ozkan@email.com',
    totalOrders: 1,
    lifetimeValue: 680,
    memberSince: '2024-09-01',
    recentOrders: [1004]
  },
  {
    id: 5,
    name: 'Selin Aktaş',
    email: 'selin.aktas@email.com',
    totalOrders: 4,
    lifetimeValue: 9800,
    memberSince: '2024-01-25',
    recentOrders: [1005, 1006]
  },
  {
    id: 6,
    name: 'Deniz Çelik',
    email: 'deniz.celik@email.com',
    totalOrders: 2,
    lifetimeValue: 1780,
    memberSince: '2024-07-12',
    recentOrders: [1006]
  }
];

