import React from 'react';

const SearchBar = ({ city, onCityChange, onSearchSubmit }) => {

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(event); 
  };
  

  return (
    <form onSubmit={handleFormSubmit} className="flex justify-center mb-6">
      <input
        className="form-input px-4 py-2 rounded w-1/2 border-2 border-gray-200"
        type="text"
        placeholder="Search for a city..."
        value={city} 
        onChange={onCityChange} 
      />
      <button 
        type="submit" 
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
