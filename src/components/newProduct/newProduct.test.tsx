import { render } from "@testing-library/react";
import { NewProduct } from "./newProduct";

describe("NewProduct", () => {
  it("should render correctly the component", () => {
    // Given
    const tableRow = document.createElement("tr");
    // When
    const { asFragment } = render(<NewProduct title={"Title"} />, {
      container: document.body.appendChild(tableRow),
    });
    // Then
    expect(asFragment()).toMatchSnapshot();
  });
});
