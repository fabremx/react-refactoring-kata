import { Product } from "../models";

const BASE_PRODUCT = {
  price: 10,
  description: "description 1",
  image: "image 1",
  quantity: 2,
  stock: 10,
};

export const NEW_PRODUCT_WITH_DISCOUNT: Product = {
  ...BASE_PRODUCT,
  id: 1,
  title: "New Product",
  priceAfterDiscount: 5,
  isNew: true,
  isSoonEnding: false,
};
export const ENDED_PRODUCT: Product = {
  ...BASE_PRODUCT,
  id: 2,
  title: "Ended Product",
  isNew: false,
  isSoonEnding: true,
};
export const COMMON_PRODUCT: Product = {
  ...BASE_PRODUCT,
  id: 2,
  title: "Common Product",
  isNew: false,
  isSoonEnding: false,
};
