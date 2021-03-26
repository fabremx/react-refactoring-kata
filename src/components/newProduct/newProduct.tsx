import { ReactElement } from "react";
import { Product } from "../../models";
import baseProductStyles from "../baseProduct/baseProduct.module.scss";
import styles from "./newProduct.module.scss";

interface Props {
  product: Product;
}

export function NewProduct({ product }: Props): ReactElement {
  return (
    <>
      <td
        className={`${baseProductStyles.photo} ${styles.photo}`}
        data-testid="photoNewProduct"
      >
        <div>New product</div>
      </td>

      <td
        className={`${baseProductStyles.name} ${styles.name}`}
        data-testid="titleNewProduct"
      >
        {product.title} <span>(New product)</span>
      </td>
    </>
  );
}
