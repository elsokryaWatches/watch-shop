import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const Home = lazy(() => import("./components/Home/Home"));
const Wallets = lazy(() => import("./components/Wallets/Wallets"));
const Men = lazy(() => import("./components/Men/Men"));
const Women = lazy(() => import("./components/Women/Women"));
const Young = lazy(() => import("./components/Young/Young"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Shop = lazy(() => import("./components/Shop/Shop"));
const Gmt = lazy(() => import("./components/Gmt/Gmt"));
const Aquanaut = lazy(() => import("./components/Aquanaut/Aquanaut"));

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
        createRoute("wallets", <Wallets />),
        createRoute("men", <Men />),
        createRoute("women", <Women />),
        createRoute("young", <Young />),
        createRoute("contact", <Contact />),
        createRoute("shop", <Shop />),
        createRoute("gmt", <Gmt />),
        createRoute("aquanaut", <Aquanaut />),
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
