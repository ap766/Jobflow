// TaskContext.js
import React, { createContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [backlog, setBacklog] = useState([]);


  return (
    <TaskContext.Provider
      value={{ completed, setCompleted, incomplete, setIncomplete,inReview, setInReview ,backlog, setBacklog}}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
