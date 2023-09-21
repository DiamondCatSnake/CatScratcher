// import React, { useState } from 'react';
// import { api } from '../utils/api';
// import './AddCategory.css'; 
// import addNewCategory from '../reducers/categorySlice';


// export default function AddCategory() {
//   const [categoryName, setCategoryName] = useState('');
//   // categorySlicer?

//   const handleSubmit = async () => {
//     try {
//       const data = await api.createCategory({ category: categoryName });
//       console.log(data);
//       console.log("HANDLED CATEGORY SUBMIT");
//     } catch (error) {
//       console.error('Error adding category:', error);
//     }
//   };

//   return (
//     <div className="add-category-container">
//       <input
//         value={categoryName}
//         onChange={(e) => setCategoryName(e.target.value)}
//         // placeholder='Category Name'
//         // className="add-category-input"
//       />
//       <button onClick={handleSubmit}>Add Category</button>
//     </div>
//   );
// }
