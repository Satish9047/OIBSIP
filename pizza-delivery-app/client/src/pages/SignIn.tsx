import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="w-full max-w-3xl p-8 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Sign In Into Super Pizza</h1>
        </div>
        <form className="space-y-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="md:w-1/2">
              <figure>
                <img
                  src="/images/pizza1.png"
                  alt="pizza"
                  className="w-10/12 mx-auto md:w-full"
                />
              </figure>
            </div>
            <div className="space-y-4 md:w-1/2">
              <div className="my-4">
                <label className="text-sm font-medium text-stone-600">
                  Email
                </label>
                <Input
                  type="email"
                  className="border-stone-300 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="my-4">
                <label className="text-sm font-medium text-stone-600">
                  Password
                </label>
                <Input
                  type="password"
                  className="border-stone-300 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="flex justify-between mt-6">
                <p>
                  Go to{" "}
                  <Link
                    to={"/sign-up"}
                    className="text-blue-600 hover:font-bold"
                  >
                    Sign Up
                  </Link>
                </p>
                <Button className="bg-orange-500 rounded-md hover:bg-orange-600 ">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
