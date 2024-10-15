import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUserState } from "../redux/state/userSlice";
import { AppDispatch, RootState } from "../store/store";
import { useGetMeQuery } from "../redux/apiServices";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const { data: userData } = useGetMeQuery({});
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.success) {
      console.log("from navbar useEffect", userData);
      dispatch(addUserState(userData.data));
    } else {
      navigate("/sign-in");
    }
  }, [userData, dispatch, navigate]);
  return (
    <>
      <div className="flex justify-center md:h-20">
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
