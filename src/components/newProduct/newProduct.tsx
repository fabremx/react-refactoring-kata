import { ReactElement } from "react";
import baseProductStyles from "../baseProduct/baseProduct.module.scss";
import styles from "./newProduct.module.scss";

interface Props {
  title: string;
}

export function NewProduct({ title }: Props): ReactElement {
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
        {title} <span>(New product)</span>
      </td>
    </>
  );
}
