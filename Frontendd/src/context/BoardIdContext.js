import React, { createContext, useState } from 'react';

const BoardIdContext = createContext();

export const BoardIdProvider = ({ children }) => {
  const [BoardId, setBoardId] = useState(""); // Changed variable names
  return (
    <BoardIdContext.Provider
      value={{ BoardId, setBoardId }} // Updated variable names
    >
      {children}
    </BoardIdContext.Provider>
  );
};

export default BoardIdContext; // Fixed export name
