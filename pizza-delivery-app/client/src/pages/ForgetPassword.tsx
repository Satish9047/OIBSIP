import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { IResponse } from "../interface/app.interface";
import { resetPasswordSchema } from "../schema/resetPasswordSchema";
import { useForgetPasswordMutation } from "../redux/api/apiServices";

type ForgetPassword = z.infer<typeof resetPasswordSchema>;
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgetPasswordRequest, { isLoading }] = useForgetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (formData: ForgetPassword) => {
    try {
      const { data } = await forgetPasswordRequest(formData);

      if (data?.success === true) {
        navigate("/sign-in");
      }
    } catch (error) {
      toast.error((error as IResponse).message);
      console.error(error);
    } finally {
      reset();
    }
  };
  return (
    <div className=" w-11/12 min-h-[calc(100vh-5rem)] mx-auto p-4 flex items-center justify-center">
      <div className="flex items-center justify-center w-full max-w-3xl p-8 rounded-lg shadow-md">
        <form
          className="flex flex-col gap-4 md:w-8/12"
          onSubmit={handleSubmit(onSubmit)}
          max-w-3xl
        >
          <ToastContainer />
          <div>
            <h2>Forget Password</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p>
                Enter your email address to send link for creating new password
              </p>
            </div>
            <div className="my-4">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                {...register("email")}
                className="border-stone-300 focus:outline-none focus:border-orange-500"
              />
              {errors?.email && (
                <p className="text-red-500">{`${errors.email.message}`}</p>
              )}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="bg-orange-500 rounded-md hover:bg-orange-600"
            >
              {isLoading ? "Loading ..." : "Reset Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
