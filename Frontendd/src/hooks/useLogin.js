import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)

  const [isLoading, setIsLoading] = useState(null)

  //dispatch function to send actions's to authcontext's reducer 
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    
    const response = await fetch('https://jobflow-bo2c.onrender.com/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {

      // save the user to local storage-email and token
      localStorage.setItem('user', JSON.stringify(json))

      //update the auth context-email and token and although goes after refresh but if the token in userstorage then again we are in LOGIN,that is auth Context has user and Password.
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}