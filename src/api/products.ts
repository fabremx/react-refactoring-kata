import { Product } from "../models";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`http://localhost:3000/api/products.json`);
  const { products }: { products: Product[] } = await response.json();
  return products;
};
