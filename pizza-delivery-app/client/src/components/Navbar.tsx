import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div>
        <div>
          <Link to={"/"}>Super Pizza</Link>
        </div>
        <div></div>
        <div>
          <Link to={"/sign-in"}>Sign In</Link>
          <Link to={"/sign-up"}>Sign Up</Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
