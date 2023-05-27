import { BoardContext } from "../context/BoardContext"
import { useContext } from "react"

export const useBoardsContext = () => {
  const context = useContext(BoardContext)

  if(!context) {
    throw Error('useBoardsContext must be used inside an BoardsContextProvider')
  }

  return context
}