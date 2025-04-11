export interface GunplaProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  description?: string;
  grade: string;
  scale: string;
  series: string;
  releaseDate?: Date;
  manufacturer: string;
  modelNumber: string;
} 