import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-center ">
        <div className="flex items-center justify-between w-11/12 p-4 ">
          <div>
            <Link to={"/"}>Super Pizza</Link>
          </div>
          <div>
            <p>Satish@gmail.com</p>
          </div>
          {/* <div className="flex-row hidden gap-4 md:flex">
          <Link to={"/sign-in"}>Sign In</Link>
          <Link to={"/sign-up"}>Sign Up</Link>
        </div> */}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
