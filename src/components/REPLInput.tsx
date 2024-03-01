import "../styles/main.css";
import { useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  History: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  mode: String;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  CSVDatabase: Map<string, string[][]>;
  loadedCSV: string[][];
  setloadedCSV: React.Dispatch<React.SetStateAction<string[][]>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
 * the command is done executing.
 *
 * The arguments passed in the input (which need not be named "args") should
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {
  (args: Array<string>): string;
}

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const commandMap: Record<string, REPLFunction> = {};

  commandMap["mode"] = modeCommand;
  const Colors = Object.freeze({
    RED: "red",
    GREEN: "green",
    BLUE: "blue",
  });
  commandMap["load_file"] = loadFileCommand;
  commandMap["view"] = viewCommand;
  commandMap["search"] = searchCommand;

  function modeCommand(args: string[]): string {
    let result = "";
    const modetype = args[0];
    if (!(modetype === "brief" || modetype === "verbose")) {
      result =
        '<span>Invalide mode type. Must be either "brief" or "verbose"</span>';
    } else {
      props.setMode(modetype);
      result = "<span>Mode set!</span>";
    }
    return result;
  }
  function loadFileCommand(args: string[]): string {
    let result = "";
    const filePath = args[0];
    if (!props.CSVDatabase.has(filePath)) {
      result =
        "<span>cannot load file, make sure to enter correct file path</span>";
    } else {
      props.setloadedCSV(props.CSVDatabase.get(filePath)!);
      props.setIsLoaded(true);
      result = "<span>Loaded file successfully</span>";
    }
    return result;
  }
  function viewCommand(args: string[]): string {
    if (!props.isLoaded) {
      return "<span>Please load a file first</span>";
    } else {
      return generateHTMLTable(props.loadedCSV);
    }
  }
  function searchCommand(args: string[]): string {
    let result = "";
    if (!props.isLoaded) {
      result = "<span>Please load a file first</span>";
    } else {
      const column = args[0];
      const value = args[1];
      if (column.length === 0) {
        result = "<span>Please enter a column name or index</span>";
      } else {
        if (!isNaN(Number(column))) {
          // search by index
          result = SearchCSV(value);
        } else {
          // search by column name
          result = SearchCSV(value);
        }
      }
    }
    return result;
  }

  /* process the input and excutes the command */
  const ProcessInput = () => {
    const commandList = commandString.split(" ");
    let result = "";
    if (commandList[0] in commandMap) {
      result = commandMap[commandList[0]](commandList.slice(1));
    } else {
      result = "Command not recognized";
    }

    /* add the command and result to history */
    if (props.mode === "brief") {
      props.setHistory([...props.History, result]);
    } else if (props.mode === "verbose") {
      props.setHistory([
        ...props.History,
        "Command: " + commandString,
        "Output: " + result,
      ]);
    }
    // Clear the input box after processing the input
    setCommandString("");
  };
  function SearchCSV(value: string): string {
    return "Retrived  value from Y file";
    // TODO: implement return function type
  }
  function generateHTMLTable(data: string[][]): string {
    let html = "<table>";

    for (let row = 0; row < data.length; row++) {
      html += "<tr>";
      for (let column = 0; column < data[row].length; column++) {
        html += "<td>" + data[row][column] + "</td>";
      }
      html += "</tr>";
    }
    return html;
  }

  return (
    <div className="repl-input">
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
