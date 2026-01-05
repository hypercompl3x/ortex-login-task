import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login, { loginAction } from "@/routes/Login";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
    action: loginAction,
  },
  {
    path: "/*",
    loader: () => {
      throw redirect("/login");
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
