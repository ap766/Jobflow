//the get is done already but here we display on screen

import { useBoardsContext } from '../hooks/useBoardsContext'
import PropTypes from 'prop-types';
import { useAuthContext } from '../hooks/useAuthContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BoardDetails = ({ board }) => {

  //Added this
   const { dispatch } = useBoardsContext()
     const { user } = useAuthContext()

    const handleClick = async () => {
       if (!user) {
      return
    }

    const response = await fetch('/api/JobAppSteps/' + board._id, {
      method: 'DELETE',
       headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_BOARD', payload: json})
    }
  }
  //till here entire thing new and also the button
  return (
    <div className="workout-details">
      <h4>Dashboard Title:{board.title}</h4>
      <p><strong>Interested Jobs: </strong>{board.interestedjobs}</p>
      <p><strong>Applied Jobs: </strong>{board.applied}</p>
      <p>{formatDistanceToNow(new Date(board.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

BoardDetails.propTypes = {
  board: PropTypes.object.isRequired,
};

export default BoardDetails

