import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = () => {
  const createOrder = (data) => {
    return;
  };
  const onApprove = (data) => {};
  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, action) => onApprove(data, action)}
    />
  );
};

export default PayPalPayment;
