import "../styles/CartGame.css";

function CartGame({ gameInfo, deleteFromCart })
{
  return (
    <div className="cart-game">
      <img className="cart-game-image" src={gameInfo.background_image}></img>
      <div className="cart-game-info">
        <h3 className="cart-game-title">{gameInfo.name}</h3>
        <p className="cart-game-price">{gameInfo.price || gameInfo.discountedPrice || gameInfo.originalPrice}</p>
      </div>
      <button className="remove-game-button" onClick={() => deleteFromCart(gameInfo)}>x</button>
    </div>
  )
}

export default CartGame;
