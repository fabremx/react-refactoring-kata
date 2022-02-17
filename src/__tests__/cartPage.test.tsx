import {
  NEW_PRODUCT,
  ENDED_PRODUCT,
  COMMON_PRODUCT,
  NEW_PRODUCT_ROW,
  ENDED_PRODUCT_ROW,
  COMMON_PRODUCT_ROW,
  TOTAL_PRICE,
  AMOUNT_TO_PAY,
  getBlock,
  mockRetrivedProductsWith,
  renderComponent,
  getNumberOfRows,
  isRendered,
  clickOnRemoveButtonOnRow,
} from "../utils/testing";

describe("Cart Page", () => {
  it("should remove the product from table when user click on product's remove icon", async () => {
    // Given
    mockRetrivedProductsWith([
      NEW_PRODUCT,
      COMMON_PRODUCT,
    ]);

    await renderComponent();

    expect(getNumberOfRows()).toBe(2);
    expect(isRendered({ key: NEW_PRODUCT_ROW, rowNumber: 1 })).toBeTruthy();
    expect(isRendered({ key: COMMON_PRODUCT_ROW, rowNumber: 2 })).toBeTruthy();

    // When Removing COMMON Product
    clickOnRemoveButtonOnRow(2);

    // Then
    expect(getNumberOfRows()).toBe(1)
    expect(isRendered({ key: NEW_PRODUCT_ROW, rowNumber: 1 })).toBeTruthy();
    expect(isRendered({ key: COMMON_PRODUCT_ROW, rowNumber: 2 })).toBeFalsy();

  });

  it("should display correct products table when products are fetched", async () => {
    // Given
    mockRetrivedProductsWith([NEW_PRODUCT, ENDED_PRODUCT, COMMON_PRODUCT]);
    // When
    await renderComponent();
    // Then
    expect(isRendered({ key: NEW_PRODUCT_ROW, rowNumber: 1 })).toBeTruthy();
    expect(isRendered({ key: ENDED_PRODUCT_ROW, rowNumber: 2 })).toBeTruthy();
    expect(isRendered({ key: COMMON_PRODUCT_ROW, rowNumber: 3 })).toBeTruthy();
  });

  it("should display correct total price when products are fetched", async () => {
    // Given
    mockRetrivedProductsWith([
      COMMON_PRODUCT,
      ENDED_PRODUCT,
    ]);
    // When
    await renderComponent();
    // Then
    expect(getBlock(TOTAL_PRICE)).toHaveTextContent("$ 20");
  });

  it("should display correct amount to pay when products are fetched AND user should pay fees", async () => {
    // Given
    mockRetrivedProductsWith([
      COMMON_PRODUCT,
      NEW_PRODUCT,
    ]);
    // When
    await renderComponent(true);
    // Then
    expect(getBlock(AMOUNT_TO_PAY)).toHaveTextContent("$ 23.99");
  });

  it("should display correct amount to pay when products are fetched AND user should NOT pay fees", async () => {
    // Given
    mockRetrivedProductsWith([
      COMMON_PRODUCT,
      NEW_PRODUCT,
    ]);
    // When
    await renderComponent(false);
    // Then
    expect(getBlock(AMOUNT_TO_PAY)).toHaveTextContent("$ 20.00");
  });
});
