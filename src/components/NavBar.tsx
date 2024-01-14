import "../styles/NavBar.css"
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";
import shoppingcart from "../assets/shopping_cart.svg";

function NavBar()
{
  return (
    <nav className="nav-bar">
      <div className="game-haven">
        <img id="game-haven-logo" src={logo} alt="game haven logo"></img>
        <h2 id="game-haven-text">Game Haven</h2>
      </div>
      <SearchBar/>
      <button className="shopping-cart-button">
        <img id="shopping-cart-icon" src={shoppingcart} alt="shopping cart icon"></img>
      </button>
    </nav>
  )
}

export default NavBar;
