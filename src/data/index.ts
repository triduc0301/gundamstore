import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'High Grade', slug: 'high-grade' },
  { id: '2', name: 'Master Grade', slug: 'master-grade' },
  { id: '3', name: 'Real Grade', slug: 'real-grade' },
  { id: '4', name: 'Perfect Grade', slug: 'perfect-grade' },
  { id: '5', name: 'Other', slug: 'other' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Gundam Barbatos',
    price: 45.00,
    image: '/images/gundam-barbatos.png',
    category: 'Master Grade',
    description: 'Master Grade Gundam Barbatos 1/100 Scale Model Kit'
  },
  {
    id: '2',
    name: 'Wing Gundam Zero',
    price: 50.00,
    image: '/images/wing-gundam-zero.png',
    category: 'Master Grade',
    description: 'Master Grade Wing Gundam Zero EW 1/100 Scale Model Kit'
  },
  // Thêm các sản phẩm khác tương tự
]; 