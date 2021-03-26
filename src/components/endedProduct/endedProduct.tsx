import { ReactElement } from "react";
import { Product } from "../../models";
import baseProductStyles from "../baseProduct/baseProduct.module.scss";
import styles from "./endedProduct.module.scss";

interface Props {
  product: Product;
}

export function EndedProduct({ product }: Props): ReactElement {
  return (
    <>
      <td className={`${baseProductStyles.photo} ${styles.photo}`}>
        <div data-testid="photoEndedProduct">
          <img src={product.image} alt="product" />
          <div>End soon</div>
        </div>
      </td>

      <td
        className={`${baseProductStyles.name} ${styles.name}`}
        data-testid="titleEndedProduct"
      >
        {product.title} <span>(End Soon)</span>
      </td>
    </>
  );
}
