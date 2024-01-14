import './App.css'
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="home-page">
      <NavBar/>
      <h1>Welcome to the home page!</h1>
      <a href="store">Store page</a>
    </div>
  )
}

export default App;
