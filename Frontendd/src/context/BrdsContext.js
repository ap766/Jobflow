import { createContext, useReducer } from 'react'

export const BrdsContext = createContext()

export const brdsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BRDS':
      return { 
        brds: action.payload 
      }

    case 'CREATE_BRD':
      return { 
        brds: [action.payload, ...state.brds] 
      }

    case 'UPDATE_BRD':
      return {
        brds: state.brds.map(board => 
          board._id === action.payload._id ? action.payload : board
        )
      };

    case 'DELETE_BRD':
      return { 
        brds: state.brds.filter(w => w._id !== action.payload._id) 
      }

    default:
      return state
  }
}



export const BrdContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(brdsReducer, { 
    brds: []
  })
  
  return (
    <BrdsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </BrdsContext.Provider>
  )
}