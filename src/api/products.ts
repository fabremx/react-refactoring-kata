import { Product } from "../models";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`http://localhost:3000/api/products.json`);
  const result = await response.json();

  if (!result || !result.products) return [];
  return result.products;
};
