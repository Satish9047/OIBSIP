import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useGetAllRecipeQuery } from "../redux/api/apiServices";
import { PopularPizza } from "../interface/app.interface";
import { useState } from "react";
import { Input } from "../components/ui/input";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data } = useGetAllRecipeQuery();

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    pizzaTypeA: 0,
    pizzaTypeB: 0,
    pizzaTypeC: 0,
  });

  const popularPizza = [
    {
      name: "Grilled Mushroom and Bacon Pizza",
      base: {
        id: data?.data?.pizzaBase[0]._id,
        name: data?.data?.pizzaBase[0].name,
      },
      sauce: {
        id: data?.data?.sauce[0]._id,
        name: data?.data?.sauce[0].name,
      },
      cheese: {
        id: data?.data?.cheese[0]._id,
        name: data?.data?.cheese[0].name,
      },
      veggies: {
        id: data?.data?.veggies[0]._id,
        name: data?.data?.veggies[0].name,
      },
      nonVeg: {
        id: data?.data?.nonVeg[0]._id,
        name: data?.data?.nonVeg[0].name,
      },
    },
    {
      name: "Mixed Sausage With Onion Pizza",
      base: {
        id: data?.data?.pizzaBase[1]._id,
        name: data?.data?.pizzaBase[1].name,
      },
      sauce: {
        id: data?.data?.sauce[1]._id,
        name: data?.data?.sauce[1].name,
      },
      cheese: {
        id: data?.data?.cheese[2]._id,
        name: data?.data?.cheese[2].name,
      },
      veggies: {
        id: data?.data?.veggies[1]._id,
        name: data?.data?.veggies[1].name,
      },
      nonVeg: {
        id: data?.data?.nonVeg[1]._id,
        name: data?.data?.nonVeg[1].name,
      },
    },
    {
      name: "Spicy sauce with Mushroom and Bacon Pizza",
      base: {
        id: data?.data?.pizzaBase[3]._id,
        name: data?.data?.pizzaBase[3].name,
      },
      sauce: {
        id: data?.data?.sauce[4]._id,
        name: data?.data?.sauce[4].name,
      },
      cheese: {
        id: data?.data?.cheese[3]._id,
        name: data?.data?.cheese[3].name,
      },
      veggies: {
        id: data?.data?.veggies[0]._id,
        name: data?.data?.veggies[0].name,
      },
      nonVeg: {
        id: data?.data?.nonVeg[0]._id,
        name: data?.data?.nonVeg[0].name,
      },
    },
  ];

  const handleQuantityChange = (name: string, value: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [name]: value,
    }));
  };

  const handleOrderClick = (pizza: PopularPizza) => {
    navigate("/user/order", {
      state: { ...pizza, quantity: quantities[pizza.name] },
    });
  };

  return (
    <main className="p-4">
      <div className="space-y-8">
        <div>
          <h2>Our Most Loved Pizza</h2>
        </div>
        <div className="space-y-10">
          {popularPizza.map((pizza) => (
            <div
              key={pizza.name}
              className="flex flex-row items-center justify-between px-6 py-4 shadow-xl rounded-2xl bg-zinc-100"
            >
              <div className="flex flex-row items-center gap-4">
                <figure>
                  <img
                    src="/images/pizza1.png"
                    alt="pizza image"
                    width={200}
                    height={200}
                  />
                </figure>
                <div>
                  <h3>{pizza.name}</h3>
                  <p className="max-w-sm">
                    {`Pizza with ${pizza.base.name}, ${pizza.sauce.name}, ${pizza.cheese.name}, ${pizza.veggies.name} and ${pizza.nonVeg.name}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-8">
                <div>
                  <Input
                    type="number"
                    value={quantities[pizza.name] || 1}
                    onChange={(e) =>
                      handleQuantityChange(pizza.name, Number(e.target.value))
                    }
                    min={0}
                    max={50}
                    className="text-xl"
                  />
                </div>
                <Button
                  className="bg-orange-300 rounded-md hover:bg-orange-400"
                  onClick={() => handleOrderClick(pizza as PopularPizza)}
                >
                  Order now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default Dashboard;
