import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
 
  return (
    <header>
      <div className="container">
        <Link to="/home">
          <h1>JobFlow</h1>
        </Link>
        <nav>
          {user && (
<>
            <div>
                   <span class="email">{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
            
            <div>
              <Link to="/">
               <img class="dashboard-link" src={require('./profile-user.png')}alt="dashboard" />
              </Link>
         
            </div>   
            </>

          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar