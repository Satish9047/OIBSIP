import { UseFormRegisterReturn } from "react-hook-form";
import { IRecipe } from "../interface/app.interface";

interface SelectBtnProps {
  recipes: IRecipe[];
  register: UseFormRegisterReturn;
  errors?: string;
  defaultValue?: string;
}
const SelectBtn = ({
  recipes,
  register,
  errors,
  defaultValue,
}: SelectBtnProps) => {
  return (
    <div className="flex flex-col flex-wrap gap-3">
      <div className="flex flex-wrap gap-6">
        {recipes?.map((item) => (
          <div className="py-6" key={item._id}>
            <input
              id={item._id}
              {...register}
              type="radio"
              value={item._id}
              className="hidden peer"
              defaultChecked={defaultValue === item._id}
              disabled={defaultValue ? defaultValue !== item._id : undefined}
            />
            <label
              htmlFor={item._id}
              className={`w-1/6 h-20 p-6 rounded-lg shadow-xl text-lg text-center bg-orange-200 ${
                defaultValue === item._id ? "bg-orange-300" : ""
              } peer-checked:bg-orange-300`}
            >
              {item.name}
            </label>
          </div>
        ))}
      </div>
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};
export default SelectBtn;
