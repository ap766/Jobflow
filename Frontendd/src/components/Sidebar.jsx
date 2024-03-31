import React, { useState } from 'react';
import './Sidebar.css'; // Import your CSS file here

const Sidebar = () => {
  const [active, setActive] = useState('Learn Python'); // Set the initial active task

  const handleClick = (task) => {
    setActive(task);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Tasks</h3>
      </div>
      <div className="sidebar-content">
        <ul>
          <li
            className={active === 'Learn Python' ? 'active' : ''}
            onClick={() => handleClick('Learn Python')}
          >
            Learn Python
          </li>
          <li
            className={active === '日本語を勉強します' ? 'active' : ''}
            onClick={() => handleClick('日本語を勉強します')}
          >
            日本語を勉強します
          </li>
          <li
            className={active === 'Learn JavaScript' ? 'active' : ''}
            onClick={() => handleClick('Learn JavaScript')}
          >
            Learn JavaScript
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
