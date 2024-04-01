import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Components
import Navbar from './components/Navbar'
import Home from "./components/Home";
import Dashboard from './components/DashBoard'
import Login from './components/Login'
import Signup from './components/Signup'
import Kanban from './components/Kanban';
import Combined from "./components/Combined";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Combined /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/home" 
              element={<Home />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route 
              path="/kanban"
              element={user ? <Kanban /> : <Navigate to="/login" />}
            />
            <Route 
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
