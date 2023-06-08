//No pt of this
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

export const Home = () => {
 
   const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }
  return (
    <>
 <div className="container">
JobFlow 
 </div>
 <div className="home">

      <h2>Welcome Peeps</h2>
      <nav>
         <div>
            <button onClick={handleClick}>Log out</button>
          </div>
         <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
      </nav>
    </div>
</>




  )
}
