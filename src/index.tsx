import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { CartPage } from "./components/cartPage";

const MOCKED_SHOULD_PAY_FEES = true;

ReactDOM.render(
  <React.StrictMode>
    <CartPage shouldPayFees={MOCKED_SHOULD_PAY_FEES} />
  </React.StrictMode>,
  document.getElementById("root")
);
