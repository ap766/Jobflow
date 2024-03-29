//This is equivalent to home of the wkb
import { useEffect} from "react"

import PropTypes from 'prop-types';
import BoardDetails from "./BoardDetails"
import NewDashBoard from "./NewDashBoard";
import { useBoardsContext } from "../hooks/useBoardsContext";
import { useAuthContext } from "../hooks/useAuthContext"

const DashBoard = () => {
  //const [boards, setBoards] = useState(null)
  const { boards, dispatch } = useBoardsContext()//you can see why we need 2..cus we display boards
  const {user} = useAuthContext()

  useEffect(() => {


    const fetchBoards = async () => {
      const response = await fetch("/api/JobAppSteps", {
        headers: {'Authorization': `Bearer ${user.token}`},
      })//here instead of it being like http://localhost/4000 it proxies the browser requests to 4000 to prevent cors, instead f at 3000.
      const json = await response.json()
      if (response.ok) {
       // setBoards(json)
       //this is new.
       dispatch({type: 'SET_BOARDS', payload: json})
      }
    }
 if(user){
    fetchBoards()
 }
  }, [dispatch,user])//this [] but new now

  return (
    <div className="home">
      <div className="workouts">
        {boards && boards.map(bd => (
          <BoardDetails board={bd} key={bd._id} />
        ))}
      </div>
      <NewDashBoard/>
    </div>
  )
}
DashBoard.propTypes = {
  bd: PropTypes.object.isRequired,
};

export default DashBoard;
