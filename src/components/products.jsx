import React from "react";
import "./Products.css";

function Products({ title, image, price, rating }) {
  const addToCart = () => {
    const [state, dispatch] = useStateValue();
    dispatch({
      type: "ADD_TO_Basket",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product-main">
      <div className="product-info">
        <p>{title}</p>
        <div className="product-price">
          <p>
            &#8377;
            <strong>{price}</strong>
          </p>
        </div>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default Products;
