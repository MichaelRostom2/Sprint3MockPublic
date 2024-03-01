import { useState } from "react";
import { LoginButton } from "./LoginButton";
import REPL from "./REPL";

/**
 * This is the highest level component! It calls the REPL
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <div>
      {isLoggedIn && <REPL />}
      <br></br>
      <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default App;
