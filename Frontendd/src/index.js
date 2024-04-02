import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrdContextProvider } from './context/BrdsContext';
import { AuthContextProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import { JobContextProvider } from './context/JobsContext'
import { BoardIdProvider } from './context/BoardIdContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <BoardIdProvider>
      <JobContextProvider>
      <TaskProvider>
    <BrdContextProvider>
    <App />
    </BrdContextProvider>
    </TaskProvider>
    </JobContextProvider>
    </BoardIdProvider>
  </AuthContextProvider>
);

