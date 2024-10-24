import { Link, Outlet } from "react-router-dom";
const Sidebar = () => {
  return (
    <main className="flex flex-col md:flex-row w-11/12 min-h-[calc(100vh-5rem)] mx-auto p-4">
      <div className="flex flex-row w-full min-h-screen gap-6">
        <aside className="md:w-2/12">
          <div className="flex flex-col gap-6">
            <div>
              <h3>Panel</h3>
            </div>
            <div>
              <Link to={"/dashboard"}>Dashboard</Link>
            </div>
            <div>
              <Link to={"/user/profile"}>Profile</Link>
            </div>
            <div>
              <Link to={"/user/order"}>Custom Order</Link>
            </div>
            <div>
              <Link to={"/sign-out"}>Sign Out</Link>
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
