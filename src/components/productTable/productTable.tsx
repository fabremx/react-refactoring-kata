import { ReactElement } from "react";
import { Product } from "../../models";
import { ProductRow } from "../productRow";
import styles from "./productTable.module.scss";

interface Props {
  products: Product[];
  updateProduct: (products: Product[]) => void;
}

export function ProductTable({ products, updateProduct }: Props): ReactElement {
  const removeProduct = (idToRemove: number) => {
    const updatedProducts: Product[] = products.filter(
      (product: Product) => product.id !== idToRemove
    );
    updateProduct(updatedProducts);
  };

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

          {products.map((product) => (
            <ProductRow
              product={product}
              removeProduct={removeProduct}
              key={product.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
