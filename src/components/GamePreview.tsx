import "../styles/GamePreview.css";
import { useState, useEffect } from "react";
import ImageViewer from "./ImageViewer";

function GamePreview({ previewData, closeGamePreview, cartInfo, addToCart })
{
  const [gameDetails, setGameDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const API_KEY = "abd1d4cf1d5944b3903754265695d018";

  function handleGamePreviewClick(e) {
    e.stopPropagation();
  }

  async function fetchGameDetails(gameId) {
    setLoading(true);
    const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);

    if (!response.ok)
      throw new Error("server error");

    const data = await response.json();
    setLoading(false);
    setGameDetails(data);
    console.log(data);
  }

  useEffect(() => {
    fetchGameDetails(previewData.id);
  }, [])

  const isGameInCart = cartInfo.some((item) => item.id == gameDetails.id);

  return (
    <div className="game-preview-background" onClick={closeGamePreview}>
      <div className="game-preview" onClick={handleGamePreviewClick}>
        <ImageViewer images={previewData.short_screenshots || [""]}/>
        <div className="preview-side">
          <h1>{previewData.name}</h1>
          <div className="side-info">
            <div className="game-details">
              <h2>Description</h2>
              <p>{gameDetails.description_raw || gameDetails.description || "Loading description..."}</p>
            </div>
            {isGameInCart
              ? <button id="already-in-cart-button">✓ Added to Cart</button>
              : <button id="add-to-cart-button" onClick={() => {if (gameDetails.description_raw || gameDetails.description) {addToCart(previewData)}}}>{`+ Add to Cart (${previewData.price})`}</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePreview;
