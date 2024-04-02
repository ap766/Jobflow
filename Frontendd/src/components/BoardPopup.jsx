import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { useBrdsContext } from '../hooks/useBrdsContext';
import { useAuthContext } from "../hooks/useAuthContext";


const BoardPopup = ({ board,isOpen, onClose }) => {
  const { user } = useAuthContext();
  const [newTitle, setNewTitle] = useState('');
  const { brds, dispatch } = useBrdsContext()

  console.log("Welcome to boardpop")
  const handleInputChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleSave = async () => {
    try {
      // Construct the updated board object with the new title
      const updatedBoard = { ...board, title: newTitle };
  
      // Make a PATCH request to update the board in the database
      const response = await fetch(`/api/Board/${board._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBoard)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update board');
      }
  
      // Update the board in the global state
      dispatch({ type: 'UPDATE_BRD', payload: updatedBoard });
  
      // Close the popup after saving
      onClose();
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };
  
  
  return (
    <Popup open={isOpen} onClose={onClose} modal>
      
      {(close) => (
        <div>
          <h3>Edit Board Title</h3>
          <input
            type="text"
            placeholder="Enter new title"
            value={newTitle}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={close}>Cancel</button>
        </div>
      )}
    </Popup>
  );
};

export default BoardPopup;
