import { ReactElement } from "react";
import { Product } from "../../models";
import baseProductStyles from "../baseProduct/baseProduct.module.scss";

interface Props {
  product: Product;
}

export function CommonProduct({ product }: Props): ReactElement {
  return (
    <>
      <td className={baseProductStyles.photo} data-testid="photoCommonProduct">
        <img src={product.image} alt="product" />
      </td>

      <td className={baseProductStyles.name} data-testid="titleCommonProduct">
        {product.title}
      </td>
    </>
  );
}
