import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  History: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  CSVData: Map<string, string[][]>;
  loadedCSV: string[][];
  setloadedCSV: React.Dispatch<React.SetStateAction<string[][]>>;
}

export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");

  const SearchCSV = () => {
    return "test";
  };

  // process the input and excutes the command
  const ProcessInput = () => {
    // get the command keyword(the first word)
    const command = commandString.split(" ")[0];
    let result = "";
    let isBrief = true;
    if (command === "mode") {
      const modetype = commandString.split(" ")[1];
      if (modetype === "brief") {
        isBrief = true;
        props.setMode(modetype);
        result = "Mode set!";
      } else if (modetype === "verbose") {
        isBrief = false;
        props.setMode(modetype);
        result = "Mode set!";
      } else result = 'Invalide mode type. Must be either "brief" or "verbose"';
    } else if (command === "load_file") {
      const filePath = commandString.split(" ")[1];
      if (!props.CSVData.has(filePath)) {
        result = "cannot load file, make sure to enter correct file path";
      } else {
        props.setloadedCSV(props.CSVData.get(filePath));
        result = "Loaded file successfully";
      }
    } else if (command === "view") {
      //   result = <td></td>
      //    loadedCSV.map()
    } else if (command === "search") {
      // TODO: make sure CSV is loaded
      const column = commandString.split(" ")[1];
      const value = commandString.split(" ")[2];
      if (column.length === 0) {
        result = "please enter a column name or index";
      } else {
        if (!isNaN(Number(column))) {
          // search by index
          result = SearchCSV();
        } else {
          // search by column name
          result = SearchCSV();
        }
      }
    } else {
      // TODO: throw error when command is not recognised.
    }

    if (isBrief) {
      props.setHistory([...props.History, result]);
    } else {
      props.setHistory([
        ...props.History,
        "Command: " + commandString,
        "Output: " + result,
      ]);
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
