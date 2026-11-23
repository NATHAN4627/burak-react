import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";
import { Member } from "./member";

export interface OrderItem {
  _id: string;
  itemQuantity: number;
  itemPrice: number;
  orderId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregations **/
  orderItems?: OrderItem[];
  productData?: Product[];
}

export interface OrderItemInput {
  productId: string;
  itemPrice: number;
  itemQuantity: number;
  orderId?: string; // bu postman dan kelmaydi, uzimiz hosil etamiz
}

export interface OrderInquery {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}
