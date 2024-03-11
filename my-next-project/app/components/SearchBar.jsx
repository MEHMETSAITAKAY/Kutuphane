import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);

    onSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch(searchTerm);
  };

  return (
    <form className="py-4" onSubmit={handleSubmit}>
    <input
      className="mt-4 mx-auto shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-200 ease-in-out"
      type="text"
      placeholder="Kitap Ara..."
      value={searchTerm}
      onChange={handleChange}
    />
</form>

  );
}

export default SearchBar;
