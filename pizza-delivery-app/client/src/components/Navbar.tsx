import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store/store";
import { addUserState } from "../redux/state/userSlice";
import { useGetUserQuery } from "../redux/api/apiServices";
import { useEffect } from "react";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { data } = useGetUserQuery({});

  useEffect(() => {
    if (data?.success) {
      dispatch(addUserState(data.data));
    }
  }, [data, dispatch]);

  return (
    <>
      <div className="flex justify-center md:h-20">
        <div className="flex items-center justify-between w-11/12 p-4 ">
          <div>
            <Link to={"/"}>
              <label className="text-2xl">Super Pizza</label>
            </Link>
          </div>

          {user.isVerified ? (
            <div className="flex gap-4">
              <p>{user.name}</p>
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
