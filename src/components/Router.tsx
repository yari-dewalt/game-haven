import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import App from "../App";
import Store from "./Store";
import ErrorPage from "./ErrorPage";

function Router()
{
  const [searched, setSearched] = useState(false);
  const [clickedSearch, setClickedSearch] = useState(null);
  const [cartInfo, setCartInfo] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const storedCartInfo = localStorage.getItem("cart-info");
    if (storedCartInfo) {
      setCartInfo(JSON.parse(storedCartInfo));
    }
  }, [])

  function handleSearched(value) {
    setSearched(value);
  }

  function handleClickedSearch(value) {
    setClickedSearch(value);
  }

  function handleShowCart(value) {
    setShowCart(value);
  }

  function addToCart(game) {
    console.log(game);
    const updatedCartInfo = [...cartInfo, game];
    setCartInfo(updatedCartInfo);
    localStorage.setItem("cart-info", JSON.stringify(updatedCartInfo));
  }

  function deleteFromCart(game) {
    const updatedCartInfo = cartInfo.filter((item) => item != game);
    setCartInfo(updatedCartInfo);
    localStorage.setItem("cart-info", JSON.stringify(updatedCartInfo));
  }

  function clearCart() {
    setCartInfo([]);
    localStorage.setItem("cart-info", JSON.stringify([]));
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App
                handleSearched={handleSearched}
                cartInfo={cartInfo}
                showCart={showCart}
                handleShowCart={handleShowCart}
                deleteFromCart={deleteFromCart}
                clearCart={clearCart}
                handleClickedSearch={handleClickedSearch}
               />,
      errorElement: <ErrorPage/>,
    },
    {
      path: "store",
      element: <Store
                searched={searched}
                cartInfo={cartInfo}
                showCart={showCart}
                handleShowCart={handleShowCart}
                addToCart={addToCart}
                deleteFromCart={deleteFromCart}
                clearCart={clearCart}
                handleClickedSearch={handleClickedSearch}
                clickedSearch={clickedSearch}
               />,
    },
  ]);

  return <RouterProvider router={router}/>;
};

export default Router;
