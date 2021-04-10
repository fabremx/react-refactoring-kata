import { screen, fireEvent } from "@testing-library/react";
import {
  MOCKED_USER,
  NEW_PRODUCT,
  ENDED_PRODUCT,
  COMMON_PRODUCT,
  CART_PAGE,
  NEW_PRODUCT_ROW,
  ENDED_PRODUCT_ROW,
  COMMON_PRODUCT_ROW,
  TOTAL_BEFORE_DISCOUNT,
  TOTAL_AFTER_DISCOUNT,
  USER_NOT_VIP_WITHOUT_COUPON,
  USER_NOT_VIP_WITH_COUPON,
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

    it("should render 'Loading...' message when user is NOT connected", async () => {
      // Given
      mockRetrivedUserAndProductsWith(undefined, [COMMON_PRODUCT]);
      // When
      await renderComponent();
      // Then
      expect(isRendered(CART_PAGE)).toBeFalsy();
    });
  });

  describe("Products", () => {
    describe("User Actions", () => {
      it("should render remove the product from list when user remove an product", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [
          NEW_PRODUCT,
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
      it("should render 'New Product' row when products contains a 'New Product'", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [NEW_PRODUCT]);
        // When
        await renderComponent();
        // Then
        expect(isRendered(NEW_PRODUCT_ROW)).toBeTruthy();
        expect(isRendered(ENDED_PRODUCT_ROW)).toBeFalsy();
        expect(isRendered(COMMON_PRODUCT_ROW)).toBeFalsy();
      });

      it("should render 'Ended Product' row when products contains a 'Ended Product'", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [ENDED_PRODUCT]);
        // When
        await renderComponent();
        // Then
        expect(isRendered(ENDED_PRODUCT_ROW)).toBeTruthy();
        expect(isRendered(NEW_PRODUCT_ROW)).toBeFalsy();
        expect(isRendered(COMMON_PRODUCT_ROW)).toBeFalsy();
      });

      it("should render 'Common Product' row when products contains a 'Common Product'", async () => {
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
  });

  describe("Summary", () => {
    describe("Sub Total", () => {
      it("should handle price before discounts", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [
          COMMON_PRODUCT,
          ENDED_PRODUCT,
        ]);
        // When
        await renderComponent();
        // Then
        expect(getBlock(TOTAL_BEFORE_DISCOUNT)).toHaveTextContent("$ 20");
      });
    });

    describe("Total After Discounts", () => {
      it("should handle price when user is NOT VIP and has NOT coupon", async () => {
        // Given
        mockRetrivedUserAndProductsWith(USER_NOT_VIP_WITHOUT_COUPON, [
          COMMON_PRODUCT,
          NEW_PRODUCT,
        ]);
        // When
        await renderComponent();
        // Then
        expect(getBlock(TOTAL_AFTER_DISCOUNT)).toHaveTextContent("$ 23.99");
      });

      it("should handle price when user is NOT VIP and has coupon", async () => {
        // Given
        mockRetrivedUserAndProductsWith(USER_NOT_VIP_WITH_COUPON, [
          COMMON_PRODUCT,
          NEW_PRODUCT,
        ]);
        // When
        await renderComponent();
        // Then
        expect(getBlock(TOTAL_AFTER_DISCOUNT)).toHaveTextContent("$ 21.99");
      });
    });
  });
});
