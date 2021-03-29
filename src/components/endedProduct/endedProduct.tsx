import { ReactElement } from "react";
import baseProductStyles from "../baseProduct/baseProduct.module.scss";
import styles from "./endedProduct.module.scss";

interface Props {
  image: string;
  title: string;
}

export function EndedProduct({ image, title }: Props): ReactElement {
  return (
    <>
      <td className={`${baseProductStyles.photo} ${styles.photo}`}>
        <div data-testid="photoEndedProduct">
          <img src={image} alt="product" />
          <div>End soon</div>
        </div>
      </td>

      <td
        className={`${baseProductStyles.name} ${styles.name}`}
        data-testid="titleEndedProduct"
      >
        {title} <span>(End Soon)</span>
      </td>
    </>
  );
}
