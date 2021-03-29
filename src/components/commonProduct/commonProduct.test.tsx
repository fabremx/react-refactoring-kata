import { render } from "@testing-library/react";
import { CommonProduct } from "./commonProduct";

describe("CommonProduct", () => {
  it("should render correctly the component", () => {
    // Given
    const tableRow = document.createElement("tr");
    // When
    const { asFragment } = render(
      <CommonProduct image={"Image"} title={"Title"} />,
      {
        container: document.body.appendChild(tableRow),
      }
    );
    // Then
    expect(asFragment()).toMatchSnapshot();
  });
});
