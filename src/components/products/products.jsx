import React, { useContext } from "react";
import "./Products.css";
import { DataContext } from "../context/DataProvider";

function Products() {
  const { dispatch, state } = useContext(DataContext);
  const { productItems } = state;

  const handleAddToCart = (product) => {
    dispatch({ type: "addcart", product });
  };

  return (
    <div className="products">
      {productItems &&
        productItems.map((productItem) => (
          <div className="card" key={productItem.id}>
            <div className="product-text">
              <p className="product-title">{productItem.title}</p>
              <div className="product-price">
                <p>
                  $<strong>{productItem.price}</strong>
                </p>
              </div>
              <div className="product-rating">
                {Array(Math.floor(productItem.rating.rate))
                  .fill()
                  .map((_, i) => (
                    <p key={i}>⭐</p>
                  ))}
              </div>
            </div>
            <img className="product-image" src={productItem.image} alt="" />
            <div className="button-layout">
              <button
                className="cartButton"
                onClick={() => handleAddToCart(productItem)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Products;
