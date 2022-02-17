import { useState, useEffect, ReactElement } from "react";
import { Product } from "../../models";
import { Summary } from "../summary";
import { Products } from "../products";
import "../../assets/styles/styles.scss";

interface Props {
  shouldPayFees: boolean;
}

export function CartPage({ shouldPayFees }: Props): ReactElement {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCartProducts();
  }, []);

  const getCartProducts = async () => {
    const response = await fetch(`http://localhost:3000/api/products.json`);
    const result: { products: Product[] } = await response.json();
    setProducts(result.products);
  };

  const removeProduct = (idToRemove: number) => {
    const newProducts: Product[] = [];

    for (let i: number = 0; i < products.length; i++) {
      if (products[i].id !== idToRemove) {
        newProducts.push(products[i]);
      }
    }

    setProducts(newProducts);
  };

  const calculTotalPrice = (): number => {
    let price: number = 0;

    for (let i: number = 0; i < products.length; i++) {
      price += products[i].price;
    }

    return price;
  };

  const calculAmountToPay = (): number => {
    let price: number = 0;

    for (let i: number = 0; i < products.length; i++) {
      price += products[i].price;
    }

    if (shouldPayFees) {
      price += 3.99;
    }

    return price;
  };

  return (
    <>
      {!products?.length && <>No Products...</>}

      {Boolean(products?.length) &&
        <div className="cartPage" data-testid="cart">
          <Products products={products} removeProduct={removeProduct} />
          <Summary
            shouldPayFees={shouldPayFees}
            calculTotalPrice={calculTotalPrice}
            calculAmountToPay={calculAmountToPay}
          />
        </div>
      }
    </>
  );
}
