import React, { useState } from "react";
import { BASE_URL } from "../../../config";

const AdminForm = () => {
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: null,
    rating: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", productData.image);
    console.log(formData, productData);
    // try {
      await fetch(`${BASE_URL}/products/upload`, {
        method: "POST",
        body: productData.image,
      });
    //   if (!response.ok) {
    //     throw new Error("Failed to create product");
    //   }
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={productData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Category:
        <select
          name="category"
          value={productData.category}
          onChange={handleInputChange}
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Food & Beverages">Food & Beverages</option>
          <option value="Toys">Toys</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
        </select>
      </label>
      <label>
        Stock:
        <input
          type="number"
          name="stock"
          value={productData.stock}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Image:
        <input type="file" name="image" onChange={handleImageChange} />
      </label>
      <label>
        Rating:
        <input
          type="number"
          name="rating"
          value={productData.rating}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default AdminForm;
