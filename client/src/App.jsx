import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  HomeLayout,
  Landing,
  Login,
  Logout,
  Register,
  BecomeAPartner,
  Test,
  NotFound,
  Game,
  Chat,
  Account,
  Booking,
  SheetBooking,
  PaymentPage, 
  Analytics,
  CurrentSession,
  ForgotPassword,
  EmployeeAddTrack,
  EmployeeDashboard
} from "./pages";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardRoutes from "./routes/dashboardRoutes";
import { UserProvider } from "./context/UserContext";

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
        path: "game",
        element: <Game />,
      },
      {
        path: "account",
        element: <Account />,
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
        path: "test",
        element: <Test />,
      },
      {
        path: "bookings", 
        element: <Booking />,
      },
      {
        path: "bookings/sheet/:trackName",
        element: <SheetBooking />,
      },
      {
        path: "bookings/sheet/:trackName/checkout", 
        element: <PaymentPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      { 
        path: "chat", 
        element: <Chat /> 
      }, 
      {
        path : "analytics",
        element: <Analytics />
      },
      {
        path : "resetpassword",
        element: <ForgotPassword />
      },
      {
        path: "current-session",
        element: <CurrentSession />
      },
      {
        path: "add-track",
        element: <EmployeeAddTrack />
      },
      {
        path: "employee-dashboard",
        element: <EmployeeDashboard />,
      }
      
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </UserProvider>
  );
}

export default App;