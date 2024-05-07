//PATCH to update Board Title
//Using Board id 


import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { useBrdsContext } from '../hooks/useBrdsContext';
import { useAuthContext } from "../hooks/useAuthContext";
import styled from 'styled-components';

const StyledPopupContent = styled.div`
  background-color: #fff; /* White background color */
  padding: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #6c757d;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }`;


const CancelButton = styled(StyledButton)`
  background-color: #6c757d;
  
  &:hover {
    background-color: #5a6268;
  }`;


const BoardPopup = ({ board, isOpen, onClose }) => {
  const { user } = useAuthContext();
  const [newTitle, setNewTitle] = useState('');
  const { brds, dispatch } = useBrdsContext();

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
      <StyledPopupContent>
        <h3>Edit Board Title</h3>
        <input
          type="text"
          placeholder="Enter new title"
          value={newTitle}
          onChange={handleInputChange}
        />
        <StyledButton onClick={handleSave}>Save</StyledButton>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </StyledPopupContent>
    </Popup>
  );
};

export default BoardPopup;
