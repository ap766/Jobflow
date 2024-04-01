import { BrdsContext } from "../context/BrdsContext"
import { useContext } from "react"

export const useBrdsContext = () => {
  const context = useContext(BrdsContext)

  if(!context) {
    throw Error('useBrdsContext must be used inside an BoardsContextProvider')
  }

  return context
}