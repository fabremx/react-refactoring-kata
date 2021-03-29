import { render, waitFor, screen } from "@testing-library/react";
import { Product, User } from "../../models";
import { Cart } from "./cart";

export const MOCKED_USER: User = {
  id: 1,
  firstname: "firstname",
  lastname: "lastname",
  address: "address",
  creditCardNumber: "creditCardNumber",
  creditCardExpiration: "creditCardExpiration",
  creditCardCVV: "creditCardCVV",
  isVIP: false,
  coupon: 10,
};

const BASE_PRODUCT = {
  price: 10,
  description: "description 1",
  image: "image 1",
  type: "type",
  category: "category",
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

export const CART_PAGE = "cart";
export const NEW_PRODUCT_ROW = "NewProduct";
export const ENDED_PRODUCT_ROW = "EndedProduct";
export const COMMON_PRODUCT_ROW = "CommonProduct";

const response = (result: any) => ({
  json: () => result,
});

export const mockRetrivedUserAndProductsWith = (
  user: User | undefined,
  products: Product[]
) => {
  global.fetch = jest
    .fn()
    .mockImplementationOnce(() => response(user))
    .mockImplementationOnce(() => response({ products }));
};

export const renderComponent = async () => {
  render(<Cart />);
  await waitFor(() => global.fetch);
};

export const isRendered = (key: string): boolean => {
  if (key === CART_PAGE) {
    return !!screen.queryByTestId("cart");
  }

  return (
    !!screen.queryByTestId(`photo${key}`) &&
    !!screen.queryByTestId(`title${key}`)
  );
};

export const getNumberOfRows = () => screen.queryAllByRole("row").length;
