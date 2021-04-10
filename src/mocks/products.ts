import { Product } from "../models";

const BASE_PRODUCT = {
  price: 10,
  image: "image 1",
  quantity: 2,
};

export const NEW_PRODUCT: Product = {
  ...BASE_PRODUCT,
  id: 1,
  title: "New Product",
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
  id: 3,
  title: "Common Product",
  isNew: false,
  isSoonEnding: false,
};
