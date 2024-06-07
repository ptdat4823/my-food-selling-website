import { CartsToOrder, OrderToSend } from "@/convertor/orderConvertor";
import { Feedback, OrderStatus, PaymentMethod } from "src/models/Order";
import { Cart } from "../models/Cart";
import { User } from "../models/User";
import AxiosService from "./axiosService";

const AddOrder = (
  data: Cart[],
  status: OrderStatus,
  paymentMethod: PaymentMethod,
  note: string,
  user: User
) => {
  const orderToSend = OrderToSend(
    CartsToOrder(data, paymentMethod, note, user),
    status
  );
  return AxiosService.post("/api/orders", orderToSend, {
    withCredentials: true,
  });
};

const GetAllOrders = () => {
  return AxiosService.get("/api/orders", { withCredentials: true });
};

const GetOrder = (id: number) => {
  return AxiosService.get(`/api/orders/${id}`, { withCredentials: true });
};

const UpdateOrder = (id: number, status: OrderStatus) => {
  const statusToSend = { status: status };
  return AxiosService.put(`/api/orders/${id}`, statusToSend, {
    withCredentials: true,
  });
};

const DeleteOrder = (id: number) => {
  return AxiosService.delete(`/api/orders/${id}`, { withCredentials: true });
};

const SendFeedback = (id: number, feedback: Feedback) => {
  return AxiosService.post(`/api/orders/${id}/feedback`, feedback, {
    withCredentials: true,
  });
};

const OrderService = {
  AddOrder,
  GetAllOrders,
  GetOrder,
  DeleteOrder,
  UpdateOrder,
  SendFeedback,
};

export default OrderService;
