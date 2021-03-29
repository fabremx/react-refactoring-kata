import { ReactElement } from "react";
import baseProductStyles from "../baseProduct/baseProduct.module.scss";

interface Props {
  image: string;
  title: string;
}

export function CommonProduct({ image, title }: Props): ReactElement {
  return (
    <>
      <td className={baseProductStyles.photo} data-testid="photoCommonProduct">
        <img src={image} alt="product" />
      </td>

      <td className={baseProductStyles.name} data-testid="titleCommonProduct">
        {title}
      </td>
    </>
  );
}
