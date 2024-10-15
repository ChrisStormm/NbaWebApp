import { Link } from "react-router-dom";

const GameDetails = ({ game }) => {

    // Construct the link dynamically
    const linkUrl = `/games/game/${game.id}`;
    return (

        <Link to={linkUrl} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="game-details">
                <h4>{game.teams.visitors.name + " at " + game.teams.home.name}</h4>
                <img src={game.teams.visitors.logo} style={{ maxHeight: '200px', width: 'auto' }} alt={`${game.teams.visitors.name} logo`} />
                <img src={game.teams.home.logo} style={{ maxHeight: '200px', width: 'auto' }} alt={`${game.teams.home.name} logo`} />
            </div>
        </Link>
    )
  }
  
  export default GameDetails