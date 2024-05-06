
import React, { createContext, useState } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [interested, setInterested] = useState([]);
  const [applied, setApplied] = useState([]);
  const [interview, setInterview] = useState([]);
  const [final, setFinal] = useState([]);


  return (
    <JobContext.Provider
      value={{ interested, setInterested, applied, setApplied,interview, setInterview ,final, setFinal}}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
