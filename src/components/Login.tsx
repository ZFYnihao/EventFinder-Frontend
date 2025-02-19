import { GoogleLogin, googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { User } from "../types/User";

function Login() {
    const CLIENT_ID = "790798869250-lbundcmheeg71b2cs1c03aa31fb9174h.apps.googleusercontent.com"
    const [_, setUser] = useState<User | null>(null);
    
    return (
        <>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin 
            onSuccess={(credentialResponse) => {
                console.log(credentialResponse)
                const token = credentialResponse.credential
                console.log(token)
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
            </GoogleOAuthProvider>
        </>
    )
}

export default Login