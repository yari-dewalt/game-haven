// @ts-nocheck

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import App from "../App";
import Store from "./Store";
import ErrorPage from "./ErrorPage";
import "../styles/Router.css";

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
      element: (
        <CSSTransition key="/" timeout={300} classNames="fade">
          <App
            handleSearched={handleSearched}
            cartInfo={cartInfo}
            showCart={showCart}
            handleShowCart={handleShowCart}
            deleteFromCart={deleteFromCart}
            clearCart={clearCart}
            handleClickedSearch={handleClickedSearch}
          />
        </CSSTransition>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/store",
      element: (
        <CSSTransition key="/store" timeout={300} classNames="fade">
          <Store
            searched={searched}
            cartInfo={cartInfo}
            showCart={showCart}
            handleShowCart={handleShowCart}
            addToCart={addToCart}
            deleteFromCart={deleteFromCart}
            clearCart={clearCart}
            handleClickedSearch={handleClickedSearch}
            clickedSearch={clickedSearch}
          />
        </CSSTransition>
      ),
    },
  ]);

  return (
    <RouterProvider router={router}>
      <TransitionGroup className="transition-group">
        {router.routeResults}
      </TransitionGroup>
    </RouterProvider>
  );
};

export default Router;
