import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./index.css";
import "./App.css";
//import { useState } from "react";
//import { Login } from "./components/Login";
//import { Register } from "./components/Register";
import { Home } from "./components/Home";
import DashBoard from './components/DashBoard';



function App() {
 


  return (
    <>
    <div className="App">
      {     
         <BrowserRouter>
        
        <div className="pages">
          <Routes>
            <Route 
              path="/dashboard" 
              element={< DashBoard />} 
            />
            <Route 
            path="/" 
            element={< Home />} 
          />
          </Routes>
        </div>
      </BrowserRouter>
      
      }
    </div>
    </>
  );
}

export default App;
