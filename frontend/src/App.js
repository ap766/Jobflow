
import "./index.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Dashboard from './components/DashBoard'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Dashboard />}
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;