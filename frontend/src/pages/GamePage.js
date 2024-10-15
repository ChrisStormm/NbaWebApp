import {useEffect, useState} from 'react'

//components
import PlayerDetails from '../components/PlayerDetails';
import { useParams } from 'react-router-dom';


const GamePage = () => {

    const [chosenPlayer, setChosenPlayer] = useState(null)
    const {gameID} = useParams();
    const [error, setError] = useState(null)
    const [players, setPlayers] = useState(null)
    const [chosenPlayerSGR, setChosenPlayerSGR] = useState(0)

    useEffect(() => {
        async function fetchData() {
            console.log('Component mounted!');
            // You can run any startup code here
            const response = await fetch("http://localhost:4000/api/games/game/"+ gameID)
            const json = await response.json()
            if(!response.ok) {
                setError(json.error)
            } else {
                setError(null)
                console.log(json);
                setPlayers(json.response);
                console.log("PLAYERS" + players);
            }
        }
        fetchData()
    }, []); // The empty array causes this effect to only run on mount

    const handleChoosePlayer = async (player) => {
        // could just handle this locally instead
        setChosenPlayer(player)
        const url = "http://localhost:4000/api/games/getSGRFromPlayer";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player) // Send data as JSON string
        });
        const json = await response.json()
        if(!response.ok) {
            setError(json.error)
        } else {
            setError(null)
            console.log(json);
            setChosenPlayerSGR(json.sgr);
        }
    }

    const today = new Date().toISOString().slice(0, 10);


    return (
        <div className="game">
            <div className="gameDisplay">
                <p>This rendered</p>
                {<div className="players">
                    {players && players.map((player) => (
                        <div>
                            <PlayerDetails key = {player.player.id} firstName = {player.player.firstname} lastName = {player.player.lastname}/>
                            <button onClick = {() => handleChoosePlayer(player)}> Get SGR for {player.player.firstname}</button>
                        </div>               
                    ))}
                </div>}

                {<div className="chosenPlayer">
                    {chosenPlayerSGR && <p> {chosenPlayer.player.firstname} had a SGR of {chosenPlayerSGR} for this game! </p>}
                </div>}
                {}
            </div>
        </div>
    )
}

export default GamePage;