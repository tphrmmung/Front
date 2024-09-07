import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../layout/LoginForm";
import userAuth from "../hooks/userAuth";
import RegisterForm from "../layout/RegisterForm";
import Header from "../layout/Header";
import UserHome from "../layout/UserHome";
import Product from '../layout/Product';
import NewTodoForm from "../layout/NewTodoForm";
import Product_details from "../layout/Product_details";
import Booking_details from "../layout/Booking_details";
import Customer_information from"../layout/Customer_information";
import Reservation from "../layout/Reservation";
import Payment from "../layout/payment";
import Recipt from "../layout/recipt";
import Check_information from"../layout/Check_information";
import Payment_user from "../layout/payment_user";
import Recipt_user from "../layout/recipt_uset";
import Receipt_Front from "../layout/Receipt_Front";
import ContactForm from "../layout/ContactForm";
import Adminhome from "../layout/AdminHome";
import ReservationForm_user from "../layout/ReservationForm_user";
import WaittingPayment from "../layout/WaittingPayment";

const guesRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />

        <Outlet />
      </>
    ),
    
    children: [
      { index: true, element: <UserHome /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/home", element: <UserHome /> }, 
      { path: "/login", element: <LoginForm /> },
      { path: "/product", element: <Product /> },
      { path: "/Product_details", element: <Product_details/> },
      { path: "/Customer_information",element:<Customer_information/>},
      { path:"/recipt_user",element:<Recipt_user/>},
      {path:"/payment_user/*",element:<Payment_user/>},
    ],
  },
]);
const userRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <hr />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHome/> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/home", element: <UserHome /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/product", element: <Product /> },
      { path: "/WaittingPayment", element: <WaittingPayment /> },
      { path: "/Product_details", element: <Product_details/> },
      { path: "/Booking_details/*", element: <Booking_details/> },
      { path: "/Customer_information",element:<Customer_information/>},
      { path: "/Reservation",element:<Reservation/>},
      { path:"/NewTodoForm",element:<NewTodoForm/>},
      { path:"/payment",element:<Payment/>},
      { path:"/recipt",element:<Recipt/>},
      { path:"/check",element:<Check_information/>},
      {path:"/payment_user/*",element:<Payment_user/>},
      { path:"/recipt_user",element:<Recipt_user/>},
      { path: "*", element: <p>Error 404</p>},
      { path:"/receipt/*",element:<Receipt_Front />},
      { path:"/ContactForm",element:<ContactForm />},
      { path:"/ReservationForm_user",element:<ReservationForm_user/>},
    
    
    
    ],
  },    
]);
const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <hr />
        <Outlet />
      </>
    ),
    
    children: [
      { index: true, element: <Adminhome /> },
      { path: "/Product_details", element: <Product_details/> },
      { path: "/adminhome", element: <Adminhome /> },
      { path:"/NewTodoForm",element:<NewTodoForm/>},
      { path:"/payment",element:<Payment/>},
      { path:"/recipt",element:<Recipt/>},
      { path: "/Customer_information",element:<Customer_information/>},
      { path: "/Reservation",element:<Reservation/>},
     

    ],
  },
]);
export default function AppRouter() {
  const { user } = userAuth();
  const finalRouter = user?.user_id ? user.role ==="ADMIN"? adminRouter : userRouter : guesRouter;
  return <RouterProvider router={finalRouter} />;
}
