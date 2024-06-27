import RootLayout from "@/layout/RootLayout";
import Register from "@/pages/register/Register";
import SignIn from "@/pages/signin/SignIn";
import Welcome from "@/pages/welcome/Welcome";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import OTPInput from "./pages/register/verify/Verify";
import Chat from "./pages/chat/Chat";
import MiniDrawer from "./pages/components/Drawer";
import { useAuthStore } from "./store/store";

function App() {
  const userAuthInfo = useAuthStore((state) => state?.userAuthInfo);
  console.log(userAuthInfo);

  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/chat",
          element: userAuthInfo ? (
            <MiniDrawer>
              <Chat />
            </MiniDrawer>
          ) : (
            <Navigate to="/signin" replace />
          ),
        },
        {
          path: "/",
          element: userAuthInfo ? <Navigate to="/chat" replace /> : <Welcome />,
        },
        {
          path: "/signin",
          element: userAuthInfo ? <Navigate to="/chat" replace /> : <SignIn />,
        },
        {
          path: "/register",
          element: userAuthInfo ? <Navigate to="/chat" replace /> : <Register />,
        },
        {
          path: "/register/verify",
          element: userAuthInfo ? <Navigate to="/chat" replace /> : <OTPInput />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;