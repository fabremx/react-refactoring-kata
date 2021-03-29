import { render } from "@testing-library/react";
import {
  COMMON_PRODUCT,
  ENDED_PRODUCT,
  NEW_PRODUCT_WITH_DISCOUNT,
} from "../../mocks/products";
import { Summary } from "./summary";

const PRODUCTS = [NEW_PRODUCT_WITH_DISCOUNT, ENDED_PRODUCT, COMMON_PRODUCT];
describe("Summary", () => {
  it("should render correctly the component when products is empty", () => {
    // When
    const { asFragment } = render(
      <Summary products={[]} isUserVIP={true} coupon={0} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly the component when user is VIP", () => {
    // When
    const { asFragment } = render(
      <Summary products={PRODUCTS} isUserVIP={true} coupon={0} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly the component when user is NOT VIP", () => {
    // When
    const { asFragment } = render(
      <Summary products={PRODUCTS} isUserVIP={false} coupon={0} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly the component when user has coupon", () => {
    // When
    const { asFragment } = render(
      <Summary products={PRODUCTS} isUserVIP={false} coupon={10} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });
});
