import { ReactElement } from "react";
import { Product } from "../../models";
import styles from "./summary.module.scss";

interface Props {
  products: Product[];
  isUserVIP: boolean;
  coupon: number;
}

export function Summary({ products, isUserVIP, coupon }: Props): ReactElement {
  const calculTotal = (products: Product[]): number => {
    return products.reduce(
      (acc: number, product: Product): number => acc + product.price,
      0
    );
  };

  const calculTotalWithCouponDiscount = (total: number, coupon: number) => {
    if (!coupon) return total;
    return total - total * (coupon / 100);
  };

  const calculWithDeliveryFees = (total: number, isUserVIP: boolean) => {
    const DELIVERY_FEES = 3.99;

    if (!isUserVIP) return total + DELIVERY_FEES;
    return total;
  };

  const calculTotalAfterDiscount = (
    products: Product[],
    isUserVIP: boolean,
    coupon: number
  ): number => {
    const total: number = calculTotal(products);
    const totalAfterCoupon: number = calculTotalWithCouponDiscount(
      total,
      coupon
    );
    const totalAfterCouponAndDeliveryFees: number = calculWithDeliveryFees(
      totalAfterCoupon,
      isUserVIP
    );
    return totalAfterCouponAndDeliveryFees;
  };

  return (
    <div className={styles.summary}>
      <h3>Order summary</h3>

      <div className={styles.element}>
        <h4>Sub Total</h4>
        <div data-testid="subTotal">$ {calculTotal(products).toFixed(2)} </div>
      </div>

      <>
        <hr />
        {coupon && (
          <div className={styles.element}>
            <h4>Coupon Discount</h4>
            <div>% {coupon}</div>
          </div>
        )}

        <div className={styles.element}>
          <h4>Shipping Cost</h4>
          <div>
            {isUserVIP && <span>Free</span>}
            {!isUserVIP && <span>$ 3.99</span>}
          </div>
        </div>
      </>

      <div className={`${styles.element} ${styles.total}`}>
        <h5>Total</h5>
        <div data-testid="total">
          $ {calculTotalAfterDiscount(products, isUserVIP, coupon).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
