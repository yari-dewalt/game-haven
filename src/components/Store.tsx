// @ts-nocheck

import { useState, useEffect, useRef } from "react";
import uniqid from "uniqid";
import "../styles/Store.css";
import NavBar from "./NavBar";
import StoreSideNavBar from "./StoreSideNavBar";
import GameCard from "./GameCard";
import GamePreview from "./GamePreview";
import Cart from "./Cart";
import SortBy from "./SortBy";
import loadingIcon from "../assets/loading.svg";

function Store({ searched, cartInfo, showCart, handleShowCart, addToCart, deleteFromCart, clearCart, clickedSearch, handleClickedSearch })
{
  const [storeData, setStoreData] = useState([]);
  const [currentSection, setCurrentSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGamePreview, setShowGamePreview] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  let searchedGame = useRef(null);

  useEffect(() => {
    // Create a MutationObserver
    const observer = new MutationObserver(() => {
      const foundElements = findElementsByText(clickedSearch);
      if (foundElements.length > 1) {
        searchedGame.current = foundElements[1];
        if (searchedGame.current) {
          searchedGame.current.click();
          handleClickedSearch("");
          // Disconnect the observer once the element is found and clicked
          observer.disconnect();
        }
      }
    });

    // Observe changes to the DOM
    observer.observe(document.body, { childList: true, subtree: true });

    searchedGame.current = findElementsByText(clickedSearch)[1];
    if (searchedGame.current) {
      searchedGame.current.click();
      handleClickedSearch("");
    }

    return () => {
      // Disconnect the observer when the component unmounts
      observer.disconnect();
    };
  }, [clickedSearch]);

  function findElementsByText(text: string) {
    let all = document.getElementsByTagName("*");
    let elements: Element[] = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].innerHTML == text) {
        elements.push(all[i]);
      }
    }

    return elements;
  }

  useEffect(() => {
    if (searched) {
      searchedGame.current = findElementsByText(clickedSearch)[1];
      if (searchedGame.current)
        searchedGame.current.click();
    }
  }, [searched]);

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

  function setSortedStoreData(data) {
    setStoreData(data);
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
    let price = "";
    if (e.currentTarget.className == "game-card-title") {
      price = e.currentTarget.parentElement.parentElement.children[1].children[0].children[1].children[0].textContent;
    } else {
      price = e.currentTarget.parentElement.children[1].children[0].children[1].children[0].textContent;
    }
    storeData.forEach(data => {
      if (data.id == e.currentTarget.parentElement.id || data.id == e.currentTarget.parentElement.parentElement.id) {
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
      <NavBar onEnter={handleStoreData} onStorePage={true} handleStoreData={handleStoreData} onSectionChange={handleSectionChange} handleShowCart={handleShowCart} handleClickedSearch={handleClickedSearch}/>
      {showCart && <Cart cartInfo={cartInfo} handleShowCart={handleShowCart} deleteFromCart={deleteFromCart} clearCart={clearCart}/>}
      {showGamePreview && <GamePreview previewData={previewData} closeGamePreview={closeGamePreview} cartInfo={cartInfo} addToCart={addToCart}/>}
      <div className="store">
        <StoreSideNavBar handleLoading={setLoading} onApiData={handleStoreData} onSectionChange={handleSectionChange} searched={searched}/>
        <div className="store-content">
          {!loading && 
          <div className="store-header">
            <h1 id="header-text" className="header">{currentSection}</h1>
            <SortBy storeData={storeData} setSortedStoreData={setSortedStoreData}/>
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
