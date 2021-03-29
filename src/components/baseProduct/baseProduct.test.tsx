import { render } from "@testing-library/react";
import { COMMON_PRODUCT } from "../../mocks/products";
import { BaseProduct } from "./baseProduct";

jest.mock("../productPrice", () => ({
  ProductPrice: () => <>Mock ProductPrice</>,
}));

describe("BaseProduct", () => {
  it("should render correctly the component", () => {
    // Given
    const tableRow = document.createElement("tbody");
    // When
    const { asFragment } = render(
      <BaseProduct
        product={COMMON_PRODUCT}
        removeProduct={jest.fn()}
        children={<td>Mock</td>}
      />,
      {
        container: document.body.appendChild(tableRow),
      }
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });
});
