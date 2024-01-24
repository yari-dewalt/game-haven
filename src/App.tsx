import './App.css'
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "./assets/background-video.mp4";

function App({ handleSearched, cartInfo, showCart, handleShowCart, deleteFromCart, clearCart, handleClickedSearch }) {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-page-content">
        <NavBar navigate={() => navigate("/store")} handleSearched={handleSearched} handleShowCart={handleShowCart} handleClickedSearch={handleClickedSearch}/>
        {showCart && <Cart cartInfo={cartInfo} handleShowCart={handleShowCart} deleteFromCart={deleteFromCart} clearCart={clearCart}/>}
        <h1>Welcome to the home page!</h1>
        <a href="store">Store page</a>
      </div>
      <video className="background-video" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4"></source>
      </video>
    </div>
  )
}

export default App;
