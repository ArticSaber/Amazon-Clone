import React, { useContext } from "react";
import "./Checkout.css";
import Navbar from "../navbar/Navbar";
import { DataContext } from "../context/DataProvider";
import { toast } from "react-toastify";

function Checkout() {
  const { state, handleAddProduct, handleRemoveProduct, handleCheckout } =
    useContext(DataContext);
  const cartItems = state.cartItems;
  const totalPrice =
    cartItems.length > 0
      ? cartItems.reduce((price, item) => price + item.quantity * item.price, 0)
      : 0;

  return (
    <>
      <Navbar />
      <div className="checkout">
        <div className="checkout-left">
          <img
            className="checkoutAd"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt="Checkout Ad"
          />
          <div>
            <h2 className="checkout-title">Your Shopping Basket</h2>
          </div>
        </div>
        {state.cartItems.length === 0 && (
          <div className="empty-cart">
            <img src="/assets/emptyCart.png" alt="Empty Cart" />
          </div>
        )}
        {cartItems.map((item) => (
          <div className="main-container" key={item.id}>
            <div className="cart-items-list">
              <div className="cart-items-name">
                {item.title}
                <div className="star-rating">
                  <div className="product-rating">
                    {Array(Math.floor(item.rating.rate))
                      .fill()
                      .map((_, i) => (
                        <p key={i}>⭐</p>
                      ))}
                  </div>
                </div>
              </div>
              <img className="image" src={item.image} alt={item.title} />
            </div>
            <div className="checkout-right">
              <div className="subtotal">
                <div className="button-div">
                  <button
                    className="cart-items-add"
                    onClick={() => handleAddProduct(item)}
                  >
                    +
                  </button>
                  <div className="cart-items-price">
                    {item.quantity} * ${item.price.toFixed(2)}
                  </div>
                  <button
                    className="cart-items-remove"
                    onClick={() => handleRemoveProduct(item)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="total-price-name">
          Total price:
          <div className="total-price">₹{totalPrice.toFixed(2)}</div>
        </div>
        <button
          className="button"
          style={{ cursor: "pointer" }}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
}

export default Checkout;
