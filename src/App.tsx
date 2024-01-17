import './App.css'
import NavBar from "./components/NavBar";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <NavBar navigate={() => navigate("/store")}/>
      <h1>Welcome to the home page!</h1>
      <a href="store">Store page</a>
    </div>
  )
}

export default App;
