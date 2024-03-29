// TaskContext.js
import React, { createContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [inReview, setInReview] = useState([]);

  return (
    <TaskContext.Provider
      value={{ completed, setCompleted, incomplete, setIncomplete, backlog, setBacklog, inReview, setInReview }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;