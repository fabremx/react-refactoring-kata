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

describe("ProductTable", () => {
  it("should render correctly the component", () => {
    // When
    const { asFragment } = render(
      <ProductTable products={[COMMON_PRODUCT]} updateProduct={jest.fn()} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });
});
