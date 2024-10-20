import { IRecipe } from "../interface/app.interface";

interface SelectBtnProps {
  recipes: IRecipe[];
}
const SelectBtn = ({ recipes }: SelectBtnProps) => {
  return (
    <select className="flex flex-wrap gap-6">
      {recipes?.map((item) => (
        <option
          key={item._id}
          className="w-1/6 h-20 p-6 text-lg text-center bg-orange-400 "
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};
export default SelectBtn;
