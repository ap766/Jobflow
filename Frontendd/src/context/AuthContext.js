import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

//authReducer is the reducer function that will handle state updates. It should be a function that takes the current state and an action, and returns the new state.
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

//. When this component is imported elsewhere, it will initialize the state and provide the authentication context to its child components.
//This line defines and exports a new React component called AuthContextProvider. This component accepts a single prop: children, which represents the child components that AuthContextProvider will wrap.
//This AuthContextProvider component would be used to wrap the part of your app where you want the authentication state to be available
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  
//We are checking if the item-token is in local storage and yes executed only once when initially rendered cus []
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  


  //So, this code is providing the authentication state and the dispatch function to all child components.
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}
