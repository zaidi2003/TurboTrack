import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, HomeLayout, Landing, Login, Logout, Register, BecomeAPartner, CustDash, NotFound, ChangePassword, Account } from "./pages";
import { ToastContainer, toast } from 'react-toastify';
import DashboardRoutes from "./routes/dashboardRoutes";
import Booking from "./pages/Booking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path : "change-password",
        element : <ChangePassword />,
      },
      {
        path : "account",
        element : <Account />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "become-a-partner",
        element: <BecomeAPartner />,
      },
      {
        path: "dashboard/*", 
        element: <DashboardRoutes />, 
      },
      {
        path: "cust-dash/*", 
        element: <CustDash />, 
      },
      {
        path: "bookings/*", 
        element: <Booking/>, 
      },
      {
        path: "*",
        element: <NotFound />,
      },
      
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
