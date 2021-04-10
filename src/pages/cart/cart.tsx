import { useState, useEffect, ReactElement } from "react";
import styles from "./cart.module.scss";
import { Product, User } from "../../models";
import { Summary } from "../../components/summary";
import { Products } from "../../components/products";

export function Cart(): ReactElement {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getUserInfo();
    getCartProducts();
  }, []);

  const getUserInfo = async () => {
    const response = await fetch("http://localhost:3000/api/user.json");
    const user: User = await response.json();
    setUser(user);
  };

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

  const calculTotal = (): number => {
    let price: number = 0;
    for (let i: number = 0; i < products.length; i++) {
      price += products[i].price;
    }
    return price;
  };

  const calculTotalAfterDiscount = (): number => {
    let price: number = 0;
    for (let i: number = 0; i < products.length; i++) {
      price += products[i].price;
    }
    if (user && user.coupon) {
      price -= price * (user.coupon / 100);
    }
    if (user && user.isVIP === false) {
      price += 3.99;
    }
    return price;
  };

  return (
    <>
      {!user && <>Loading...</>}
      {user && (
        <div className={styles.container} data-testid="cart">
          <Products products={products} removeProduct={removeProduct} />
          <Summary
            user={user}
            calculTotalAfterDiscount={calculTotalAfterDiscount}
            calculTotal={calculTotal}
          />
        </div>
      )}
    </>
  );
}
