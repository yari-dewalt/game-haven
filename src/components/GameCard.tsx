import "../styles/GameCard.css";
import uniqid from "uniqid";
import playstation from "../assets/playstation.svg";
import xbox from "../assets/xbox.svg";
import windows from "../assets/windows.svg";
import mac from "../assets/mac.svg";
import nintendo_switch from "../assets/switch.svg";
import ios from "../assets/ios.svg";
import android from "../assets/android.svg";
import linux from "../assets/linux.svg";

function GameCard({ gameInfo })
{

  return (
    <div className="game-card">
      <img className="game-card-image" src={gameInfo.background_image}></img>
      <div className="game-card-info">
        <div className="purchase-info">
          <button className="add-to-cart-button">Add to cart +</button>
          <div className="prices">
            {gameInfo.discount && <p className="game-card-discounted-price">{gameInfo.discountedPrice}</p>}
            <p className="game-card-price" style={gameInfo.discount ? { textDecoration: "line-through"} : {}}>{gameInfo.originalPrice}</p>
          </div>
        </div>
        <div className="game-card-platforms">
          {gameInfo.parent_platforms && gameInfo.parent_platforms.map(platform => {
            if (platform.platform.name.includes("PC"))
              return <img key={uniqid()} className="windows logo" src={windows} alt="PC" draggable={false}></img>
            else if (platform.platform.name.includes("Apple"))
              return <img key={uniqid()} className="mac logo" src={mac} alt="Mac" draggable={false}></img>
            else if (platform.platform.name.includes("PlayStation"))
              return <img key={uniqid()} className="playstation logo" src={playstation} alt="PlayStation" draggable={false}></img>
            else if (platform.platform.name.includes("Xbox"))
              return <img key={uniqid()} className="xbox logo" src={xbox} alt="Xbox" draggable={false}></img>
            else if (platform.platform.name.includes("Nintendo"))
              return <img key={uniqid()} className="nintendo-switch logo" src={nintendo_switch} alt="Nintendo Switch" draggable={false}></img>
            else if (platform.platform.name.includes("iOS"))
              return <img key={uniqid()} className="ios logo" src={ios} alt="iOS" draggable={false}></img>
            else if (platform.platform.name.includes("Android"))
              return <img key={uniqid()} className="android logo" src={android} alt="Android" draggable={false}></img>
            else if (platform.platform.name.includes("Linux"))
              return <img key={uniqid()} className="linux logo" src={linux} alt="Linux" draggable={false}></img>
          }
          )}
        </div>
        <h3 className="game-card-title">{gameInfo.name}</h3>
      </div>
    </div>
  )
}

export default GameCard;
