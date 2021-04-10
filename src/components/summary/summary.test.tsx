import { render } from "@testing-library/react";
import {
  COMMON_PRODUCT,
  ENDED_PRODUCT,
  NEW_PRODUCT,
} from "../../mocks/products";
import { Summary } from "./summary";

const PRODUCTS = [NEW_PRODUCT, ENDED_PRODUCT, COMMON_PRODUCT];

describe("Summary", () => {
  it("should render correctly the component when products is empty", () => {
    // When
    const { asFragment } = render(
      <Summary products={[]} isUserVIP={false} coupon={0} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly the component when user is VIP and has coupon", () => {
    // When
    const { asFragment } = render(
      <Summary products={PRODUCTS} isUserVIP={true} coupon={10} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly the component when user is NOT VIP and hos NOT coupon", () => {
    // When
    const { asFragment } = render(
      <Summary products={PRODUCTS} isUserVIP={false} coupon={0} />
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });
});
