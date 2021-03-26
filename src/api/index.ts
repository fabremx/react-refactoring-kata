import * as user from "./user";
import * as products from "./products";

const ApiService = {
  ...user,
  ...products,
};

export default ApiService;
