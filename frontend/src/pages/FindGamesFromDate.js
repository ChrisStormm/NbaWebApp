import {useEffect, useState} from 'react'

//components
import GameDetails from '../components/GameDetails';


const FindGamesFromDate = () => {
    const [games, setGames] = useState(null)
    const [date, setDate] = useState("")
    const [error, setError] = useState(null)


    const handleSubmitDate = async (event) => {
        console.log("today: " + today)
        event.preventDefault()
        // console.log(submittedDate)
        console.log(date)
        const response = await fetch("http://localhost:4000/api/games/" + date)

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        } else {
            setError(null)
            console.log(json);
            setGames(json.response);
            console.log(games);
        }
    }

    const today = new Date().toISOString().slice(0, 10);


    return (
        <div className="home">
            <div className="dateForm">
                <form onSubmit={handleSubmitDate}>
                    <label htmlFor="date-picker">Select a date:</label>
                    <input
                        type="date"
                        id="date-picker"
                        onChange={(e)=> {
                            setDate(e.target.value);
                            // console.log(e.target.value);
                            // console.log(date);
                         }
                        }
                        value={date}
                        required
                        max={today}
                    />
                    <button type="submit">Find Games for this Day</button>
                </form>
            </div>


            {<div className="games">
                {games && games.map((game) => (
                    <GameDetails key = {game.id} game = {game}/>                
                ))}
            </div>}
        </div>
    )
}

export default FindGamesFromDate;