import { render } from "@testing-library/react";
import { EndedProduct } from "./endedProduct";

describe("EndedProduct", () => {
  it("should render correctly the component", () => {
    // Given
    const tableRow = document.createElement("tr");
    // When
    const { asFragment } = render(
      <EndedProduct image={"Image"} title={"Title"} />,
      {
        container: document.body.appendChild(tableRow),
      }
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });
});
