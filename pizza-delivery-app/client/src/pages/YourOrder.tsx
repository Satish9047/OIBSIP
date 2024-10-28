import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import OrderList from "../components/OrderList";
import { useGetUserOrderQuery } from "../redux/api/apiServices";
import { IOrder } from "../interface/order.Interface";

const YourOrder = () => {
  const { data: userOrders } = useGetUserOrderQuery();
  const userOrdersList: IOrder[] = userOrders?.data || [];
  return (
    <main className="w-full p-2">
      <h3 className="font-semibold">Your Order</h3>
      <div>
        {userOrdersList.length < 1 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p>Your Order is Empty</p>
          </div>
        ) : (
          <Table className="w-full text-lg">
            <TableHeader>
              <TableRow>
                <TableHead>S.N.</TableHead>
                <TableHead>Recipe</TableHead>
                <TableHead>Delivered</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Paid</TableHead>
              </TableRow>
            </TableHeader>
            <OrderList userOrder={userOrdersList} />
          </Table>
        )}
      </div>
    </main>
  );
};

export default YourOrder;
