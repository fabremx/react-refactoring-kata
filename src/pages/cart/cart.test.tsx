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
  mockRetrivedUserAndProductsWith,
  renderComponent,
  getNumberOfRows,
  isRendered,
} from "./cart.test.utils";

describe("Cart", () => {
  describe("When user is undefined", () => {
    it("should NOT render products and summary", async () => {
      // Given
      mockRetrivedUserAndProductsWith(undefined, [COMMON_PRODUCT]);
      // When
      await renderComponent();
      // Then
      expect(isRendered(CART_PAGE)).toBeFalsy();
    });
  });

  describe("When products is empty", () => {
    it("should return summary price to 0$", () => {});

    it("should return an message in products table", () => {});
  });

  describe("When products is NOT empty", () => {
    describe("When products contains a 'New Product'", () => {
      it("should render product row with 'New Product' image and title cells", async () => {
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
    });

    describe("When products contains a 'Ended Product'", () => {
      it("should render product row with 'Ended Product' image and title cells", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [ENDED_PRODUCT]);
        // When
        await renderComponent();
        // Then
        expect(isRendered(ENDED_PRODUCT_ROW)).toBeTruthy();
        expect(isRendered(NEW_PRODUCT_ROW)).toBeFalsy();
        expect(isRendered(COMMON_PRODUCT_ROW)).toBeFalsy();
      });
    });

    describe("When products contains a 'Common Product'", () => {
      it("should render product row with 'Common Product' image and title cells", async () => {
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

    describe("When product does NOT have a product with a price after discount", () => {
      it("should render product row with the correct price into the cell", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [COMMON_PRODUCT]);
        // When
        await renderComponent();
        // Then
        expect(screen.queryByTestId("price")).toHaveTextContent("$ 20");
      });
    });

    describe("When product have a product with a price after discount", () => {
      it("should render product row with the correct price into the cell", async () => {
        // Given
        mockRetrivedUserAndProductsWith(MOCKED_USER, [
          NEW_PRODUCT_WITH_DISCOUNT,
        ]);
        // When
        await renderComponent();
        // Then
        expect(screen.queryByTestId("price")).toHaveTextContent("$ 20 $ 10");
      });
    });

    describe("When user remove an product", () => {
      it("should render the correct updated products array", async () => {
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
  });
});
