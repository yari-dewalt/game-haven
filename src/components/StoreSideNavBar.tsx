import { useEffect, useRef } from "react";
import "../styles/StoreSideNavBar.css";
import crownIcon from "../assets/crown.svg";
import fireIcon from "../assets/fire.svg";
import starIcon from "../assets/star.svg";
import trendingIcon from "../assets/trending.svg";
import trophyIcon from "../assets/trophy.svg";
import fireworksIcon from "../assets/fireworks.svg";

function StoreSideNavBar({ handleLoading, onApiData, onSectionChange, searched })
{
  const featuredRef = useRef(null);

  useEffect(() => {
    if (!searched) {
      if (featuredRef.current) {
        featuredRef.current.click();
      }
    }
    else {
      resetSelection();
    }
  }, [searched]);

  useEffect(() => {
    if (document.getElementById("header-text")) {
      if (document.getElementById("header-text").textContent.includes("Search")) {
        resetSelection();
      }
    }
  }, [onSectionChange])
  
  const API_KEY = "abd1d4cf1d5944b3903754265695d018";

  async function fetchData(e, requestParams: string) {
    handleLoading(true);
    setAsSelected(e);
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}${requestParams}&exclude_additions=true`);

    if (!response.ok)
      throw new Error("server error");

    const data = await response.json();
    console.log(data.results);
    onApiData(data.results);
    onSectionChange(e.target.textContent);
    handleLoading(false);
  }

  function setAsSelected(e) {
    Array.from(e.currentTarget.offsetParent.children).forEach(child => {
      Array.from(child.children).forEach(secondChild => {
        if (secondChild.className.includes("selected")) {
          secondChild.className = "nav-bar-item";
        }
      });
    });
    e.currentTarget.className += " selected";
  }

  function resetSelection() {
    // Reset selection for all nav-bar items
    const navBarItems = document.querySelectorAll(".nav-bar-item");
    navBarItems.forEach(item => {
      item.className = "nav-bar-item";
    });
  }

  async function fetchTopAllTime(e) {
    fetchData(e, "&ordering=-added");
  }

  async function fetchFeatured(e) {
    fetchData(e, "&ordering=-updated");
  }

  async function fetchPopular2023(e) {
    fetchData(e, "&dates=2023-01-01,2023-12-31&ordering=-added");
  }

  async function fetchBestOfYear(e) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    fetchData(e, `&dates=2024-01-01,${formattedDate}&ordering=-added`);
  }

  async function fetchLast30Days(e) {
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);
    const formattedPastDate = `${oneMonthAgo.getFullYear()}-${(oneMonthAgo.getMonth() + 1).toString().padStart(2, '0')}-${oneMonthAgo.getDate().toString().padStart(2, '0')}`;
    const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    fetchData(e, `&dates=${formattedPastDate},${formattedCurrentDate}&ordering=-added`);
  }

  async function fetchLastWeek(e) {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const formattedPastDate = `${oneWeekAgo.getFullYear()}-${(oneWeekAgo.getMonth() + 1).toString().padStart(2, '0')}-${oneWeekAgo.getDate().toString().padStart(2, '0')}`;
    const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    fetchData(e, `&dates=${formattedPastDate},${formattedCurrentDate}&ordering=-added`);
  }

  return (
    <nav className="side-nav-bar">
      <div className="top-list">
        <div className="list-header">
          <h2>Top</h2>
        </div>
      <div className="nav-bar-item" onClick={fetchFeatured} ref={featuredRef}>
        <img id="fireworks-icon" src={fireworksIcon} alt="featured icon"></img>
        <h3>Featured</h3>
      </div>
        <div className="nav-bar-item" onClick={fetchBestOfYear}>
          <img src={trophyIcon} alt="trophy icon"></img>
          <h3>Best of the year</h3>
        </div>
        <div className="nav-bar-item" onClick={fetchPopular2023}>
          <img src={trendingIcon} alt="trending icon"></img>
          <h3>Popular in 2023</h3>
        </div>
        <div className="nav-bar-item" onClick={fetchTopAllTime}>
          <img src={crownIcon} alt="crown icon"></img>
          <h3>All time top</h3>
        </div>
      </div>
      <div className="new-releases">
        <div className="list-header">
          <h2>New Releases</h2>
        </div>
        <div className="nav-bar-item" onClick={fetchLast30Days}>
          <img src={starIcon} alt="star icon"></img>
          <h3>Last 30 days</h3>
        </div>
        <div className="nav-bar-item" onClick={fetchLastWeek}>
          <img src={fireIcon} alt="fire icon"></img>
          <h3>This week</h3>
        </div>
      </div>
    </nav>
  )
}

export default StoreSideNavBar;
