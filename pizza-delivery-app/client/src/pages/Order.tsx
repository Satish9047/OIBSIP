import { z } from "zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import SelectBtn from "../components/SelectBtn";
import { Button } from "../components/ui/button";
import { IBill, IPizzaRecipe, IRecipe } from "../interface/app.interface";
import { useGetAllRecipeQuery } from "../redux/api/apiServices";
import { orderSchema } from "../schema/orderSchema";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import PayPalPayment from "../components/PayPalPayment";
import { useLocation } from "react-router-dom";

type PizzaOrderFormData = z.infer<typeof orderSchema>;

function Order() {
  const location = useLocation();
  console.log(location);
  const { data } = useGetAllRecipeQuery();

  const [bill, setBill] = useState<IBill>({
    basePrice: 0,
    saucePrice: 0,
    cheesePrice: 0,
    veggiesPrice: 0,
    nonVegPrice: 0,
    deliveryCharge: 50,
    quantity: 1,
    totalPrice: 0,
  });

  const [selectedNames, setSelectedNames] = useState({
    baseName: "",
    sauceName: "",
    cheeseName: "",
    veggiesNames: "",
    nonVegNames: "",
  });

  const [orderPizza, setOrderPizza] = useState<PizzaOrderFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PizzaOrderFormData>({ resolver: zodResolver(orderSchema) });

  const initialOptions = {
    clientId:
      "AahBwlq4iFzKbjEYwLkJbBnWxJC1C25wrDDkAgiISiSoURjhyhnsAAOgYKIbfL3k2Lj1C5vpDXb2rdmc",
    currency: "USD",
    intent: "capture",
  };

  // Calculate bill after the form is submitted
  useEffect(() => {
    if (orderPizza && data?.data) {
      const base = data.data.pizzaBase.find(
        (item) => item._id === orderPizza.pizzaBaseId
      );
      const sauce = data.data.sauce.find(
        (item) => item._id === orderPizza.pizzaSauceId
      );
      const cheese = data.data.cheese.find(
        (item) => item._id === orderPizza.pizzaCheeseId
      );
      const veggies = data.data.veggies.filter((item) =>
        orderPizza.pizzaVeggiesIds.includes(item._id)
      );
      const nonVeg = data.data.nonVeg.filter((item) =>
        orderPizza.pizzaNonVegIds.includes(item._id)
      );

      const basePrice = base?.price || 0;
      const saucePrice = sauce?.price || 0;
      const cheesePrice = cheese?.price || 0;
      const veggiesPrice =
        veggies.reduce((acc, item) => acc + item.price, 0) || 0;
      const nonVegPrice =
        nonVeg.reduce((acc, item) => acc + item.price, 0) || 0;

      const totalPrice =
        (basePrice + saucePrice + cheesePrice + veggiesPrice + nonVegPrice) *
          parseInt(orderPizza.quantity) +
        bill.deliveryCharge;

      setBill({
        basePrice: basePrice * parseInt(orderPizza.quantity),
        saucePrice: saucePrice * parseInt(orderPizza.quantity),
        cheesePrice: cheesePrice * parseInt(orderPizza.quantity),
        veggiesPrice: veggiesPrice * parseInt(orderPizza.quantity),
        nonVegPrice: nonVegPrice * parseInt(orderPizza.quantity),
        quantity: parseInt(orderPizza.quantity),
        deliveryCharge: bill.deliveryCharge,
        totalPrice,
      });

      setSelectedNames({
        baseName: base?.name || "",
        sauceName: sauce?.name || "",
        cheeseName: cheese?.name || "",
        veggiesNames: veggies.map((v) => v.name).join(", "),
        nonVegNames: nonVeg.map((n) => n.name).join(", "),
      });
    }
  }, [orderPizza, data, bill.deliveryCharge, location.state, bill]);
  if (!data || !data.data) {
    return null;
  }

  const { pizzaBase, sauce, cheese, veggies, nonVeg }: IPizzaRecipe = data.data;

  const onSubmit = (formData: PizzaOrderFormData) => {
    setOrderPizza(formData);
    console.log("pizza order submitted:", formData);
  };

  return (
    <div className="flex flex-col items-center  gap-5 md:w-full min-h-[calc(100vh-5rem)] mx-auto p-4">
      <div className="w-full">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Make your Custom Pizza order</h2>
          <hr />
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <aside className="md:w-9/12">
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="">Quantity</label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  className="max-w-xs p-3 text-lg"
                  defaultValue={location.state?.quantity}
                  {...register("quantity")}
                />
                {errors.quantity && (
                  <p className="text-red-500">{errors.quantity.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Choose your desire Pizza Base</label>
                <SelectBtn
                  recipes={pizzaBase as unknown as IRecipe[]}
                  register={register("pizzaBaseId")}
                  errors={errors.pizzaBaseId?.message}
                  defaultValue={location.state?.base.id}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Choose your desire sauce</label>
                <SelectBtn
                  recipes={sauce as unknown as IRecipe[]}
                  register={register("pizzaSauceId")}
                  errors={errors.pizzaSauceId?.message}
                  defaultValue={location.state?.sauce.id}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Choose your desire cheese type</label>
                <SelectBtn
                  recipes={cheese as unknown as IRecipe[]}
                  register={register("pizzaCheeseId")}
                  errors={errors.pizzaCheeseId?.message}
                  defaultValue={location.state?.cheese.id}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Choose your desire Veggies</label>
                <SelectBtn
                  recipes={veggies as unknown as IRecipe[]}
                  register={register("pizzaVeggiesIds")}
                  errors={errors.pizzaVeggiesIds?.message}
                  defaultValue={location.state?.veggies.id}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Choose your desire NonVeg</label>
                <SelectBtn
                  recipes={nonVeg as unknown as IRecipe[]}
                  register={register("pizzaNonVegIds")}
                  errors={errors.pizzaNonVegIds?.message}
                  defaultValue={location.state?.nonVeg.id}
                />
              </div>

              <div className="text-right">
                <Button className="bg-orange-300 rounded-md hover:bg-orange-400">
                  See Bill
                </Button>
              </div>
            </form>
          </aside>
          <aside className="md:w-3/12">
            <PayPalScriptProvider options={initialOptions}>
              <div className="p-6 space-y-4">
                <div className="space-y-4">
                  <h3>Your Bill</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-row items-center justify-between">
                    <label>{selectedNames.baseName || "Pizza base"}</label>
                    <p>{bill.basePrice}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <label>{selectedNames.sauceName || "Sauce"}</label>
                    <p>{bill.saucePrice}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <label>{selectedNames.cheeseName || "Cheese"}</label>
                    <p>{bill.cheesePrice}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <label>{selectedNames.veggiesNames || "Veggies"}</label>
                    <p>{bill.veggiesPrice}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <label>{selectedNames.nonVegNames || "NonVeg"}</label>
                    <p>{bill.nonVegPrice}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <label>Delivery Charge</label>
                    <p>{bill.deliveryCharge}</p>
                  </div>
                  <hr />
                  <div className="flex flex-row items-center justify-between">
                    <label>Total Price</label>
                    <p>{bill.totalPrice}</p>
                  </div>
                </div>
                <div>
                  <PayPalPayment />
                </div>
              </div>
            </PayPalScriptProvider>
          </aside>
        </div>
      </div>
    </div>
  );
}
export default Order;
