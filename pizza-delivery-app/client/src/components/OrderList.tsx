import { IOrder } from "../interface/order.Interface";

const OrderList = ({ userOrder }: { userOrder: IOrder[] }) => {
  console.log("from orderList component", userOrder);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <tbody className="">
      {userOrder?.map((item, index) => (
        <tr className="" key={item._id}>
          <td>{index + 1}</td>
          <td>{item.user.name}</td>
          <td>{`${item.isDelivered}`}</td>
          <td>{item.quantity}</td>
          <td>{formatDate(item.createdAt)}</td>
          <td>{`${item.paid}`}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrderList;
