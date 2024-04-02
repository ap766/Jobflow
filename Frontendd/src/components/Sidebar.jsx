import React, { useState, useEffect } from 'react';
import './Sidebar.css'; // Import your CSS file here
import BoardPopup from './BoardPopup';
import { useBrdsContext } from '../hooks/useBrdsContext';
import { useAuthContext } from "../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();
  const { brds, dispatch } = useBrdsContext();
  const [isOpen, setIsOpen] = useState(false);

  const [active, setActive] = useState('Learn Python');

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch("/api/Board/", {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_BRDS', payload: json });
        }
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    }

    if (user) {
      fetchBoards();
    }
  }, [dispatch, user]);

  const handleClick = (task) => {
    setActive(task);
    setIsOpen(true);
  };

  const handleAddTask = async () => {
    try {
      const taskData = {
        title: 'New Internship Title',
        description: 'New Task Description',
      };

      const response = await fetch('/api/Board/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        throw new Error('Failed to add new task');
      }

      const newTask = await response.json();
      dispatch({ type: 'CREATE_BRD', payload: newTask });
    } catch (error) {
      console.error('Error adding new task:', error);
    }
  };

  const handleDeleteTask = async (boardId) => {
    try {
      const response = await fetch(`/api/Board/${boardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete board');
      }

      dispatch({ type: 'DELETE_BRD', payload: { _id: boardId } });
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Tasks</h3>
      </div>
      <div className="sidebar-content">
        <ul>
          {brds.map((board, index) => (
            <li key={index}>
              <span
                className={active === board.title ? 'active' : ''}
                onClick={() => handleClick(board)}
              >
                {board.title}
              </span>
              <button onClick={() => handleDeleteTask(board._id)}>Delete</button>
            </li>
          ))}
        </ul>
        <button className="add-button" onClick={handleAddTask}>
          <span className="plus-icon">+</span> Add Task
        </button>

        {isOpen && (
          <BoardPopup
            board={active}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
