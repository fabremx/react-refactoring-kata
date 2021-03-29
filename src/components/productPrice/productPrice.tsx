import { ReactElement } from "react";
import styles from "./productPrice.module.scss";

interface Props {
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
}

export function ProductPrice({
  price,
  priceAfterDiscount,
  quantity,
}: Props): ReactElement {
  const getDiscountPrice = (
    price: number,
    priceAfterDiscount: number,
    quantity: number
  ) => (
    <>
      <span className={styles.stripped}>{`$ ${price * quantity}`}</span>
      {` $ ${priceAfterDiscount * quantity}`}
    </>
  );

  const getPrice = (price: number, quantity: number) => `$ ${price * quantity}`;

  return (
    <div data-testid="price">
      {priceAfterDiscount
        ? getDiscountPrice(price, priceAfterDiscount, quantity)
        : getPrice(price, quantity)}
    </div>
  );
}
