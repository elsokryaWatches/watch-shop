import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const Home = lazy(() => import("./components/Home/Home"));
const Shop = lazy(() => import("./components/Shop/Shop"));
const Skmei = lazy(() => import("./components/Skmei/Skmei"));
const IBSO = lazy(() => import("./components/IBSO/IBSO"));
const MiniFocus = lazy(() => import("./components/MiniFocus/MiniFocus"));
const Straps = lazy(() => import("./components/Straps/Straps"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const CartCheck = lazy(() => import("./components/CartCheck/CartCheck"));
const ProdDetails = lazy(() => import("./components/ProdDetails/ProdDetails"));
const Admin = lazy(() => import("./components/Admin/Admin"));
const Login = lazy(() => import("./components/log_in/Log_in"));

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
        createRoute("shop", <Shop />),
        createRoute("skmei", <Skmei />),
        createRoute("minifocus", <MiniFocus />),
        createRoute("ibso", <IBSO />),
        createRoute("straps", <Straps />),
      ],
    },
    createRoute("cart", <Cart />),
    createRoute("cartcheck", <CartCheck />),
    createRoute("/product_details/:code", <ProdDetails />),
    createRoute(
      "admin",
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
    createRoute("login", <Login />),
  ]);
  return <RouterProvider router={routes} />;
}
