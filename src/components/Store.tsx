import { useState, useEffect } from "react";
import uniqid from "uniqid";
import "../styles/Store.css";
import NavBar from "./NavBar";
import StoreSideNavBar from "./StoreSideNavBar";
import GameCard from "./GameCard.tsx";
import GamePreview from "./GamePreview.tsx";
import Cart from "./Cart.tsx";
import loadingIcon from "../assets/loading.svg";

function Store({ searched, cartInfo, showCart, handleShowCart, addToCart, deleteFromCart, clearCart })
{
  const [storeData, setStoreData] = useState([]);
  const [currentSection, setCurrentSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGamePreview, setShowGamePreview] = useState(false);
  const [previewData, setPreviewData] = useState([]);

  function handleStoreData(data) {
    const updatedStoreData = data.map(gameData => {
      let discount: boolean;
      let originalPrice: string = generatePrice();
      let discountedPrice: string = generateDiscountedPrice(originalPrice);
      if (originalPrice == discountedPrice)
        discount = false;
      else
        discount = true;
      return { ...gameData, discount, originalPrice, discountedPrice };
    });

    setStoreData(updatedStoreData);
  }

  function handleSectionChange(section: string) {
    setCurrentSection(section);
  }

  function generatePrice() {
    let choice: number = Math.floor(Math.random() * 3);
    let price: string = "";
    switch (choice) {
      case 0:
        price = "$4.99";
        break;
      case 1:
        price = "$19.99";
        break;
      case 2:
        price = "$59.99";
        break;
    }
    return price;
  }

  function generateDiscountedPrice(originalPrice: string) {
    let randomChance = Math.floor(Math.random() * 10);

    if (randomChance < 1) {
      let choice: number = Math.floor(Math.random() * 4);
      let discountPercentage: number = 0;
      switch (choice) {
        case 0:
          discountPercentage = 0.25;
          break;
        case 1:
          discountPercentage = 0.50;
          break;
        case 2:
          discountPercentage = 0.75;
          break;
        case 3:
          discountPercentage = 0.90;
          break;
      }
      let discountedPrice = (parseFloat(originalPrice.slice(1)) * (1 - discountPercentage)).toFixed(2);
      return `$${discountedPrice}`
    }

    return originalPrice;
  }

  function previewGame(e) {
    console.log(e.currentTarget);
    let price = "";
    if (e.currentTarget.className == "game-card-title") {
      price = e.currentTarget.parentElement.parentElement.children[1].children[0].children[1].children[0].textContent;
      console.log(price);
    } else {
      price = e.currentTarget.parentElement.children[1].children[0].children[1].children[0].textContent;
    }
    storeData.forEach(data => {
      if (data.id == e.currentTarget.parentElement.id || data.id == e.currentTarget.parentElement.parentElement.id) {
        console.log(data);
        data.price = price;
        setPreviewData(data);
      }
    })
    setShowGamePreview(true);
  }

  function closeGamePreview(e) {
    setShowGamePreview(false);
  }

  return (
    <>
      <NavBar onEnter={handleStoreData} onStorePage={true} handleStoreData={handleStoreData} onSectionChange={handleSectionChange} handleShowCart={handleShowCart}/>
      {showCart && <Cart cartInfo={cartInfo} handleShowCart={handleShowCart} deleteFromCart={deleteFromCart} clearCart={clearCart}/>}
      {showGamePreview && <GamePreview previewData={previewData} closeGamePreview={closeGamePreview} cartInfo={cartInfo} addToCart={addToCart}/>}
      <div className="store">
        <StoreSideNavBar handleLoading={setLoading} onApiData={handleStoreData} onSectionChange={handleSectionChange} searched={searched}/>
        <div className="store-content">
          {!loading && 
          <div>
            <h1 id="header-text" className="header">{currentSection}</h1>
          </div>
          }
          {!loading && 
          <div className="games">
            {storeData.map(data =>
              <GameCard key={uniqid()} gameInfo={data} onClick={previewGame} cartInfo={cartInfo} addToCart={addToCart}/>
            )}
          </div>
          }
          {loading &&
          <div className="loading-content">
            <img src={loadingIcon} alt="loading icon"></img>
          </div>
          }
        </div>
      </div>
    </>
  )
}

export default Store;
