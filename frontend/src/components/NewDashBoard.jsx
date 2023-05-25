import { useState } from 'react'

const NewDashBoard = () => {
  const [title, setTitle] = useState('')
  const [interestedjobs, setLoad] = useState('')
  const [applied, setReps] = useState('')
  const [error, setError] = useState(null)

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
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      console.log('new workout added:', json)
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
      />

      <label>Interested Jobs:</label>
      <input 
        type="text" 
        onChange={(e) => setLoad(e.target.value)} 
        value={interestedjobs}
      />

      <label>Applied Job:</label>
      <input 
        type="text" 
        onChange={(e) => setReps(e.target.value)} 
        value={applied} 
      />

      <button>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default NewDashBoard