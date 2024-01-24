// @ts-nocheck

import './App.css'
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "./assets/background-video.mp4";
import githubIcon from "./assets/github.svg";

function App({ handleSearched, cartInfo, showCart, handleShowCart, deleteFromCart, clearCart, handleClickedSearch }) {
  const navigate = useNavigate();

  return (
    <>
    <div className="home-page">
      <NavBar navigate={() => navigate("/game-haven/store")} handleSearched={handleSearched} handleShowCart={handleShowCart} handleClickedSearch={handleClickedSearch}/>
      {showCart && <Cart cartInfo={cartInfo} handleShowCart={handleShowCart} deleteFromCart={deleteFromCart} clearCart={clearCart}/>}
      <div className="home-page-content">
        <div className="welcome">
          <h1>Game Haven</h1>
          <p>An imitation of a real online game store.</p>
          <a className="github-redir" href="https://github.com/yari-dewalt">
              <img src={githubIcon} alt="github icon"></img>
              <p>yari-dewalt</p>
          </a>
        </div>
        <a className="to-store" href="/game-haven/store">To Store →</a>
      </div>
    </div>
    <video className="background-video" autoPlay loop muted>
      <source src={backgroundVideo} type="video/mp4"></source>
    </video>
    </>
  )
}

export default App;
