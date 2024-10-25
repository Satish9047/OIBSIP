import { z } from "zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { newPasswordSchema } from "../schema/resetPasswordSchema";

type ResetPassword = z.infer<typeof newPasswordSchema>;
const ResetPassword = () => {
  const { userId, token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPassword>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (formData: ResetPassword) => {
    console.log(formData);
    console.log(userId, token);
    reset();
  };
  return (
    <div className=" w-11/12 min-h-[calc(100vh-5rem)] mx-auto p-4 flex items-center justify-center">
      <div className="flex items-center justify-center w-full max-w-3xl p-8 rounded-lg shadow-md">
        <form
          className="flex flex-col gap-4 md:w-8/12"
          onSubmit={handleSubmit(onSubmit)}
          max-w-3xl
        >
          <div>
            <h2>Create New Password</h2>
          </div>
          <div className="space-y-4">
            <div className="my-4">
              <label htmlFor="password">New Password</label>
              <Input
                type="password"
                {...register("password")}
                className="border-stone-300 focus:outline-none focus:border-orange-500"
              />
              {errors?.password && (
                <p className="text-red-500">{`${errors.password.message}`}</p>
              )}
            </div>
            <div className="my-4">
              <label htmlFor="confirm-password">New Password</label>
              <Input
                type="password"
                {...register("confirmPassword")}
                className="border-stone-300 focus:outline-none focus:border-orange-500"
              />
              {errors?.confirmPassword && (
                <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
              )}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="bg-orange-500 rounded-md hover:bg-orange-600"
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
