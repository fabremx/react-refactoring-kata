import { screen, fireEvent } from "@testing-library/react";
import {
  MOCKED_USER,
  NEW_PRODUCT_WITH_DISCOUNT,
  ENDED_PRODUCT,
  COMMON_PRODUCT,
  CART_PAGE,
  NEW_PRODUCT_ROW,
  ENDED_PRODUCT_ROW,
  COMMON_PRODUCT_ROW,
  PRICE_CELL,
  TOTAL_PRICE_CELL,
  NO_PRODUCTS_MESSAGE,
  DISCOUNT_DETAILS,
  BUY_BUTTON,
  getBlock,
  mockRetrivedUserAndProductsWith,
  renderComponent,
  getNumberOfRows,
  isRendered,
} from "./cart.test.utils";

describe("Cart", () => {
  describe("Cart Page", () => {
    it("should render products and summary when user is connected", async () => {
      // Given
      mockRetrivedUserAndProductsWith(MOCKED_USER, [COMMON_PRODUCT]);
      // When
      await renderComponent();
      // Then
      expect(isRendered(CART_PAGE)).toBeTruthy();
    });

    it("should NOT render products and summary when user is NOT connected", async () => {
      // Given
      mockRetrivedUserAndProductsWith(undefined, [COMMON_PRODUCT]);
      // When
      await renderComponent();
      // Then
      expect(isRendered(CART_PAGE)).toBeFalsy();
    });
  });

  describe("Products", () => {
    describe("Component Display", () => {
      it("should render 'No products in cart' message when product list is empty", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, []);
        // When
        await renderComponent();
        // Then
        expect(isRendered(NO_PRODUCTS_MESSAGE)).toBeTruthy();
        expect(getBlock(NO_PRODUCTS_MESSAGE)).toHaveTextContent(
          "No products in cart"
        );
      });
    });

    describe("User Actions", () => {
      it("should render the correct updated products array when user remove an product", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [
          NEW_PRODUCT_WITH_DISCOUNT,
          COMMON_PRODUCT,
        ]);
        // When
        await renderComponent();

        expect(getNumberOfRows()).toBe(3);
        expect(isRendered(NEW_PRODUCT_ROW)).toBeTruthy();
        expect(isRendered(COMMON_PRODUCT_ROW)).toBeTruthy();

        fireEvent.click(screen.getAllByTestId("remove")[1]);

        // Then
        expect(getNumberOfRows()).toBe(2);
        expect(isRendered(NEW_PRODUCT_ROW)).toBeTruthy();
        expect(isRendered(COMMON_PRODUCT_ROW)).toBeFalsy();
      });
    });

    describe("Product Row", () => {
      it("should render product row with 'New Product' image and title cells when products contains a 'New Product'", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [
          NEW_PRODUCT_WITH_DISCOUNT,
        ]);
        // When
        await renderComponent();
        // Then
        expect(isRendered(NEW_PRODUCT_ROW)).toBeTruthy();
        expect(isRendered(ENDED_PRODUCT_ROW)).toBeFalsy();
        expect(isRendered(COMMON_PRODUCT_ROW)).toBeFalsy();
      });

      it("should render product row with 'Ended Product' image and title cells when products contains a 'Ended Product'", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [ENDED_PRODUCT]);
        // When
        await renderComponent();
        // Then
        expect(isRendered(ENDED_PRODUCT_ROW)).toBeTruthy();
        expect(isRendered(NEW_PRODUCT_ROW)).toBeFalsy();
        expect(isRendered(COMMON_PRODUCT_ROW)).toBeFalsy();
      });

      it("should render product row with 'Common Product' image and title cells when products contains a 'Common Product'", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [COMMON_PRODUCT]);
        // When
        await renderComponent();
        // Then
        expect(isRendered(COMMON_PRODUCT_ROW)).toBeTruthy();
        expect(isRendered(NEW_PRODUCT_ROW)).toBeFalsy();
        expect(isRendered(ENDED_PRODUCT_ROW)).toBeFalsy();
      });
    });

    describe("Product Discount", () => {
      it("should render product row with the correct price into the cells when product have a discount", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [
          NEW_PRODUCT_WITH_DISCOUNT,
        ]);
        // When
        await renderComponent();
        // Then
        expect(getBlock(PRICE_CELL)).toHaveTextContent("$ 10 $ 5");
        expect(getBlock(TOTAL_PRICE_CELL)).toHaveTextContent("$ 20 $ 10");
      });

      it("should render product row with the correct price into the cells when product have NOT a discount", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [COMMON_PRODUCT]);
        // When
        await renderComponent();
        // Then
        expect(getBlock(PRICE_CELL)).toHaveTextContent("$ 10");
        expect(getBlock(TOTAL_PRICE_CELL)).toHaveTextContent("$ 20");
      });
    });
  });

  describe("Summary", () => {
    describe("Component Display", () => {
      it("should render summary without discounts details and buy button when products cart list is empty", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, []);
        // When
        await renderComponent();
        // Then
        expect(isRendered(DISCOUNT_DETAILS)).toBeFalsy();
        expect(isRendered(BUY_BUTTON)).toBeFalsy();
      });

      it("should render summary with discounts details and buy button when products cart list is NOT empty", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [COMMON_PRODUCT]);
        // When
        await renderComponent();
        // Then
        expect(isRendered(DISCOUNT_DETAILS)).toBeTruthy();
        expect(isRendered(BUY_BUTTON)).toBeTruthy();
      });
    });
  });
});
