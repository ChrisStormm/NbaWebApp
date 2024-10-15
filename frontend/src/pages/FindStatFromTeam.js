import {useEffect} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';


const FindStat = () => {
    const {teams, dispatch} = useTeamsContext()

    useEffect(()=> {
        const fetchTeams = async() => {
            const response = await fetch("http://localhost:4000/api/teams")
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_TEAMS', payload: json})
            }
        }
        fetchTeams() // making this function so it can be async and use await
    }, [dispatch]) //empty dependency array


    return (
        <div className="home">
            <div className="teams">
                {teams && workouts.map((workout) => (
                    <WorkoutDetails key = {workout._id} workout = {workout}/>                
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default FindStat;