import { render, screen } from "@testing-library/react";
import {
  COMMON_PRODUCT,
  ENDED_PRODUCT,
  NEW_PRODUCT,
} from "../../mocks/products";
import { ProductRow } from "./productRow";

jest.mock("../NewProduct", () => ({
  NewProduct: () => <td data-testid="newProduct" />,
}));
jest.mock("../EndedProduct", () => ({
  EndedProduct: () => <td data-testid="endedProduct" />,
}));
jest.mock("../CommonProduct", () => ({
  CommonProduct: () => <td data-testid="commonProduct" />,
}));

describe("ProductRow", () => {
  it("should render component with new product row when products contains new product", () => {
    // Given
    const tableRow = document.createElement("tbody");
    // When
    render(<ProductRow product={NEW_PRODUCT} removeProduct={jest.fn()} />, {
      container: document.body.appendChild(tableRow),
    });
    // Then
    expect(screen.getByTestId("newProduct")).toBeInTheDocument();
  });

  it("should render component with ended product row when products contains ended product", () => {
    // Given
    const tableRow = document.createElement("tbody");
    // When
    render(<ProductRow product={ENDED_PRODUCT} removeProduct={jest.fn()} />, {
      container: document.body.appendChild(tableRow),
    });
    // Then
    expect(screen.getByTestId("endedProduct")).toBeInTheDocument();
  });

  it("should render component with common product row when products contains basic product", () => {
    // Given
    const tableRow = document.createElement("tbody");
    // When
    render(<ProductRow product={COMMON_PRODUCT} removeProduct={jest.fn()} />, {
      container: document.body.appendChild(tableRow),
    });
    // Then
    expect(screen.getByTestId("commonProduct")).toBeInTheDocument();
  });
});
