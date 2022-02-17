# React Refactoring Kata

## 🚩 Context

I want to refactor and clean the code of the company website cart page.
![Cart Page](public/images/cartPage.JPG)

## ⚙️ Business Rules Implemented

The cart page is composed of a products list and a summary.
Heres the list of the business logics implemented:

### 🛒 Cart Page

```
- If there are no products then display "No Products..."
- If there are products then display products table and price summary
```

### 🧾 Products table

The products table display the cart products list of the user.

**User Actions**

```
- User can delete product of the products list
```

When a user delete a product it delete all quantities of the concerned product

**Product Row**

There are 3 different type of products.

Each row contains :

- A picture
- The product name
- The quantity
- The total price
- A button to delete the product

```
An common product is displayed without specific rules
```

![Common Product](public/images/commonProduct.JPG)

```
An new product is displayed with a label 'New product' instead of the picture and next to the product title
```

![New Product](public/images/newProduct.JPG)

```
An ended product is displayed with a label 'End soon' next to the picture and the product title
```

![Ended Product](public/images/endedProduct.JPG)

### 💲 Summary

The summary display

1. Total price of the cart
2. Delivery fees
3. Total amount to pay.

**Total price**

```
Calculate all the cart's products price multiplicated by their quantities
```

**Delivery fees**

```
- If user should pay fees then add delivery fees ($3.99) to total price
- If user should not pay fees then add nothing to the total price
```

**Total amount to pay**

```
Amount to pay = total price + delivery fees
```

## ✔️ Acceptance Criteria

- Clean the code
- do NOT break any business rules.

## 👍 Useful commands

> `npm start`: Launch the page
>
> `npm test`: Launch the tests
