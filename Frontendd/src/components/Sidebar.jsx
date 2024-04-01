// import React, { useState, useEffect } from 'react';
// import './Sidebar.css'; // Import your CSS file here
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useBrdsContext } from '../hooks/useBrdsContext'

// const Sidebar = () => {
//   const { user } = useAuthContext();
//   const [active, setActive] = useState('Learn Python'); // Set the initial active task
//   const { brds, dispatch } = useBrdsContext()

//   useEffect(() => {
//     const fetchBoards = async () => {
//       try {
//         const response = await fetch('/api/Board/', {
//           headers: {
//             'Authorization': `Bearer ${user.token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch boards');
//         }

//         const json = await response.json();
//         dispatch({type: 'SET_BRDS', payload: json})
//       } catch (error) {
//         console.error('Error fetching boards:', error);
//       }
//     };

//     fetchBoards();
//   }, [user.token]);

//   const handleClick = (task) => {
//     setActive(task);
//   };

//   const handleAddTask = () => {
//     console.log('Button clicked to add a new task');
//     // Add your logic for adding a new task here
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <h3>Tasks</h3>
//       </div>
//       <div className="sidebar-content">
//         <ul>
//           {brds.map((brd, index) => (
//             <li
//               key={index}
//               className={active === brd ? 'active' : ''}
//               onClick={() => handleClick(brd)}
//             >
//               {brd}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <button className="add-button" onClick={handleAddTask}>
//         <span className="plus-icon">+</span> Add Task
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState ,useEffect} from 'react';
import './Sidebar.css'; // Import your CSS file here
import { useBrdsContext } from '../hooks/useBrdsContext';
import { useAuthContext } from "../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();
  const { brds, dispatch } = useBrdsContext()
  console.log("the landddd")
  console.log(brds)
  const [active, setActive] = useState('Learn Python'); // Set the initial active task
  console.log('Sidebar user:', user);

  useEffect(() => {
    const Bords = async () => {
      const response = await fetch("/api/Board/", {
        headers: {'Authorization': `Bearer ${user.token}`},
      })//here instead of it being like http://localhost/4000 it proxies the browser requests to 4000 to prevent cors, instead f at 3000.
      const json = await response.json()
      if (response.ok) {
       // setBoards(json)
       //this is new.
       dispatch({type: 'SET_BRDS', payload: json})
       console.log('Boardssssssssss:', brds);
      }
    }
 if(user){
    Bords()
 }
  }, [dispatch,user])//this [] but new now

  const handleClick = (task) => {
    setActive(task);
  };

  const handleAddTask = async () => {
    try {
      // Define the task data to be sent to the server
      const taskData = {
        title: 'New Internship Title',
        description: 'New Task Description',
        // Add other task properties as needed
      };      
  
      // Make a POST request to your server API to add a new task
      const response = await fetch('/api/Board/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData) // Convert taskData to JSON string
      });
  
      if (!response.ok) {

        throw new Error('Failed to add new task');
      }
  
      // Task successfully added, you can handle the response as needed
      const newTask = await response.json();
      dispatch({type: 'CREATE_BRD', payload: newTask})
      console.log('New Board added:',brds);
      console.log('New task added:', newTask);
    } catch (error) {
      console.error('Error adding new task:', error);
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
            <li
              key={index}
              className={active === board.title ? 'active' : ''}
              onClick={() => handleClick(board.title)}
            >
              {board.title}
            </li>
          ))}
        </ul>
        <button className="add-button" onClick={handleAddTask}>
          <span className="plus-icon">+</span> Add Task
        </button>
      </div>
    </div>
  );
  
};

export default Sidebar;
