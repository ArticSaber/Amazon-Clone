// import React, { useState, createContext, useEffect } from "react";
// export const UserContext = createContext();

// function Userprovider({ children }) {
//   const [Id, setId] = useState("");
//   const [title, setTitle] = useState("");
//   const [Price, setPrice] = useState("");
//   const [Image, setImage] = useState("");
//   const [Rating, setRating] = useState("");

// //   const handleSession = async () => {
// //     const { data, error } = await supabase.auth.getSession();
// //     setUser(data.session.user.id);
// //     // console.log(data, error);
// //   };

//   useEffect(() => {
//     handleSession();
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         Id,
//         setId,
//         title,
//         setTitle,
//         Image,
//         setImage,
//         Price,
//         setPrice,
//         Rating,
//         setRating,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// export default Userprovider;
