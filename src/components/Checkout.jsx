import React, { useContext, useEffect } from "react";
import "./Checkout.css";
import Header from "./Header";
import { DataContext } from "./DataProvider";

function Checkout() {
  const { handleAddProduct, handleRemoveProduct, cartItems } =
    useContext(DataContext);
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );
  return (
    <>
      <Header />
      <div className="checkout">
        <div className="checkout-left">
          <img
            className="checkoutAd"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          />
          <div>
            <h2 className="checkout-title">Your Shopping Basket</h2>
          </div>
        </div>
        {cartItems.length === 0 && (
          <>
            <img src="/assets/emptyCart.png" />
          </>
        )}
        {cartItems.map((item) => (
          <div className="main-container">
            <div key={item.id} className="cart-items-list">
              <div className="cart-items-name">
                {item.title}
                <div className="star-rating">
                  <div className="product-rating">
                    {Array(item.rating)
                      .fill()
                      .map((_, i) => (
                        <p>⭐</p>
                      ))}
                  </div>
                </div>
              </div>

              <img className="image" src={item.image} />
            </div>
            <div className="checkout-right">
              <div className="subtotal">
                <div className="cart-items-price">
                  {item.quantity} *₹{item.price}
                </div>
                <div className="button-div">
                  <button
                    className="cart-items-add"
                    onClick={() => handleAddProduct(item)}
                  >
                    +
                  </button>
                  <button
                    className="cart-items-remove"
                    onClick={() => handleRemoveProduct(item)}
                  >
                    -
                  </button>
                </div>
                <div className="total-price-name">
                  Total price:
                  <div className="total-price">₹{totalPrice}</div>
                </div>
                <button style={{ cursor: "pointer" }}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Checkout;
