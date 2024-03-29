import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BoardContextProvider } from './context/BoardContext';
import { AuthContextProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <TaskProvider>
    <BoardContextProvider>
    <App />
    </BoardContextProvider>
    </TaskProvider>
  </AuthContextProvider>
);

