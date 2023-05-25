import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import BoardDetails from "../components/BoardDetails"
import NewDashBoard from "./NewDashBoard";

const DashBoard = () => {
  const [boards, setBoards] = useState(null)

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch("/api/JobAppSteps")//here instead of it being like http://localhost/4000 it proxies the browser requests to 4000 to prevent cors, instead f at 3000.
      const json = await response.json()

      if (response.ok) {
        setBoards(json)
      }
    }

    fetchBoards()
  }, [])

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
