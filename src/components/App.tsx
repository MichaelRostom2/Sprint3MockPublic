import { useState } from "react";
import { LoginButton } from "./LoginButton";
import REPL from "./REPL";

/**
 * This is the highest level component! It has the login screen and calls the REPL
 */
function App() {
  // boolean that tracks if the user has logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div>
      {isLoggedIn && <REPL />}
      <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default App;
