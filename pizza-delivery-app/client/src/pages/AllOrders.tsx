import CompletedOrderList from "../components/CompletedOrderList";
import PendingOrderList from "../components/PendingOrderList";
import { useGetAllOrdersQuery } from "../redux/api/apiServices";

const AllOrders = () => {
  const { data } = useGetAllOrdersQuery();
  console.log("all Orders", data);

  const pendingOrders =
    data?.data?.filter((item) => {
      return item.isDelivered === false;
    }) || [];
  const completedOrders =
    data?.data?.filter((item) => {
      return item.isDelivered === true;
    }) || [];

  return (
    <main>
      <div>
        <h1>Orders</h1>
      </div>
      <div>
        <section>
          <div>
            <h2>Pending Orders</h2>
          </div>
          <div>
            <PendingOrderList pendingData={pendingOrders} />
          </div>
        </section>
        <section>
          <div>
            <h2>Completed Orders</h2>
          </div>
          <div>
            <CompletedOrderList completedData={completedOrders} />
          </div>
        </section>
      </div>
    </main>
  );
};
export default AllOrders;
