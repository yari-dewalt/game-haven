import './App.css'
import NavBar from "./components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App({ handleSearched }) {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <NavBar navigate={() => navigate("/store")} handleSearched={handleSearched}/>
      <h1>Welcome to the home page!</h1>
      <a href="store">Store page</a>
    </div>
  )
}

export default App;
