import { useState, useEffect, useRef } from "react";
import "../styles/SortBy.css";
import expandIcon from "../assets/expand.svg";

function SortBy({ storeData, setSortedStoreData })
{
  const [currentSort, setCurrentSort] = useState("Popularity");
  const [showOptions, setShowOptions] = useState(false);
  const sortByRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortByRef.current && !sortByRef.current.contains(event.target)) {
        // Clicked outside the SortBy component, close options
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [sortByRef]);

  function sortByPopularity() {
    const sortedStoreData = [...storeData].sort((a, b) => (a.added > b.added) ? -1 : ((b.added > a.added) ? 1 : 0))
    setSortedStoreData(sortedStoreData);
    setCurrentSort("Popularity");
    setShowOptions(!showOptions);
  }

  function sortByReleaseDateDown() {
    const sortedStoreData = [...storeData].sort((a, b) => (a.released > b.released) ? 1 : ((b.released > a.released) ? -1 : 0))
    setSortedStoreData(sortedStoreData);
    setCurrentSort("Release Date ↓");
    setShowOptions(!showOptions);
  }

  function sortByReleaseDateUp() {
    const sortedStoreData = [...storeData].sort((a, b) => (a.released > b.released) ? -1 : ((b.released > a.released) ? 1 : 0))
    setSortedStoreData(sortedStoreData);
    setCurrentSort("Release Date ↑");
    setShowOptions(!showOptions);
  }

  function sortByNameAtoZ() {
    const sortedStoreData = [...storeData].sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    setSortedStoreData(sortedStoreData);
    setCurrentSort("Name (A-Z)");
    setShowOptions(!showOptions);
  }

  function sortByNameZtoA() {
    const sortedStoreData = [...storeData].sort((a, b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0))
    setSortedStoreData(sortedStoreData);
    setCurrentSort("Name (Z-A)");
    setShowOptions(!showOptions);
  }

  function sortByRating() {
    const sortedStoreData = [...storeData].sort((a, b) => (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0))
    setSortedStoreData(sortedStoreData);
    setCurrentSort("Rating");
    setShowOptions(!showOptions);
  }

  function toggleShowOptions() {
    setShowOptions(!showOptions);
  }

  return (
    <div className="sort-by" ref={sortByRef} onClick={toggleShowOptions}>
      <p>Sort By:</p>
      <button>{currentSort}</button>
      <img id="expand-icon" src={expandIcon}></img>
      <div className={`sort-options ${showOptions ? '' : "hidden"}`}>
        <button className={`sort-option ${(currentSort == "Popularity") ? "selected" : ''}`} onClick={sortByPopularity}>Popularity</button>
        <button className={`sort-option ${(currentSort == "Release Date ↓") ? "selected" : ''}`}onClick={sortByReleaseDateDown}>Release Date ↓</button>
        <button className={`sort-option ${(currentSort == "Release Date ↑") ? "selected" : ''}`}onClick={sortByReleaseDateUp}>Release Date ↑</button>
        <button className={`sort-option ${(currentSort == "Name (A-Z)") ? "selected" : ''}`}onClick={sortByNameAtoZ}>Name (A-Z)</button>
        <button className={`sort-option ${(currentSort == "Name (Z-A)") ? "selected" : ''}`}onClick={sortByNameZtoA}>Name (Z-A)</button>
        <button className={`sort-option ${(currentSort == "Rating") ? "selected" : ''}`}onClick={sortByRating}>Rating</button>
      </div>
    </div>
  )
}

export default SortBy;
