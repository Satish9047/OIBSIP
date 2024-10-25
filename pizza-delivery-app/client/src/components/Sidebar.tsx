import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";

import { removeUserState } from "../redux/state/userSlice";
import { useEffect } from "react";
import { useSignOutMutation } from "../redux/api/apiServices";
import { RootState } from "../store/store";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [signOut] = useSignOutMutation();

  useEffect(() => {
    if (!user.isVerified) {
      navigate("/sign-in");
    }
  }, [navigate, user]);

  const handleSignOut = async () => {
    try {
      const res = await signOut({}).unwrap();
      console.log("from sidebar", res);
      dispatch(removeUserState());
      localStorage.removeItem("persist:root");
      navigate("/sign-in");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };
  return (
    <main className="flex flex-col md:flex-row w-11/12 min-h-[calc(100vh-5rem)] mx-auto p-4">
      <div className="flex flex-row w-full min-h-screen gap-6">
        <aside className="md:w-2/12">
          <div className="flex flex-col gap-6">
            <div>
              <h3>Panel</h3>
            </div>
            <div>
              <Link to={"/user/dashboard"}>Dashboard</Link>
            </div>
            <div>
              <Link to={"/user/profile"}>Profile</Link>
            </div>
            <div>
              <Link to={"/user/your-orders"}>Your Orders</Link>
            </div>
            <div>
              <Link to={"/user/order"}>Custom Order</Link>
            </div>
            {user.role === "admin" && (
              <div className="flex flex-col gap-6">
                <div>
                  <Link to={"/admin/view-orders"}>Orders</Link>
                </div>
                <div>
                  <Link to={"/admin/inventory"}>Inventory</Link>
                </div>
              </div>
            )}
            <div>
              <Link to={"/sign-in"} onClick={handleSignOut}>
                Sign Out
              </Link>
            </div>
          </div>
        </aside>
        <aside className="md:w-10/12">
          <Outlet />
        </aside>
      </div>
    </main>
  );
};

export default Sidebar;
