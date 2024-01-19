import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import App from "../App";
import Store from "./Store";
import ErrorPage from "./ErrorPage";

function Router()
{
  const [searched, setSearched] = useState(false);

  function handleSearched(value) {
    setSearched(value);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App handleSearched={handleSearched}/>,
      errorElement: <ErrorPage/>,
    },
    {
      path: "store",
      element: <Store searched={searched}/>,
    },
  ]);

  return <RouterProvider router={router}/>;
};

export default Router;
