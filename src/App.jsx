import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const Home = lazy(() => import("./components/Home/Home"));
const Skmei = lazy(() => import("./components/Skmei/Skmei"));
const MiniFocus = lazy(() => import("./components/MiniFocus/MiniFocus"));
const Straps = lazy(() => import("./components/Straps/Straps"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const CartCheck = lazy(() => import("./components/CartCheck/CartCheck"));
const SignUp = lazy(() => import("./components/Sign_Up/Sign_Up"));
const LogIn = lazy(() => import("./components/Log_In/Log_In"));

const createRoute = (path, element) => ({
  path,
  element: <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>,
});

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        createRoute("", <Home />),
        createRoute("skmei", <Skmei />),
        createRoute("minifocus", <MiniFocus />),
      ],
    },
    createRoute("cart", <Cart />),
    createRoute("cartcheck", <CartCheck />),
    createRoute("straps", <Straps />),
    createRoute("signup", <SignUp />),
    createRoute("login", <LogIn />),
  ]);
  return <RouterProvider router={routes} />;
}
