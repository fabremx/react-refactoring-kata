import { render } from "@testing-library/react";
import { COMMON_PRODUCT } from "../../mocks/products";
import { ProductTable } from "./productTable";

jest.mock("../productRow", () => ({
  ProductRow: () => (
    <tr>
      <td>Product Mock</td>
    </tr>
  ),
}));

describe("ProductPrice", () => {
  it("should render correctly the component when products is empty", () => {
    // When
    const { asFragment } = render(
      <ProductTable products={[]} updateProduct={jest.fn()} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly the component when products is NOT empty", () => {
    // When
    const { asFragment } = render(
      <ProductTable products={[COMMON_PRODUCT]} updateProduct={jest.fn()} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });
});
