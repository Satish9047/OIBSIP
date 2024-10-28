import { IAllOrder } from "../interface/order.Interface";

const PendingOrderList = ({ pendingData }: { pendingData: IAllOrder[] }) => {
  return (
    <div>
      {pendingData.map((item, index) => (
        <div key={item._id}>
          <p>{item.user.name}</p>
          <label htmlFor="">{index}</label>
          <p>
            {item.pizzaBase.name}, {item.sauceType.name}, {item.cheeseType.name}
            , {item.veggies[0].name}, {item.nonVeg[0].name}
          </p>
          <p>Total Price: {item.price}</p>
          <p>{item.quantity}</p>
          <p> {item.paid}</p>
          <p>{item.isDelivered}</p>
        </div>
      ))}
    </div>
  );
};

export default PendingOrderList;
