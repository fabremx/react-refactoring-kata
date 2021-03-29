import { render } from "@testing-library/react";
import { ProductPrice } from "./productPrice";

describe("ProductPrice", () => {
  it("should render correctly the component when price DOES NOT have discount", () => {
    // When
    const { asFragment } = render(<ProductPrice price={10} quantity={2} />);
    // Then
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly the component when price have discount", () => {
    // When
    const { asFragment } = render(
      <ProductPrice price={10} priceAfterDiscount={7} quantity={2} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });
});
