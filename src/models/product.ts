export interface Product {
  id: number;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  description: string;
  image: string;
  type: string;
  category: string;
  quantity: number;
  stock: number;
  isNew: boolean;
  isSoonEnding: boolean;
}
