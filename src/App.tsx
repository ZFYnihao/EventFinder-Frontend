import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import {jwtDecode} from "jwt-decode"
import './App.css'

function App() {
  const [user, setUser] = useState<User | null>(null);

  interface User {
    given_name: string;
    family_name: string;
    name: string;
    email: string;
  }

  return (
    <>
        <div>
        <GoogleLogin 
          onSuccess={(credentialResponse) => {
            const decoded: Partial<User> = jwtDecode(credentialResponse.credential!) as Partial<User>;
          
            if (decoded.email && decoded.email.endsWith("@ucsd.edu")) {
              const userData: User = {
                given_name: decoded.given_name ?? "",
                family_name: decoded.family_name ?? "",
                name: decoded.name ?? "",
                email: decoded.email ?? "",
              };
          
              console.log(userData);
              setUser(userData);
            } else {
              console.log("Login Failed: Restricted ucsd.edu Account");
              googleLogout();
              alert("Only ucsd.edu account login is allowed");
            }
          }}
          onError={() => console.log("login failed")}
          useOneTap
          hosted_domain='ucsd.edu'
        />
        <button
            onClick={() => {
              googleLogout();
              localStorage.clear();
              sessionStorage.clear();
              console.log("test")
            }}
            style={{
              display: "flex",
              alignItems: "center",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Logout
          </button>
        </div>
        
    </>
  )
}

export default App
