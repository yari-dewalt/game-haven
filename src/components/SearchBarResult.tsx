// @ts-nocheck

import "../styles/SearchBarResult.css";

interface SearchBarResultProps {
  gameTitle: string;
  gameImage: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function SearchBarResult({ gameTitle, gameImage, onClick }: SearchBarResultProps): React.ReactElement
{
  return (

    <div className="search-bar-result" onClick={onClick}>
      <img className="search-bar-game-image" src={gameImage} onClick={onClick}></img>
      <h3 className="search-bar-game-title" onClick={onClick}>{gameTitle}</h3>
    </div>
  )
}

export default SearchBarResult;
