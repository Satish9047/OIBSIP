import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../schema/signInSchema";
import { useSignInMutation } from "../redux/api/apiServices";
import { ISignIn } from "../interface/app.interface";
import { addUserState } from "../redux/state/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignIn>({ resolver: zodResolver(signInSchema) });
  const [signIn, { isLoading }] = useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (formData: ISignIn) => {
    console.log(formData);
    try {
      const signInResponse = await signIn(formData).unwrap();
      console.log("Sign Up successful:", signInResponse);
      if (signInResponse.success && signInResponse.data) {
        dispatch(addUserState(signInResponse.data));
        navigate("/");
      }
      if ("status" in signInResponse && signInResponse.status === 403) {
        navigate("/validate");
      }
      toast.success(signInResponse.message);
    } catch (error: unknown) {
      console.error("Sign In failed:", error);
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        error.status === 403
      ) {
        console.log("going to verifyUser");
        navigate("/validate");
      }

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
          <h1 className="text-3xl font-bold">Sign In Into Super Pizza</h1>
          <ToastContainer />
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
            <div className="space-y-4 md:w-1/2">
              <div className="my-4">
                <label className="text-sm font-medium text-stone-600">
                  Email
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  className="border-stone-300 focus:outline-none focus:border-orange-500"
                />
                {errors?.email && (
                  <p className="text-red-500">{`${errors.email.message}`}</p>
                )}
              </div>
              <div className="my-4">
                <label className="text-sm font-medium text-stone-600">
                  Password
                </label>
                <Input
                  type="password"
                  {...register("password")}
                  className="border-stone-300 focus:outline-none focus:border-orange-500"
                />
                {errors?.password && (
                  <p className="text-red-500">{`${errors.password.message}`}</p>
                )}
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
                <Button
                  type="submit"
                  className="bg-orange-500 rounded-md hover:bg-orange-600 "
                >
                  {isLoading ? "Loading..." : "Sign In"}
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
