import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const Home = lazy(() => import("./components/Home/Home"));
const Men = lazy(() => import("./components/Men/Men"));
const Women = lazy(() => import("./components/Women/Women"));
const Young = lazy(() => import("./components/Young/Young"));
const Shop = lazy(() => import("./components/Shop/Shop"));
const Cart = lazy(() => import("./components/Cart/Cart"));

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
        createRoute("young", <Young />),
        createRoute("shop", <Shop />),
      ],
    },
    createRoute("cart", <Cart />),
  ]);
  return <RouterProvider router={routes} />;
}
