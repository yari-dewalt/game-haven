// @ts-nocheck

import "../styles/CheckoutModal.css";

function CheckoutModal({ isOpen, totalItems, totalPrice })
{
  if (!isOpen) return null;

  return (
    <div className="checkout-modal-background">
      <div className="checkout-modal">
        <h2>Checkout Successful!</h2>
        <div className="checkmark">✓</div>
        <p>{`You bought ${totalItems} item(s) for $${totalPrice.toFixed(2)}`}</p>
      </div>
    </div>
  )
}

export default CheckoutModal;
