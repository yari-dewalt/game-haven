import "../styles/SearchBar.css";
import { useState, useEffect, useRef } from "react";
import uniqid from "uniqid";
import searchIcon from "../assets/search.svg";
import loadingIcon from "../assets/loading.svg";
import SearchBarResult from "./SearchBarResult";

function SearchBar({ navigate, handleStoreData, onStorePage })
{
  const [value, setValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialLoad = useRef(false);
  const API_KEY = "abd1d4cf1d5944b3903754265695d018";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    sessionStorage.setItem("searchInputValue", e.target.value);
  }

  useEffect(() => {
    setValue(sessionStorage.getItem("searchInputValue") || '');

    const storedSearchData = sessionStorage.getItem("searchData");
    if (storedSearchData)
      setSearchData(JSON.parse(storedSearchData));
    if (onStorePage) {
      handleStoreData(JSON.parse(storedSearchData));
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value && initialLoad.current) {
        console.log("searching " + value);
        search(value);
      }
      if (!value)
        setSearchData([]);
      initialLoad.current = true;
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [value]);

  async function search(searchValue: string) {
    setLoading(true);
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${searchValue}&search_exact=true&ordering=-added`);

    if (!response.ok)
      throw new Error("server error");

    const data = await response.json();
    setLoading(false);
    console.log(data.results);
    setSearchData(data.results);
    sessionStorage.setItem("searchData", JSON.stringify(data.results));
  }

  function handleEnterKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      if (searchData.length > 0) {
        if (onStorePage)
          handleStoreData(searchData);
        else
          navigate();
      }
    }
  }


  return (
    <div className="search-bar">
      <div className="search-area">
        <input type="text" placeholder="Search games..." value={value} onChange={handleChange} onKeyDown={handleEnterKeyPress}></input>
        <button id="search-button">
          <img id="search-icon" src={searchIcon} alt="search icon"></img>
        </button>
      </div>
      <div className="search-results">
        {!loading && searchData.map(data =>
          <SearchBarResult key={uniqid()} gameTitle={data.name} gameImage={data.background_image}/>
        )}
      </div>
      {loading && <div className="search-results loading">
        <img id="loading-icon" src={loadingIcon} alt="loading icon"></img>
      </div>}
    </div>
  )
}

export default SearchBar;
