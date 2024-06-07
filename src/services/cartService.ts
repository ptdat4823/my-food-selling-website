import { Cart } from "../models/Cart";
import AxiosService from "./axiosService";

const AddCart = (data: Cart) => {
  return AxiosService.post("/api/cart", data, { withCredentials: true });
};

const GetCart = () => {
  return AxiosService.get("/api/cart", { withCredentials: true }).then(
    (res) => res.data as Cart[]
  );
};

const DeleteCart = (id: number) => {
  return AxiosService.delete(`/api/cart/${id}`, { withCredentials: true });
};

const UpdateCart = (data: Cart) => {
  return AxiosService.put(`/api/cart/${data.id}`, data, {
    withCredentials: true,
  });
};

const CartService = {
  AddCart,
  GetCart,
  DeleteCart,
  UpdateCart,
};

export default CartService;
