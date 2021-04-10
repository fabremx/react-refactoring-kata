import { COMMON_PRODUCT } from "../../../mocks/products";
import { MOCKED_USER } from "../../../mocks/user";
import { mockRetrivedUserAndProductsWith, renderComponent } from "./utils";

jest.mock("../../../components/productTable", () => ({
  ProductTable: () => <>Mock ProductTable</>,
}));

jest.mock("../../../components/summary", () => ({
  Summary: () => <>Mock Summary</>,
}));

describe("Cart", () => {
  it("should render Loading message when user is not defined", async () => {
    // Given
    mockRetrivedUserAndProductsWith(undefined, [COMMON_PRODUCT]);
    // When
    const { asFragment } = await renderComponent();
    // Then
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render component when user is defined", async () => {
    // Given
    mockRetrivedUserAndProductsWith(MOCKED_USER, [COMMON_PRODUCT]);
    // When
    const { asFragment } = await renderComponent();
    // Then
    expect(asFragment()).toMatchSnapshot();
  });
});
