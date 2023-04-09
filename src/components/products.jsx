import React, { useContext } from "react";
import "./Products.css";
import { DataContext } from "./DataProvider";

function Products() {
  const { handleAddProduct, productItems } = useContext(DataContext);
  return (
    <div className="products" key={productItems.id}>
      {productItems.map((productItems) => (
        <div className="card">
          <div className="product-text">
            <p className="product-title">{productItems.title}</p>
            <div className="product-price">
              <p>
                &#8377;
                <strong>{productItems.price}</strong>
              </p>
            </div>
            <div className="product-rating">
              {Array(productItems.rating)
                .fill()
                .map((_, i) => (
                  <p>⭐</p>
                ))}
            </div>
          </div>
          <img className="product-image" src={productItems.image} alt="" />
          <div className="button-layout">
            <button
              className="cartButton"
              onClick={() => handleAddProduct(productItems)}
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
