import { GoogleLogin, googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.css'
import { UserData } from "../types/User";
import { useInfo } from "../UserInfo";
import { addUsers } from "../api/UserApi"

function Login() {
    const CLIENT_ID = "790798869250-lbundcmheeg71b2cs1c03aa31fb9174h.apps.googleusercontent.com";
    const { dispatch } = useInfo();

    const handleLogin = async (userData: UserData, token: string) => {
        dispatch({ type: "LOGIN", payload: userData });
        addUsers(token).then((response) => {
            if (response) {
                console.log(token)
                console.log("User logged in:", userData);
                dispatch({ type: "LOGIN", payload: userData });
            } else {
                console.error("Failed to login user", response);
             }
        })
        .catch((error) => {
            console.error("Error logging in:", error);
        });
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    const token = credentialResponse.credential ?? "";
                    const decoded: Partial<UserData> = jwtDecode(token!) as Partial<UserData>;

                    if (decoded.email && decoded.email.endsWith("@ucsd.edu")) {
                        const userData: UserData = {
                            given_name: decoded.given_name ?? "",
                            family_name: decoded.family_name ?? "",
                            name: decoded.name ?? "",
                            email: decoded.email ?? "",
                            token: token ?? "",
                            picture: decoded.picture??"",
                            is_admin: false,
                        };
                        handleLogin(userData, token);
                    } else {
                        console.log("Login Failed: Restricted to @ucsd.edu accounts.");
                        googleLogout();
                        alert("Only @ucsd.edu accounts are allowed.");
                    }
                }}
                onError={() => console.log("Login failed")}
                useOneTap
            />
        </GoogleOAuthProvider>
    );
}

export default Login;
