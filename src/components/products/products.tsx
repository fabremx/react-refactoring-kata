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
                    <div
                      data-testid="photoNewProduct"
                      className={styles.newProduct}
                    >
                      New product
                    </div>
                  )}

                  {!product.isNew && product.isSoonEnding && (
                    <div
                      data-testid="photoEndedProduct"
                      className={styles.endedProduct}
                    >
                      <img src={product.image} alt="ended product" />
                      <div>End of the product very soon</div>
                    </div>
                  )}

                  {!product.isNew && !product.isSoonEnding && (
                    <img
                      src={product.image}
                      alt="product"
                      data-testid="photoCommonProduct"
                    />
                  )}
                </td>

                <td className={styles.name}>
                  {product.isNew && (
                    <div
                      data-testid="titleNewProduct"
                      className={styles.newProduct}
                    >
                      {product.title} <span>(New product)</span>
                    </div>
                  )}

                  {!product.isNew && product.isSoonEnding && (
                    <div
                      data-testid="titleEndedProduct"
                      className={styles.endedProduct}
                    >
                      {product.title} <span>(End Soon)</span>
                    </div>
                  )}

                  {!product.isNew && !product.isSoonEnding && (
                    <div data-testid="titleCommonProduct">{product.title}</div>
                  )}
                </td>

                <td className={styles.price} data-testid="price">
                  {product.priceAfterDiscount ? (
                    <div>
                      <span className={styles.stripped}>$ {product.price}</span>
                      {""} $ {product.priceAfterDiscount}
                    </div>
                  ) : (
                    <span>$ {product.price}</span>
                  )}
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
                  <div data-testid="total">
                    {product.priceAfterDiscount ? (
                      <div>
                        <span className={styles.stripped}>
                          $ {product.price * product.quantity}
                        </span>
                        {""} $ {product.priceAfterDiscount * product.quantity}
                      </div>
                    ) : (
                      <span>{`$ ${product.price * product.quantity}`}</span>
                    )}
                  </div>
                </td>
                <td className={styles.remove}>
                  <RemoveIcon
                    onClick={() => removeProduct(product.id)}
                    data-testid="remove"
                  />
                </td>
              </tr>
            ))}

          {products.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className={styles.noProducts}
                data-testid="noProducts"
              >
                No products in cart
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
