import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
const { useState } = require("react")

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = {title, load, reps}
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            dispatch({type: "CREATE_WORKOUT", payload: json})
            console.log('new workout added', json);
        }
    }

    return (
        <form action="" className="create" onSubmit={handleSubmit}>
            <h3>Lets make a new workout for your lazy ass</h3>
            <label> Title of ur lazy workout: </label>
            <input 
                type="text"
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title')? 'error' : ''}//makes the boxes red if empty by making the class error
             />

            <label> Whatever pussy weight you're lifting </label>
            <input 
                type="number"
                onChange={(e)=>setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('reps')? 'error' : ''}
             />

            <label> How few of reps can your shrimp body handle? </label>
            <input 
                type="number"
                onChange={(e)=>setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('number')? 'error' : ''}
            />
            
            <button>Add this so you can pretend like you'll do it</button>
            {error && <div className = "error">{error}</div>}
        </form>
    )
}

export default WorkoutForm