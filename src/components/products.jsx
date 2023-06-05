import React, { useContext } from "react";
import "./Products.css";
import { DataContext } from "./DataProvider";

function Products() {
  const { handleAddProduct, productItems, dispatch } = useContext(DataContext);
  return (
    <div className="products">
      {productItems?.map((productItem) => (
        <div className="card" key={productItem.id}>
          <div className="product-text">
            <p className="product-title">{productItem.title}</p>
            <div className="product-price">
              <p>
                $<strong>{productItem.price}</strong>
              </p>
            </div>
            <div className="product-rating" key={productItem.id}>
              {Array(Math.floor(productItem.rating.rate))
                .fill()
                .map((_, i) => (
                  <p>⭐</p>
                ))}
            </div>
          </div>
          <img className="product-image" src={productItem.image} alt="" />
          <div className="button-layout">
            <button
              className="cartButton"
              onClick={() =>
                dispatch({ type: "addcart", payload: productItem })
              }
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
