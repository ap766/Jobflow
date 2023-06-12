import { useAuthContext } from './useAuthContext'
import { useBoardsContext } from './useBoardsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
   const { dispatch: dispatchBoards } = useBoardsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchBoards({ type: 'SET_BOARDS', payload: null })
  }

  return { logout }
}