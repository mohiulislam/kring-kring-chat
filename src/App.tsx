import RootLayout from "@/layout/RootLayout";
import Register from "@/pages/register/Register";
import SignIn from "@/pages/signin/SignIn";
import Welcome from "@/pages/welcome/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import OTPInput from "./pages/register/verify/Verify";
import Chat from "./pages/chat/Chat";
import MiniDrawer from "./pages/components/Drawer";

function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/chat",
          element: (
            <MiniDrawer>
              <Chat />
            </MiniDrawer>
          ),
        },
        {
          path: "/",
          element: <Welcome />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/register/verify",
          element: <OTPInput />,
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
