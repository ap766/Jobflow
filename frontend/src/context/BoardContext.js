import { createContext, useReducer } from 'react'

export const BoardContext = createContext()

export const boardsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOARDS':
      return { 
        boards: action.payload 
      }
    case 'CREATE_BOARD':
      return { 
        boards: [action.payload, ...state.boards] 
      }
    default:
      return state
  }
}

export const BoardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardsReducer, { 
    workouts: null
  })
  
  return (
    <BoardContext.Provider value={{ ...state, dispatch }}>
      { children }
    </BoardContext.Provider>
  )
}