import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrdContextProvider } from './context/BrdsContext';
import { AuthContextProvider } from './context/AuthContext'
import { JobProvider } from './context/JobContext'
import { BoardIdProvider } from './context/BoardIdContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <BoardIdProvider>
      <JobProvider>
    <BrdContextProvider>
    <App />
    </BrdContextProvider>
    </JobProvider>
    </BoardIdProvider>
  </AuthContextProvider>
);

