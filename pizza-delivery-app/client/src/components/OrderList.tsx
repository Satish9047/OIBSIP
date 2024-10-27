import { IOrder } from "../interface/order.Interface";
import { TableBody, TableCell, TableRow } from "../components/ui/table";
const OrderList = ({ userOrder }: { userOrder: IOrder[] }) => {
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
          <TableCell>
            {item.pizzaBase.name}, {item.sauceType.name}, {item.cheeseType.name}
            , {item.veggies[0].name}, {item.nonVeg[0].name}
          </TableCell>
          <TableCell>{item.isDelivered.toString()}</TableCell>
          <TableCell>{item.quantity}</TableCell>
          <TableCell>{formatDate(item.createdAt)}</TableCell>
          <TableCell>{item.paid.toString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default OrderList;
