import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BoardContextProvider } from './context/BoardContext';
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
  
    <BoardContextProvider>
    <App />
    </BoardContextProvider>
  
  </AuthContextProvider>
);

