import React, { useState } from 'react';
import './AssignEndUser.css';
import { toast } from 'react-toastify';

function AssignEndUser() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNextClick = () => {
    toast(`Selected category: ${selectedCategory}`, { type: 'info' });
  };

  const handleAddCategoryClick = () => {
    toast('Add new category feature coming soon!', { type: 'info' });
  };

  return (
    <div className="assign-end-user">
      <h3>Assign End User:</h3>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        <option value="Electrician">Electrician</option>
        <option value="Carpenter">Carpenter</option>
        <option value="Plumber">Plumber</option>
        <option value="Others">Others</option>
      </select>
      <div className="buttons">
        <button className="next-btn" onClick={handleNextClick}>Next</button>
        <button className="add-category-btn" onClick={handleAddCategoryClick}>Add new Category</button>
      </div>
    </div>
  );
}

export default AssignEndUser;
