import { User } from "../models";

const BASE_USER = {
  id: 1,
  firstname: "firstname",
  lastname: "lastname",
};
export const MOCKED_USER = {
  ...BASE_USER,
  isVIP: false,
  coupon: 0,
};
export const USER_VIP_WITH_COUPON: User = {
  ...BASE_USER,
  isVIP: true,
  coupon: 10,
};
export const USER_VIP_WITHOUT_COUPON: User = {
  ...BASE_USER,
  isVIP: true,
  coupon: 0,
};

export const USER_NOT_VIP_WITH_COUPON: User = {
  ...BASE_USER,
  isVIP: false,
  coupon: 10,
};
export const USER_NOT_VIP_WITHOUT_COUPON: User = {
  ...BASE_USER,
  isVIP: false,
  coupon: 0,
};
