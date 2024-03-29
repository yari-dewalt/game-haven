// @ts-nocheck

import "../styles/NavBar.css"
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";
import shoppingcart from "../assets/shopping_cart.svg";

function NavBar({ navigate, onStorePage, handleStoreData, onSectionChange, handleSearched, handleShowCart, handleClickedSearch, cartInfo })
{
  return (
    <nav className="nav-bar">
      <a className="game-haven" href="/">
        <img id="game-haven-logo" src={logo} alt="game haven logo"></img>
        <h2 id="game-haven-text">Game Haven</h2>
      </a>
      <SearchBar navigate={navigate} onStorePage={onStorePage} handleStoreData={handleStoreData} onSectionChange={onSectionChange} handleSearched={handleSearched} handleClickedSearch={handleClickedSearch}/>
      <button className="shopping-cart-button" onClick={() => handleShowCart(true)}>
        {(cartInfo.length > 0) && <div id="cart-num-items">{cartInfo.length}</div>}
        <img id="shopping-cart-icon" src={shoppingcart} alt="shopping cart icon"></img>
      </button>
    </nav>
  )
}

export default NavBar;
