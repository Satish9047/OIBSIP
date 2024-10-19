import { Button } from "../components/ui/button";

function Order() {
  return (
    <div className="flex flex-col items-center  gap-5 md:w-11/12 min-h-[calc(100vh-5rem)] mx-auto p-4">
      <div className="w-full">
        <div>
          <h2>Make your Custom Pizza order</h2>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <aside className="md:w-8/12">
            <form action="">
              <h3>Customize Your pizza</h3>
              <div>
                <label htmlFor="">Choose your desire Pizza Base</label>
                <div>
                  <label>NewYork Style </label>
                  <label>California Style</label>
                  <label>Italian Style</label>
                  <label>Plain</label>
                  <label>Greek Style</label>
                </div>
              </div>
              <div>
                <label htmlFor="">Choose your desire sauce</label>
                <div>
                  <label htmlFor="">A Sauce</label>
                  <label htmlFor="">B Sauce</label>
                  <label htmlFor="">C Sauce</label>
                  <label htmlFor="">D Sauce</label>
                  <label htmlFor="">E Sauce</label>
                </div>
              </div>
              <div>
                <label htmlFor="">Choose your desire cheese type</label>
                <div>
                  <label htmlFor="">Goat Cheese</label>
                  <label htmlFor="">A Cheese</label>
                  <label htmlFor="">B Cheese</label>
                  <label htmlFor="">c Cheese</label>
                  <label htmlFor="">D Cheese</label>
                </div>
              </div>
              <div>
                <label htmlFor="">Choose your desire Veggies</label>
                <div>
                  <label htmlFor="">Mushroom</label>
                  <label htmlFor="">Paneer</label>
                  <label htmlFor="">Cauliflower</label>
                  <label htmlFor="">Chilli Peeper</label>
                  <label htmlFor="">Green Chilli</label>
                </div>
              </div>
              <div>
                <label htmlFor="">Choose your desire NonVeg</label>
                <div>
                  <label htmlFor="">Bacon</label>
                  <label htmlFor="">Sausage</label>
                </div>
              </div>
              <div className="text-right">
                <Button className="bg-orange-500 rounded-md  hover:bg-orange-600">
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
