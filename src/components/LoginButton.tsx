import { Dispatch, SetStateAction } from "react";
import "../styles/Login.css";

interface loginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}
/* This Component handles the login button and authentication */
export function LoginButton(props: loginProps) {
  const authenticate = () => {
    const newValue = !props.isLoggedIn;
    props.setIsLoggedIn(newValue);
    return newValue;
  };
  // If the user is signed in, show a button for signing out
  if (props.isLoggedIn) {
    return (
      <div className="LoginText">
        If you have finished using the webpage, please Sign out to prevent
        unauthorised access
        <button aria-label="Sign Out" onClick={authenticate}>
          Sign out
        </button>
      </div>
    );
  }
  // If the user is signed out, show a button for login
  else {
    return (
      <div>
        Please Login to access this webpage
        <button
          aria-label="Login"
          onClick={authenticate}
          style={{ marginTop: "20px" }}
        >
          Login
        </button>
      </div>
    );
  }
}

export default LoginButton;
