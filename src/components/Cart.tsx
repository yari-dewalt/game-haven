import "../styles/Cart.css";
import CartGame from "./CartGame";
import CheckoutModal from "./CheckoutModal";
import { useState } from "react";

function Cart({ cartInfo, handleShowCart, deleteFromCart, clearCart })
{
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCartClick(e) {
    e.stopPropagation();
  }

  const total = cartInfo.reduce((acc, game) => {
    if (game.price != undefined) {
      return acc + parseFloat(game.price.replace('$', ''));
    } else if (game.discountedPrice != undefined) {
      return acc + parseFloat(game.discountedPrice.replace('$', ''));
    } else if (game.originalPrice != undefined) {
      return acc + parseFloat(game.originalPrice.replace('$', ''));
    }

    return acc;
  }, 0);

  function handleCheckout() {
    setIsModalOpen(true);

    const closeTimeout = setTimeout(() => {
      closeModal();
      handleShowCart(false);
    }, 3000);

  }

  function closeModal() {
    setIsModalOpen(false);
    clearCart();
  }

  return (
    <>
      {!isModalOpen && (
        <div className="cart-background" onClick={() => handleShowCart(false)}>
          <div className="cart" onClick={handleCartClick}>
            <div className="cart-header">
              <h2>{`${cartInfo.length} Games`}</h2>
              <button id="clear-cart-button" onClick={clearCart}>Clear</button>
            </div>
            <div className="cart-games">
              {cartInfo.map(game =>
                <CartGame gameInfo={game} deleteFromCart={deleteFromCart}/>
              )}
            </div>
            <div className="cart-footer">
              <h3 id="cart-total">{`$${total.toFixed(2)}`}</h3>
              {(cartInfo.length > 0) && <button id="cart-checkout-button" onClick={handleCheckout}>Checkout</button>}
            </div>
          </div>
        </div>
      )}
      <CheckoutModal
        isOpen={isModalOpen}
        totalItems={cartInfo.length}
        totalPrice={total}
       />
   </>
  )
}

export default Cart;
