import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Pizza from "./pages/Pizza";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Validate from "./pages/Validate";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import YourOrder from "./pages/YourOrder";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/forgot-password" element={<ForgetPassword />}></Route>
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="user" element={<Sidebar />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="profile" element={<Profile />}></Route>

          <Route path="order" element={<Order />}></Route>
          <Route path="your-orders" element={<YourOrder />}></Route>
          <Route path="pizza" element={<Pizza />}></Route>
          <Route path="admin" element={<Admin />}></Route>
        </Route>
      </Route>
      <Route path="sign-in" element={<SignIn />}></Route>
      <Route path="sign-up" element={<SignUp />}></Route>
      <Route path="validate" element={<Validate />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
