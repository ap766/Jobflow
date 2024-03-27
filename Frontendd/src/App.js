
import "./index.css";
import "./App.css";
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Dashboard from './components/DashBoard'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import { Home } from "./components/Home";
// App.js
import Kanban from './components/Kanban';
function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
           <Route 
              path="/" 
              element={user ? <Dashboard /> : <Navigate to="/home" />} 
            />
             <Route 
              path="/home" 
              element={ <Home/> } 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/kanban"
              element={ <Kanban/>}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;