import { ReactElement } from "react";
import { ReactComponent as RemoveIcon } from "../../assets/images/remove.svg";
import { Product } from "../../models";
import styles from "./baseProduct.module.scss";

interface Props {
  product: Product;
  children: ReactElement;
  removeProduct: (id: number) => void;
}

export function BaseProduct({
  product,
  children,
  removeProduct,
}: Props): ReactElement {
  return (
    <tr key={product.id}>
      {children}

      <td className={styles.quantity}>
        <input
          type="number"
          size={4}
          defaultValue={product.quantity}
          min="0"
          step="1"
          disabled
        />
      </td>

      <td className={styles.total}>$ {product.price * product.quantity}</td>

      <td className={styles.remove}>
        <RemoveIcon
          onClick={() => removeProduct(product.id)}
          data-testid="remove"
        />
      </td>
    </tr>
  );
}
