import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  commandHistory: string[];
  setCommandHistory: React.Dispatch<React.SetStateAction<string[]>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  resultHistory: string[];
  setresultHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");

  const ProcessInput = () => {
    props.setCommandHistory([...props.commandHistory, commandString]);
    const command = commandString.split(" ")[0];

    if (command === "mode") {
      const modetype = commandString.split(" ")[1];
      if (modetype === "brief" || modetype == "verbose") {
        props.setMode(modetype);
        props.setresultHistory([...props.resultHistory, "Mode set!"]);
      } else {
        // TODO: throw errors
      }
    } else if (command === "load") {
    }
  };

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button aria-label="submit-button" onClick={ProcessInput}>
        {" "}
        Submit
      </button>
    </div>
  );
}
