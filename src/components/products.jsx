import React, { useContext } from "react";
import "./Products.css";
import { DataContext } from "./DataProvider";

function Products() {
  const { handleAddProduct, productItems } = useContext(DataContext);
  return (
    <div className="products">
      {productItems.map((productItems) => (
        <div className="card">
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
          <img className="product-image" src={productItems.image} alt="" />
          <div className="button">
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
// function Products({ id, title, image, price, rating }) {
// const { setdispatch } = useContext(DataContext);
// const addToCart = () => {
//   setdispatch({
//     type: "ADD_TO_CART",
//     payload: {
//       id: id,
//       title: title,
//       image: image,
//       price: price,
//       rating: rating,
//     },
//   });
// };

export default Products;
