import { UseFormRegisterReturn } from "react-hook-form";
import { IRecipe } from "../interface/app.interface";

interface SelectBtnProps {
  recipes: IRecipe[];
  register: UseFormRegisterReturn;
  errors?: string;
}
const SelectBtn = ({ recipes, register, errors }: SelectBtnProps) => {
  return (
    <div className="flex flex-wrap gap-6">
      {recipes?.map((item) => (
        <div className="py-6" key={item._id}>
          <input
            id={item._id}
            {...register}
            type="radio"
            value={item._id}
            className="hidden peer"
          />
          <label
            htmlFor={item._id}
            className="w-1/6 h-20 p-6 text-lg text-center bg-orange-200 peer-checked:bg-orange-500"
          >
            {item.name}
          </label>
        </div>
      ))}
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};
export default SelectBtn;
