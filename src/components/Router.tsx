import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Store from "./Store";
import ErrorPage from "./ErrorPage";

function Router()
{
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      errorElement: <ErrorPage/>,
    },
    {
      path: "store",
      element: <Store/>,
    },
  ]);

  return <RouterProvider router={router}/>;
};

export default Router;
