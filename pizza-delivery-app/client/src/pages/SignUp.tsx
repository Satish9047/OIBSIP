import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ISignUp } from "../interface/app.interface";
import { signUpSchema } from "../schema/signUpSchema";
import { useSignUpMutation } from "../redux/apiServices";

const SignUp = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (data: ISignUp) => {
    try {
      const signUpResponse = await signUp(data).unwrap();
      console.log("Sign Up successful:", signUpResponse);
      toast.success(signUpResponse.message);
      if (signUpResponse.success) {
        navigate("/validate");
      }
    } catch (error: unknown) {
      console.error("Sign Up failed:", error);

      if (typeof error === "object" && error !== null && "message" in error) {
        toast.error((error as { message: string }).message);
      } else {
        toast.error("An unknown error occurred");
      }
      reset();
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="w-full max-w-3xl p-8 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Sign Up For Super Pizza</h1>
          <div>
            <ToastContainer />
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
            <div className="space-y-2 md:w-1/2">
              <div className="my-4">
                <label className="text-sm font-medium text-stone-600">
                  Name
                </label>
                <Input
                  type="text"
                  {...register("name")}
                  className=" border-stone-300 focus:outline-none focus:border-orange-500"
                />
                {errors?.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <div className="my-4">
                  <label className="text-sm font-medium text-stone-600">
                    Email
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    className=" border-stone-300 focus:outline-none focus:border-orange-500"
                  />
                  {errors?.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="my-4">
                  <label className="text-sm font-medium text-stone-600">
                    Phone
                  </label>
                  <Input
                    type="number"
                    {...register("phone")}
                    className=" border-stone-300 focus:outline-none focus:border-orange-500"
                  />
                  {errors?.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="my-4">
                  <label className="text-sm font-medium text-stone-600">
                    Address
                  </label>
                  <Input
                    type="text"
                    {...register("address")}
                    className=" border-stone-300 focus:outline-none focus:border-orange-500"
                  />
                  {errors?.address && (
                    <p className="text-red-500">{errors.address.message}</p>
                  )}
                </div>
                <div className="my-4">
                  <label className="text-sm font-medium text-stone-600">
                    Password
                  </label>
                  <Input
                    type="password"
                    {...register("password")}
                    className=" border-stone-300 focus:outline-none focus:border-orange-500"
                  />
                  {errors?.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex justify-between mt-6">
                  <p>
                    Go to{" "}
                    <Link
                      to={"/sign-in"}
                      className="text-blue-600 hover:font-bold"
                    >
                      Sign In
                    </Link>
                  </p>
                  <Button
                    type="submit"
                    className="bg-orange-500 rounded-md hover:bg-orange-600"
                  >
                    {isLoading ? "Loading ..." : "Sign Up"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};
export default SignUp;

// const errorMessage =
//   apiError &&
//   "data" in apiError &&
//   typeof apiError.data === "object" &&
//   apiError.data == null &&
//   "message" in apiError
//     ? (apiError.message as string)
//     : null;
