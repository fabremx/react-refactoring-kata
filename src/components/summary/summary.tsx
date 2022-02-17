import { ReactElement } from "react";
import "../../assets/styles/styles.scss";

interface Props {
  shouldPayFees: boolean;
  calculTotalPrice: () => number;
  calculAmountToPay: () => number;
}
export function Summary({
  shouldPayFees,
  calculTotalPrice,
  calculAmountToPay,
}: Props): ReactElement {
  return (
    <div className="summary">
      <h3>Order summary</h3>

      <div className="summary__element">
        <h4>Total Price</h4>
        <div className="summary__value" data-testid="totalPrice">
          $ {calculTotalPrice().toFixed(2)}
        </div>
      </div>

      <div className="summary__element">
        <h4>Total Fees</h4>
        <div className="summary__value" data-testid="totalFees">
          {shouldPayFees ? '$ 3.99' : 'Free'}
        </div>
      </div>

      <hr />

      <div className="summary__element">
        <h5>Amount To Pay</h5>
        <div className="summary__value summary__value--large" data-testid="amountToPay">
          $ {calculAmountToPay().toFixed(2)}
        </div>
      </div>
    </div>
  );
}
