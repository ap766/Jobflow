import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
/*import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
*/


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)//console.log(email, password)
  }

  //   const handleGoogleLogin = async (credentialResponse) => {
  //   console.log(credentialResponse.credential);
  //   const decoded = jwt_decode(credentialResponse.credential);
  //   console.log(decoded);
  //   const googleEmail = decoded.email;

  //   // Store the Google email and a default password
  //   await login(googleEmail, '123456');
  // };

  return (
    <div>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

     <button disabled={isLoading}>Log in</button>

      {error && <div className="error">{error}</div>}
      
{/*         
        <GoogleOAuthProvider clientId="772332492057-a5e8j89gl93o180oteusndveae46vbmi.apps.googleusercontent.com">
    

 <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
    console.log('Login Failed');
  }}
/>
    </GoogleOAuthProvider> */}
    </form>
  
    </div>
  )
}

export default Login