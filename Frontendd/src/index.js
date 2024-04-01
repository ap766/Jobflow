import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrdContextProvider } from './context/BrdsContext';
import { AuthContextProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import { JobContextProvider } from './context/JobsContext'
import {  BoardContextProvider } from './context/BoardContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <JobContextProvider>
      <TaskProvider>
    <BrdContextProvider>
    <BoardContextProvider>
    <App />
    </BoardContextProvider>
    </BrdContextProvider>
    </TaskProvider>
    </JobContextProvider>
  </AuthContextProvider>
);

