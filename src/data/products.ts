export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Gundam Barbatos",
    price: 45.00,
    image: "/images/gundam-barbatos.jpg",
    category: "Master Grade"
  },
  {
    id: "2",
    name: "Wing Gundam Zero",
    price: 50.00,
    image: "/images/wing-gundam-zero.jpg",
    category: "Master Grade"
  },
  {
    id: "3",
    name: "Gundam Exia",
    price: 50.00,
    image: "/images/gundam-exia.jpg",
    category: "Master Grade"
  },
  {
    id: "4",
    name: "RX-78-2 Gundam",
    price: 55.00,
    image: "/images/rx78-2.jpg",
    category: "Master Grade"
  }
]; 