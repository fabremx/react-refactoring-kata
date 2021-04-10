import { render, waitFor, screen } from "@testing-library/react";
import { Product, User } from "../../models";
import { Cart } from "./cart";

const BASE_USER = {
  id: 1,
  firstname: "firstname",
  lastname: "lastname",
};
export const MOCKED_USER = {
  ...BASE_USER,
  isVIP: false,
  coupon: 0,
};
export const USER_VIP_WITH_COUPON: User = {
  ...BASE_USER,
  isVIP: true,
  coupon: 10,
};
export const USER_VIP_WITHOUT_COUPON: User = {
  ...BASE_USER,
  isVIP: true,
  coupon: 0,
};

export const USER_NOT_VIP_WITH_COUPON: User = {
  ...BASE_USER,
  isVIP: false,
  coupon: 10,
};
export const USER_NOT_VIP_WITHOUT_COUPON: User = {
  ...BASE_USER,
  isVIP: false,
  coupon: 0,
};

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

export const CART_PAGE = "cart";

// data-id for Products component
export const NEW_PRODUCT_ROW = "NewProduct";
export const ENDED_PRODUCT_ROW = "EndedProduct";
export const COMMON_PRODUCT_ROW = "CommonProduct";
export const PRICE_CELL = "price";

// data-id for Summary component
export const TOTAL_BEFORE_DISCOUNT = "subTotal";
export const TOTAL_AFTER_DISCOUNT = "total";

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

export const getBlock = (key: string): HTMLElement | null => {
  return screen.queryByTestId(key);
};

export const isRendered = (key: string): boolean => {
  switch (key) {
    case COMMON_PRODUCT_ROW:
    case NEW_PRODUCT_ROW:
    case ENDED_PRODUCT_ROW:
      return (
        !!screen.queryByTestId(`photo${key}`) &&
        !!screen.queryByTestId(`title${key}`)
      );
    default:
      return !!screen.queryByTestId(key);
  }
};

export const getNumberOfRows = () => screen.queryAllByRole("row").length;
