import SelectBtn from "../components/SelectBtn";
import { Button } from "../components/ui/button";
import { IPizzaRecipe, IRecipe } from "../interface/app.interface";
import { useGetAllRecipeQuery } from "../redux/api/apiServices";

function Order() {
  const { data } = useGetAllRecipeQuery({});
  if (!data || !data.data) {
    console.log("No data available");
    return (
      <div>
        <p>No data</p>
      </div>
    );
  }
  const { pizzaBase, sauce, cheese, veggies, nonVeg }: IPizzaRecipe = data.data;

  return (
    <div className="flex flex-col items-center  gap-5 md:w-11/12 min-h-[calc(100vh-5rem)] mx-auto p-4">
      <div className="w-full">
        <div>
          <h2 className="text-3xl font-bold">Make your Custom Pizza order</h2>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <aside className="md:w-8/12">
            <form action="" className="flex flex-col gap-4">
              <div>
                <label htmlFor="">Choose your desire Pizza Base</label>
                <SelectBtn recipes={pizzaBase as unknown as IRecipe[]} />
              </div>
              <div>
                <label htmlFor="">Choose your desire sauce</label>
                <SelectBtn recipes={sauce as unknown as IRecipe[]} />
              </div>
              <div>
                <label htmlFor="">Choose your desire cheese type</label>
                <SelectBtn recipes={cheese as unknown as IRecipe[]} />
              </div>
              <div>
                <label htmlFor="">Choose your desire Veggies</label>
                <SelectBtn recipes={veggies as unknown as IRecipe[]} />
              </div>
              <div>
                <label htmlFor="">Choose your desire NonVeg</label>
                <SelectBtn recipes={nonVeg as unknown as IRecipe[]} />
              </div>
              <div className="text-right">
                <Button className="bg-orange-500 rounded-md hover:bg-orange-600">
                  Make Order
                </Button>
              </div>
            </form>
          </aside>
          <aside className="md:w-4/12">
            <div>
              <h3>Your Bill</h3>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Order;
