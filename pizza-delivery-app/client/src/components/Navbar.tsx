import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user) {
      console.log("from navbar useEffect", user);
    }
  }, [user]);
  return (
    <>
      <div className="flex justify-center md:h-20">
        <div className="flex items-center justify-between w-11/12 p-4 ">
          <div>
            <Link to={"/"}>
              <label className="text-2xl">Super Pizza</label>
            </Link>
          </div>
          {user.email ? (
            <div>
              <p>{user.email}</p>
            </div>
          ) : (
            <div className="flex-row hidden gap-4 md:flex">
              <p>
                <Link to={"/sign-in"}>Sign In</Link>
              </p>
              <p>
                <Link to={"/sign-up"}>Sign Up</Link>
              </p>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Navbar;
