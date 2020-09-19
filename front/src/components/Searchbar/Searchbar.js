import React from 'react';
import { RiSearchLine as SearchIcon } from 'react-icons/ri';

import './Searchbar.css';

const Searchbar = ({ searchTerm, handleChange }) => {
  return (
    <div className="wrap">
      <div className="search">
        <input
          onChange={handleChange} 
          type="text"
          className="searchTerm" 
          placeholder="Ingresa tu búsqueda"
          name="term"
          value={searchTerm}
          maxLength="50" 
        />
        <button type="button" className="searchButton" disabled>
          <SearchIcon size="1.3rem" color="white" className="mb-1"/>
        </button>
      </div>
    </div>
  );
}
 
export default Searchbar;