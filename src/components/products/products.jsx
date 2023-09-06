import React from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { additems } from "../../redux/dataSlice";

function Products() {
  const dispatch = useDispatch();
  const productItems = useSelector((state) => state.data.productItems);
  const handleAddToCart = (productItem) => {
    dispatch(additems(productItem));
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
                {/* {Array(Math.floor(productItem.rate))
                  .fill()
                  .map((_, i) => (
                    <p key={i}>⭐</p>
                  ))} */}
                {productItem.count}
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
