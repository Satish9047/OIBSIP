import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import SelectBtn from "../components/SelectBtn";
import { Button } from "../components/ui/button";
import { IPizzaRecipe, IRecipe } from "../interface/app.interface";
import { useGetAllRecipeQuery } from "../redux/api/apiServices";
import { orderSchema } from "../schema/orderSchema";
import { useForm } from "react-hook-form";

type PizzaOrderFormData = z.infer<typeof orderSchema>;
interface IBill {
  basePrice: number;
  saucePrice: number;
  cheesePrice: number;
  veggiesPrice: number;
  nonVegPrice: number;
  deliveryCharge: number;
  totalPrice: number;
}

function Order() {
  const { data } = useGetAllRecipeQuery({});
  const [bill, setBill] = useState<IBill>({
    basePrice: 0,
    saucePrice: 0,
    cheesePrice: 0,
    veggiesPrice: 0,
    nonVegPrice: 0,
    deliveryCharge: 50,
    totalPrice: 0,
  });
  const [orderPizza, setOrderPizza] = useState<PizzaOrderFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PizzaOrderFormData>({ resolver: zodResolver(orderSchema) });

  // Calculate bill after the form is submitted
  useEffect(() => {
    if (orderPizza) {
      const basePrice =
        data?.data.pizzaBase.find((item) => item._id === orderPizza.pizzaBaseId)
          ?.price || 0;
      const saucePrice =
        data?.data.sauce.find((item) => item._id === orderPizza.pizzaSauceId)
          ?.price || 0;
      const cheesePrice =
        data?.data.cheese.find((item) => item._id === orderPizza.pizzaCheeseId)
          ?.price || 0;
      const veggiesPrice =
        data?.data.veggies
          .filter((item) => orderPizza.pizzaVeggiesIds.includes(item._id))
          .reduce((acc, item) => acc + item.price, 0) || 0;
      const nonVegPrice =
        data?.data.nonVeg
          .filter((item) => orderPizza.pizzaNonVegIds.includes(item._id))
          .reduce((acc, item) => acc + item.price, 0) || 0;

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
        deliveryCharge: bill.deliveryCharge,
        totalPrice,
      });
    }
  }, [orderPizza, data, bill.deliveryCharge]);
  if (!data || !data.data) {
    return null;
  }

  const { pizzaBase, sauce, cheese, veggies, nonVeg }: IPizzaRecipe = data.data;

  const onSubmit = (formData: PizzaOrderFormData) => {
    setOrderPizza(formData);
    console.log("pizza order submitted:", formData);
  };

  return (
    <div className="flex flex-col items-center  gap-5 md:w-11/12 min-h-[calc(100vh-5rem)] mx-auto p-4">
      <div className="w-full">
        <div>
          <h2 className="text-3xl font-bold">Make your Custom Pizza order</h2>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <aside className="md:w-8/12">
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <label htmlFor="">Choose your desire Pizza Base</label>
                <SelectBtn
                  recipes={pizzaBase as unknown as IRecipe[]}
                  register={register("pizzaBaseId")}
                  errors={errors.pizzaBaseId?.message}
                />
              </div>
              <div>
                <label htmlFor="">Choose your desire sauce</label>
                <SelectBtn
                  recipes={sauce as unknown as IRecipe[]}
                  register={register("pizzaSauceId")}
                  errors={errors.pizzaSauceId?.message}
                />
              </div>
              <div>
                <label htmlFor="">Choose your desire cheese type</label>
                <SelectBtn
                  recipes={cheese as unknown as IRecipe[]}
                  register={register("pizzaCheeseId")}
                  errors={errors.pizzaCheeseId?.message}
                />
              </div>
              <div>
                <label htmlFor="">Choose your desire Veggies</label>
                <SelectBtn
                  recipes={veggies as unknown as IRecipe[]}
                  register={register("pizzaVeggiesIds")}
                  errors={errors.pizzaVeggiesIds?.message}
                />
              </div>
              <div>
                <label htmlFor="">Choose your desire NonVeg</label>
                <SelectBtn
                  recipes={nonVeg as unknown as IRecipe[]}
                  register={register("pizzaNonVegIds")}
                  errors={errors.pizzaNonVegIds?.message}
                />
              </div>
              <div>
                <label htmlFor="">Quantity</label>
                <input type="number" {...register("quantity")} />
                {errors.quantity && (
                  <p className="text-red-500">{errors.quantity.message}</p>
                )}
              </div>
              <div className="text-right">
                <Button className="bg-orange-500 rounded-md hover:bg-orange-600">
                  Make Order
                </Button>
              </div>
            </form>
          </aside>
          <aside className="md:w-4/12">
            <div className="p-6">
              <h3>Your Bill</h3>
              <div>
                <div className="flex flex-row items-center justify-between">
                  <label>Pizza Base</label>
                  <p>{bill.basePrice}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <label>Sauce</label>
                  <p>{bill.saucePrice}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <label>Cheese</label>
                  <p>{bill.cheesePrice}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <label>Veggies</label>
                  <p>{bill.veggiesPrice}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <label>NonVeg</label>
                  <p>{bill.nonVegPrice}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <label>Delivery Charge</label>
                  <p>{bill.deliveryCharge}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <label>Total Price</label>
                  <p>{bill.totalPrice}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
export default Order;
