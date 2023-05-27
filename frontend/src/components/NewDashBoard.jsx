import { useState } from 'react'
//new import
import { useBoardsContext } from '../hooks/useBoardsContext'
const NewDashBoard = () => {//this new

const { dispatch } = useBoardsContext()

  const [title, setTitle] = useState('')
  const [interestedjobs, setLoad] = useState('')
  const [applied, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, interestedjobs, applied}
    
    const response = await fetch('/api/JobAppSteps', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      dispatch({type: 'CREATE_BOARD', payload: json})
      //console.log('new workout added:', json)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Dashboard</h3>

      <label>Dashboard Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
         className={emptyFields.includes('title') ? 'error' : ''}
       
      />

      <label>Interested Jobs:</label>
      <input 
        type="text" 
        onChange={(e) => setLoad(e.target.value)} 
        value={interestedjobs}
         className={emptyFields.includes('title') ? 'error' : ''}
    
      />

      <label>Applied Job:</label>
      <input 
        type="text" 
        onChange={(e) => setReps(e.target.value)} 
        value={applied} 
         className={emptyFields.includes('title') ? 'error' : ''}
   
      />

      <button>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default NewDashBoard