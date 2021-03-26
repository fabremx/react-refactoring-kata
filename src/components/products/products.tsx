import { ReactElement } from "react";
import { ReactComponent as RemoveIcon } from "../../assets/images/remove.svg";
import { Product } from "../../models";
import styles from "./products.module.scss";

interface Props {
  products: Product[];
  removeProduct: (idToRemove: number) => void;
}

export function Products({ products, removeProduct }: Props): ReactElement {
  return (
    <div className={styles.cart}>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 &&
            products.map((product) => (
              <tr key={product.id}>
                <td className={styles.photo}>
                  {product.isNew && (
                    <span>New product (No image available)</span>
                  )}

                  {!product.isNew && product.isSoonEnding && (
                    <>
                      <img src={product.image} alt="product" />
                      <span>End of the product very soon</span>
                    </>
                  )}

                  {!product.isNew && !product.isSoonEnding && (
                    <img src={product.image} alt="product" />
                  )}
                </td>

                <td className={styles.name}>
                  {product.isNew && (
                    <>
                      {product.title} <span>(New product)</span>
                    </>
                  )}

                  {!product.isNew && product.isSoonEnding && (
                    <>
                      {product.title} <span>(End Soon)</span>
                    </>
                  )}

                  {!product.isNew && !product.isSoonEnding && (
                    <>{product.title}</>
                  )}
                </td>

                <td className={styles.price}>
                  <>$ {product.price}</>
                </td>
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
                <td className={styles.total}>
                  <>
                    {product.priceAfterDiscount ? (
                      <div>
                        <span className={styles.stripped}>
                          $ {product.price * product.quantity}
                        </span>
                        {""} $ {product.priceAfterDiscount * product.quantity}
                      </div>
                    ) : (
                      product.price * product.quantity
                    )}
                  </>
                </td>
                <td className={styles.remove}>
                  <RemoveIcon onClick={() => removeProduct(product.id)} />
                </td>
              </tr>
            ))}

          {products.length === 0 && (
            <tr>
              <td colSpan={6} className={styles.noProducts}>
                No products in cart
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
