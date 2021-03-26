import { useState, useEffect, ReactElement } from "react";
import styles from "./cart.module.scss";
import { Product, User } from "../../models";
import { Summary } from "../../components/summary";
import { ProductTable } from "../../components/productTable";
import ApiService from "../../api";

export function Cart(): ReactElement {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getUserInfo();
    getCartProducts();
  }, []);

  const getUserInfo = async () => {
    const user: User = await ApiService.getUser();
    setUser(user);
  };

  const getCartProducts = async () => {
    const products: Product[] = await ApiService.getProducts();
    setProducts(products);
  };

  if (!user) {
    return <div>Loading ...</div>;
  }

  return (
    <div className={styles.container} data-testid="cart">
      <ProductTable
        products={products}
        updateProduct={(products: Product[]) => setProducts(products)}
      />
      <Summary
        products={products}
        isUserVIP={user.isVIP}
        coupon={user.coupon}
      />
    </div>
  );
}
