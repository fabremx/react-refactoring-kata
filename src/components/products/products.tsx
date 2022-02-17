import { ReactElement } from "react";
import { ReactComponent as RemoveIcon } from "../../assets/images/remove.svg";
import { Product } from "../../models";
import "../../assets/styles/styles.scss";

interface Props {
  products: Product[];
  removeProduct: (idToRemove: number) => void;
}

export function Products({ products, removeProduct }: Props): ReactElement {
  return (
    <div className="products">
      <table className="products__table">
        <thead className="products__header">
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody className="products__body">
          {products.map((product) => (
            <tr className="product" key={product.id}>
              <td className="product__image">
                {product.isNew &&
                  <div className="product__label product__label--green">
                    New product
                  </div>
                }

                {!product.isNew && product.isSoonEnding &&
                  <>
                    <img src={product.image} alt="ended product" />
                    <div className="product__label product__label--orange">End soon</div>
                  </>
                }

                {!product.isNew && !product.isSoonEnding &&
                  <img src={product.image} alt="product" />
                }
              </td>

              <td className="product__name">
                {product.isNew &&
                  <>
                    {product.title} <span className="product__name--green">(New product)</span>
                  </>
                }

                {!product.isNew && product.isSoonEnding &&
                  <>
                    {product.title} <span className="product__name--orange">(End Soon)</span>
                  </>
                }

                {!product.isNew && !product.isSoonEnding &&
                  <>{product.title}</>
                }
              </td>

              <td className="product__quantity">
                <input
                  type="number"
                  size={4}
                  defaultValue={product.quantity}
                  min="0"
                  step="1"
                  disabled
                />
              </td>

              <td className="product__total">
                ${product.price * product.quantity}
              </td>

              <td className="product__delete">
                <RemoveIcon
                  onClick={() => removeProduct(product.id)}
                  data-testid="removeButton"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
