import React from "react";

//The <BrowserRouter> component is a top-level component that is used to wrap the entire application
//BrowserRouter component uses HTML5 history API 
//<Routes> is a container for Route components
//<Route> is used to specify individual routes and their corresponding components.
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Navbar from './components/Navbar'
import Home from "./components/Home";
import Login from './components/Login'
import Signup from './components/Signup'
import Combined from "./components/Combined";
import Footer from "./components/Footer"; 

function App() {

  

//Retrieves the user object from the authentication context which is a custom react hook 
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
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
