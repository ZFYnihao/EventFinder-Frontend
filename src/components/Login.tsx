import { GoogleLogin, googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthContext"; // Import the global auth context
import 'bootstrap/dist/css/bootstrap.css';

interface User {
    googleid: string;
    given_name: string;
    family_name: string;
    name: string;
    email: string;
}

function Login() {
    const CLIENT_ID = "790798869250-lbundcmheeg71b2cs1c03aa31fb9174h.apps.googleusercontent.com";
    const { user, setUser } = useAuth(); // Get user state from context

    const handleLogin = async (userData: User) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/user/add", {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    googleid: userData.googleid,
                    fullname: userData.name,
                    email: userData.email,
                }),
            });

            if (response.ok) {
                console.log("User logged in:", userData);
                setUser(userData); // Update global state
            } else {
                console.error("Failed to login user", await response.json());
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        console.log("User logged out");
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div className="d-flex justify-content-center align-items-center flex-column">
                {user ? (
                    <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 me-3">Welcome, {user.name}</p>
                    <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                </div>
                ) : (
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            const token = credentialResponse.credential;
                            const decoded: Partial<User> = jwtDecode(token!) as Partial<User>;

                            if (decoded.email && decoded.email.endsWith("@ucsd.edu")) {
                                const userData: User = {
                                    googleid: token ?? "", 
                                    given_name: decoded.given_name ?? "",
                                    family_name: decoded.family_name ?? "",
                                    name: decoded.name ?? "",
                                    email: decoded.email ?? "",
                                };

                                handleLogin(userData);
                            } else {
                                console.log("Login Failed: Restricted to @ucsd.edu accounts.");
                                googleLogout();
                                alert("Only @ucsd.edu accounts are allowed.");
                            }
                        }}
                        onError={() => console.log("Login failed")}
                        useOneTap
                    />
                )}
            </div>
        </GoogleOAuthProvider>
    );
}

export default Login;
