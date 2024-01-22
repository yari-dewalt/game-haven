import './App.css'
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import { useNavigate } from "react-router-dom";

function App({ handleSearched, cartInfo, showCart, handleShowCart, deleteFromCart, clearCart }) {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <NavBar navigate={() => navigate("/store")} handleSearched={handleSearched} handleShowCart={handleShowCart}/>
      {showCart && <Cart cartInfo={cartInfo} handleShowCart={handleShowCart} deleteFromCart={deleteFromCart} clearCart={clearCart}/>}
      <h1>Welcome to the home page!</h1>
      <a href="store">Store page</a>
    </div>
  )
}

export default App;
