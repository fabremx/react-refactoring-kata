import { ReactElement } from "react";
import { Product, User } from "../../models";
import styles from "./summary.module.scss";

interface Props {
  products: Product[];
  user: User;
  calculTotal: () => number;
  calculTotalAfterDiscount: () => number;
}
export function Summary({
  products,
  user,
  calculTotal,
  calculTotalAfterDiscount,
}: Props): ReactElement {
  return (
    <div className={styles.summary}>
      <h3>Order summary</h3>

      <div className={styles.element}>
        <h4>Sub Total</h4>
        <div>$ {calculTotal().toFixed(2)} </div>
      </div>

      {products.length > 0 && (
        <div data-testid="discountDetails">
          <hr />
          {user.coupon ? (
            <div className={styles.element}>
              <h4>Coupon Discount</h4>
              <div>% {user.coupon}</div>
            </div>
          ) : null}
          <div className={styles.element}>
            <h4>Shipping Cost</h4>
            <div>
              {user.isVIP && <span>Free</span>}
              {!user.isVIP && <span>$ 3.99</span>}
            </div>
          </div>
        </div>
      )}
      <hr />

      <div className={`${styles.element} ${styles.total}`}>
        <h5>Total</h5>
        <div>$ {calculTotalAfterDiscount().toFixed(2)} </div>
      </div>

      <hr />

      <div className={styles.submit}>
        {products.length > 0 && <button data-testid="buyBtn">Buy</button>}
      </div>
    </div>
  );
}
