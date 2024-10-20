import {
  useGetUserOrderQuery,
  useGetUserQuery,
} from "../redux/api/apiServices";
import OrderList from "../components/OrderList";
import { IOrder } from "../interface/order.Interface";

const Profile = () => {
  const { data } = useGetUserQuery({});
  const { data: userOrders } = useGetUserOrderQuery({});

  console.log("User data:", data?.data);
  console.log("User orders:", userOrders);

  if (!data || !data.data) {
    console.log("no data");
    return null;
  }
  if (!userOrders || !userOrders.data) {
    console.log("no order data");
    return null;
  }

  const userOrdersList: IOrder[] = userOrders?.data || [];
  console.log(userOrdersList);

  console.log("from profile", data?.data);
  return (
    <div className="flex flex-col items-center  gap-5 w-11/12 min-h-[calc(100vh-5rem)] mx-auto">
      <div className="w-full p-4">
        <h2>My Profile</h2>
      </div>
      <div className="flex flex-col items-center justify-between w-11/12 p-4 ">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <aside>
            <figure>
              <img
                src="/images/pizza1.png"
                alt="profile image"
                className="w-96 "
              />
            </figure>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-2">
                <img
                  src="/icon/profile.svg"
                  width={20}
                  height={20}
                  alt="profile"
                />
                <h3>{data?.data.name}</h3>
              </div>
              <div className="flex flex-row gap-2">
                <img src="/icon/email.svg" width={20} height={20} alt="email" />
                <p>{data?.data.email}</p>
              </div>
              <div className="flex flex-row gap-2">
                <img src="/icon/phone.svg" width={20} height={20} alt="phone" />
                <p>{data?.data.phone}</p>
              </div>
              <div className="flex flex-row gap-2">
                <img
                  src="/icon/address.svg"
                  width={20}
                  height={20}
                  alt="location"
                />
                <p>{data?.data.address}</p>
              </div>
            </div>
          </aside>
          <aside className="w-full p-2">
            <h3 className="font-semibold">Your Order</h3>
            <table className="w-full text-lg border-2">
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>Name</th>
                  <th>Delivered</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Paid</th>
                </tr>
              </thead>
              <OrderList userOrder={userOrdersList} />
            </table>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Profile;
