import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  commandHistory: string[];
  setCommandHistory: React.Dispatch<React.SetStateAction<string[]>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  resultHistory: string[];
  setresultHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");

  // process the input and excutes the command
  const ProcessInput = () => {
    // add it to the command history:
    props.setCommandHistory([...props.commandHistory, commandString]);

    // get the command keyword(the first word)
    const command = commandString.split(" ")[0];
    if (command === "mode") {
      const modetype = commandString.split(" ")[1];
      if (modetype === "brief" || modetype == "verbose") {
        props.setMode(modetype);
        props.setresultHistory([...props.resultHistory, "Mode set!"]);
      } else {
        // TODO: throw errors
      }
    } else if (command === "load_file") {
    } else if (command === "view") {
    } else if (command === "search") {
    } else {
      // TODO: throw error when command is not recognised.
    }
    // Clear the input box after processing the input
    setCommandString("");
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
        Submit
      </button>
    </div>
  );
}
