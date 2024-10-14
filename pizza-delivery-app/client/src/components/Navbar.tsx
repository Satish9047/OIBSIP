import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <div className="flex justify-center ">
        <div className="flex items-center justify-between w-11/12 p-4 ">
          <div>
            <Link to={"/"}>
              <label className="text-2xl">Super Pizza</label>
            </Link>
          </div>
          {user ? (
            <div>
              <p>{user.email}</p>
            </div>
          ) : (
            <div className="flex-row hidden gap-4 md:flex">
              <Link to={"/sign-in"}>Sign In</Link>
              <Link to={"/sign-up"}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
