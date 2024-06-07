// import { Cart } from "@/models/Cart";
// import { Order, OrderStatus, PaymentMethod } from "@/models/Order";
// import { User } from "@/models/User";

// const CartsToOrder = (
//   cartList: Cart[],
//   paymentMethod: PaymentMethod,
//   note: string,
//   user: User
// ) => {
//   let total = cartList.reduce((acc, cart) => {
//     return acc + cart.price;
//   }, 0);

//   const order: Order = {
//     id: 0,
//     total: total + total * 0.1,
//     status: OrderStatus.PENDING,
//     items: cartList,
//     createdAt: new Date(),
//     paymentMethod: paymentMethod,
//     user: user,
//     note: note,
//   };
//   return order;
// };

// const OrderToSend = (
//   order: Order,
//   status: OrderStatus = OrderStatus.PENDING
// ) => {
//   const orderToSend = {
//     ...order,
//     status: status,
//     createAt: order.createdAt.toISOString(),
//   };
//   return orderToSend;
// };

// const OrderToReceive = (data: any): Order => {
//   const orderReceived: Order = {
//     id: data.id,
//     total: data.total,
//     status: data.status,
//     items: data.items,
//     createdAt: new Date(data.createdAt),
//     paymentMethod: data.paymentMethod,
//     user: data.user,
//     feedback: data.feedback,
//     note: data.note,
//   };
//   return orderReceived;
// };

// export { CartsToOrder, OrderToReceive, OrderToSend };
