import { Link } from 'react-router-dom'
export const Home = () => {
 
  return (
    <>
 <div className="container">
JobFlow 
 </div>
 <div className="home">

      <h2>Welcome Peeps</h2>
      <nav>
         <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
      </nav>
    </div>
</>




  )
}
