import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const Home = lazy(() => import("./components/Home/Home"));
const Men = lazy(() => import("./components/Men/Men"));
const Women = lazy(() => import("./components/Women/Women"));
const Skmei = lazy(() => import("./components/Skmei/Skmei"));
const Straps = lazy(() => import("./components/Straps/Straps"));
const Shop = lazy(() => import("./components/Shop/Shop"));
const Cart = lazy(() => import("./components/Cart/Cart"));
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
        createRoute("men", <Men />),
        createRoute("women", <Women />),
        createRoute("skmei", <Skmei />),
        createRoute("shop", <Shop />),
      ],
    },
    createRoute("cart", <Cart />),
    createRoute("straps", <Straps />),
    createRoute("signup", <SignUp />),
    createRoute("login", <LogIn />),
  ]);
  return <RouterProvider router={routes} />;
}
