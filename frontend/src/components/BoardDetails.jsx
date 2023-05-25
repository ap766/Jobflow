//the get is done already but here we display on screen
import PropTypes from 'prop-types';
const BoardDetails = ({ board }) => {

  return (
    <div className="workout-details">
      <h4>Dashboard Title:{board.title}</h4>
      <p><strong>Interested Jobs: </strong>{board.interestedjobs}</p>
      <p><strong>Applied Jobs: </strong>{board.applied}</p>
      <p>{board.createdAt}</p>
    </div>
  )
}

BoardDetails.propTypes = {
  board: PropTypes.object.isRequired,
};

export default BoardDetails

