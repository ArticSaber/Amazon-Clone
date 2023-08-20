// import React, { useState, useEffect } from "react";

// function adminForm() {
//   const [photo, setPhoto] = useState(null);
//   const [edit, setEdit] = useState(false);
//   const [Data, setData] = useState({
//     ProductID: "",
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//     image: "",
//     rating: "",
//   });

//   useEffect(() => {
//     if (photo) {
//       uploadImg();
//     }
//   }, [edit == false]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("file", photo);
//     setPhoto(null);
//     const response = await fetch("http://localhost:3500/api/v1/shoppingcart/admin", {
//       cache: "no-store",
//       credentials: "include",
//       method: "POST",
//       body: formData,
//     });
//     const { message, secure_url } = (await response.json()) || {};
//     if (secure_url) {
//       setData((prev) => ({
//         ...prev,
//         photo: secure_url,
//       }));
//     }
//     setEdit((prev) => !prev);
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <label>ID</label>
//         <input
//           placeholder="ProductID"
//           type="number"
//           name="ProductID"
//           value={FileData.ProductID}
//           onChange={handleInputChange}
//         />
//         <label>Title:</label>
//         <input
//           placeholder="title"
//           type="text"
//           name="title"
//           value={FileData.title}
//           onChange={handleInputChange}
//         />
//         <label>Description:</label>
//         <input
//           placeholder="description"
//           type="text"
//           name="description"
//           value={FileData.description}
//           onChange={handleInputChange}
//         />
//         <label>Price:</label>
//         <input
//           placeholder="price"
//           type="number"
//           name="price"
//           value={FileData.price}
//           onChange={handleInputChange}
//         />
//         <label>
//           Category:
//           <select
//             name="category"
//             value={FileData.category}
//             onChange={handleInputChange}
//           >
//             <option value="">Select a Category</option>
//             <option value="Electronics">Electronics</option>
//             <option value="Food & Beverages">Food & Beverages</option>
//             <option value="Toys">Toys</option>
//             <option value="Books">Books</option>
//           </select>
//         </label>
//         <label>rating:</label>
//         <input
//           placeholder="rating"
//           type="number"
//           name="rating"
//           value={FileData.rating}
//           onChange={handleInputChange}
//         />
//         <label>image</label>
//         {/* <input
//           type="file"
//           name="img"
//           id="img"
//           accept="image/png, image/jpeg, image/svg+xml, image/webp"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             setFormData((prev) => ({ ...prev, image: file }));
//           }}
//         /> */}

//         <input
//           type="file"
//           name="image" // Make sure this matches the field name in your backend
//           id="image"
//           accept="image/png, image/jpeg, image/svg+xml, image/webp"
//           onChange={(e) => setPhoto(e.target.files[0])}
//         />

//         <button type="submit">upload</button>
//       </form>
//     </div>
//   );
// }

// export default adminForm;
import React from 'react'

function adminForm() {
  return (
    <div>adminForm</div>
  )
}

export default adminForm