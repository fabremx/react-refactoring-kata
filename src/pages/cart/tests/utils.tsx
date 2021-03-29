import { render, waitFor, screen } from "@testing-library/react";
import { Product, User } from "../../../models";
import { Cart } from "../cart";

export const NEW_PRODUCT_ROW = "NewProduct";
export const ENDED_PRODUCT_ROW = "EndedProduct";
export const COMMON_PRODUCT_ROW = "CommonProduct";
export const CART_PAGE = "cart";
export const PRICE_CELL = "price";
export const TOTAL_PRICE_CELL = "total";
export const NO_PRODUCTS_MESSAGE = "noProducts";
export const DISCOUNT_DETAILS = "discountDetails";
export const BUY_BUTTON = "buyBtn";

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
  const result = render(<Cart />);
  await waitFor(() => global.fetch);
  return { ...result };
};

export const getBlock = (key: string): HTMLElement | null => {
  return screen.queryByTestId(key);
};

export const isRendered = (key: string): boolean =>
  !!screen.queryByTestId(`photo${key}`) &&
  !!screen.queryByTestId(`title${key}`);

export const getNumberOfRows = () => screen.queryAllByRole("row").length;
