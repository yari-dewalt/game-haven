import "../styles/GamePreview.css";
import { useState, useEffect } from "react";
import ImageViewer from "./ImageViewer";

function GamePreview({ previewData, closeGamePreview })
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

  return (
    <div className="game-preview-background" onClick={closeGamePreview}>
      <div className="game-preview" onClick={handleGamePreviewClick}>
        <ImageViewer images={previewData.short_screenshots || [""]}/>
        <div className="side-info">
          <div className="game-details">
            <h2>Description</h2>
            <p>{gameDetails.description_raw || "Loading description..."}</p>
          </div>
          <button id="add-to-cart-button">{`+ Add to Cart (${previewData.price})`}</button>
        </div>
      </div>
    </div>
  )
}

export default GamePreview;
