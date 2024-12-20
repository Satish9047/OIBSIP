import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Landing = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-col md:flex-row w-11/12 min-h-[calc(100vh-5rem)] mx-auto p-4">
      {/* <div className="flex flex-col justify-center gap-20 md:flex-row"> */}
      <aside className="flex flex-col order-2 w-full md:w-1/2 md:order-1">
        <div className="flex flex-col justify-center gap-20 translate-y-36">
          <div className="">
            <h1 className="font-semibold text-7xl">Welcome to Super Pizza</h1>
          </div>
          <div className="space-y-10">
            <div>
              <p>
                Online Pizza shop for Pizza lovers.1 Customize your pizza with
                different ingredient. Get different pizza in different moods.
                Quick order, lighting Delivery, Taste the World Best, Pay easy.
              </p>
            </div>
            <div>
              <Button className="bg-orange-500 rounded-md hover:bg-orange-600">
                {user.isVerified ? (
                  <Link to={"/user/order"}>Order Pizza</Link>
                ) : (
                  <Link to={"/sign-in"}>Sign In for Order</Link>
                )}
              </Button>
            </div>
            s
          </div>
        </div>
      </aside>
      <aside className="flex items-center order-1 w-full md:w-1/2 md:order-2">
        <figure className="relative ">
          <img
            src="/images/pizza1.png"
            alt="pizza"
            className="w-10/12 mx-auto"
          />
        </figure>
      </aside>
      {/* </div> */}
    </div>
  );
};

export default Landing;
