import { IOrder } from "../interface/order.Interface";
import { TableBody, TableCell, TableRow } from "../components/ui/table";
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
    <TableBody className="">
      {userOrder?.map((item, index) => (
        <TableRow className="" key={item._id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.user.name}</TableCell>
          <TableCell>{`${item.isDelivered}`}</TableCell>
          <TableCell>{item.quantity}</TableCell>
          <TableCell>{formatDate(item.createdAt)}</TableCell>
          <TableCell>{`${item.paid}`}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default OrderList;
