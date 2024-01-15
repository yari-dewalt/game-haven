import "../styles/SearchBarResult.css";

interface SearchBarResultProps {
  gameTitle: string;
  gameImage: string;
}

function SearchBarResult({ gameTitle, gameImage}: SearchBarResultProps): React.ReactElement
{
  return (
    <div className="search-bar-result">
      <img className="search-bar-game-image" src={gameImage}></img>
      <h3 className="search-bar-game-title">{gameTitle}</h3>
    </div>
  )
}

export default SearchBarResult;
