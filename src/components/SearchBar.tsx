import "../styles/SearchBar.css";
import { useState, useEffect } from "react";
import searchIcon from "../assets/search.svg";

function SearchBar()
{
  const [value, setValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    sessionStorage.setItem("searchInputValue", e.target.value);
  }

  useEffect(() => {
    setValue(sessionStorage.getItem("searchInputValue") || '');
  }, []);

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search games..." value={value} onChange={handleChange}></input>
      <button id="search-button">
        <img id="search-icon" src={searchIcon} alt="search icon"></img>
      </button>
    </div>
  )
}

export default SearchBar;
