import { GunplaProduct as MockGunplaProduct, mockProducts } from '../data/mockData';
export interface GunplaProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  grade: string;
  series: string;
  manufacturer: string;
  modelNumber: string;
  releaseDate?: string;
  discount?: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const gunplaApi = {
  getAllProducts: async (): Promise<GunplaProduct[]> => {
    await delay(800); // Simulate network delay
    return mockProducts;
  },

  getProductById: async (id: string): Promise<GunplaProduct> => {
    await delay(500);
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  getProductsByGrade: async (grade: string): Promise<GunplaProduct[]> => {
    await delay(500);
    return mockProducts.filter(p => p.grade.toLowerCase() === grade.toLowerCase());
  },

  getProductsBySearch: async (query: string): Promise<GunplaProduct[]> => {
    await delay(500);
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.series.toLowerCase().includes(query.toLowerCase())
    );
  }
}; 