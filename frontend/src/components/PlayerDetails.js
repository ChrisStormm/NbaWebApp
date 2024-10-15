import { Link } from "react-router-dom";

const PlayerDetails = ({ firstName, lastName }) => {

    // Construct the link dynamically
    return (
        <div className="playerDetails">
            <h4> {firstName + " " + lastName}</h4>
        </div>
    )
  }
  
  export default PlayerDetails;