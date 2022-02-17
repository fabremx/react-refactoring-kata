import { render, waitFor, screen, within, fireEvent } from "@testing-library/react";
import { Product } from "../models";
import { CartPage } from "../components/cartPage/cartPage";

const BASE_PRODUCT = {
  title: "Product Name",
  price: 10,
  image: "image 1",
  quantity: 2,
};

export const NEW_PRODUCT: Product = {
  ...BASE_PRODUCT,
  id: 1,
  isNew: true,
  isSoonEnding: false,
};
export const ENDED_PRODUCT: Product = {
  ...BASE_PRODUCT,
  id: 2,
  isNew: false,
  isSoonEnding: true,
};
export const COMMON_PRODUCT: Product = {
  ...BASE_PRODUCT,
  id: 3,
  isNew: false,
  isSoonEnding: false,
};

export const NEW_PRODUCT_ROW = "NEW_PRODUCT_ROW";
export const ENDED_PRODUCT_ROW = "ENDED_PRODUCT_ROW";
export const COMMON_PRODUCT_ROW = "COMMON_PRODUCT_ROW";

// data-id for Summary component
export const TOTAL_PRICE = "totalPrice";
export const AMOUNT_TO_PAY = "amountToPay";

enum CELL {
  IMAGE,
  NAME,
  QUANTITY,
  TOTAL,
  REMOVE
}

export const mockRetrivedProductsWith = (
  products: Product[]
) => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({ json: () => ({ products }) });
};

export const renderComponent = async (shouldPayFees = true) => {
  render(<CartPage shouldPayFees={shouldPayFees} />);
  await waitFor(() => global.fetch);
};

export const getBlock = (key: string): HTMLElement | null => {
  return screen.queryByTestId(key);
};

export const clickOnRemoveButtonOnRow = (rowNumber: number) => {
  const row = screen.queryAllByRole("row")[rowNumber]
  const button = within(row).getByTestId('removeButton');

  fireEvent.click(button);
}

export const isRendered = ({ key, rowNumber }: { key: string; rowNumber: number }): boolean => {
  const row: HTMLElement = screen.queryAllByRole("row")[rowNumber];

  if (!row) return false;

  switch (key) {
    case COMMON_PRODUCT_ROW:
      return isCommonProductRendered(row);
    case NEW_PRODUCT_ROW:
      return isNewProductRendered(row);
    case ENDED_PRODUCT_ROW:
      return isEndedProductRendered(row)
    default:
      return false;
  }
};

export const isCommonProductRendered = (row: HTMLElement): boolean => {
  const cells: HTMLElement[] = within(row).getAllByRole('cell');

  return (
    !!within(cells[CELL.IMAGE]).getByRole('img') &&
    !!within(cells[CELL.NAME]).getByText('Product Name')
  );
}

export const isNewProductRendered = (row: HTMLElement): boolean => {
  const cells: HTMLElement[] = within(row).getAllByRole('cell');

  return Boolean(
    within(cells[CELL.IMAGE]).getByText('New product') &&
    !within(cells[CELL.IMAGE]).queryByRole('img') &&
    within(cells[CELL.NAME]).getByText(/Product Name/) &&
    within(cells[CELL.NAME]).getByText(/\(New product\)/)
  );
}

export const isEndedProductRendered = (row: HTMLElement): boolean => {
  const cells: HTMLElement[] = within(row).getAllByRole('cell');

  return Boolean(
    within(cells[CELL.IMAGE]).getByText(/End soon/) &&
    within(cells[CELL.IMAGE]).queryByRole('img') &&
    within(cells[CELL.NAME]).getByText(/Product Name/) &&
    within(cells[CELL.NAME]).getByText(/\(End Soon\)/)
  );
}

export const getNumberOfRows = () => {
  const rowsWithHeader = screen.getAllByRole("row");

  if (!rowsWithHeader) return 0;
  return rowsWithHeader.length - 1
}
