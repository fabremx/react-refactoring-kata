import { render, waitFor, screen } from "@testing-library/react";
import { Product, User } from "../../../models";
import { Cart } from "../cart";

export const CART_PAGE = "cart";

// data-id for Products components
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
  const result = render(<Cart />);
  await waitFor(() => global.fetch);
  return { ...result };
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
