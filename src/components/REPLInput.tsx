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
interface REPLFunction {
  (args: Array<string>): string;
}

/* a mocked function that performs the search and returns result*/
function SearchCSV(value: string): string {
  return "Retrived  value from Y file";
}
/* a function that takes a string[][] and returns a HTML table.
data: data to convert.
returns: HTML table with <table> and <td> <tr> tags
*/
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

/* Establishes Input component to manage user input*/
export function REPLInput(props: REPLInputProps) {
  /* variable for command entered by user */
  const [commandString, setCommandString] = useState<string>("");

  /* a map for all the commands the webpage can excute */
  const commandMap: Record<string, REPLFunction> = {};

  /* adding built-in commands to the map.
  if you are a developer adding your own command, 
  make sure to add functionality below and then added it to the CommandMap */
  commandMap["mode"] = modeCommand;
  commandMap["load_file"] = loadFileCommand;
  commandMap["view"] = viewCommand;
  commandMap["search"] = searchCommand;

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
  /* functionality for commands */
  /* sets the mode for the result.
  Returns "Mode Set" or "invalid mode type"
  */
  function modeCommand(args: string[]): string {
    let result = "";
    const modetype = args[0];
    if (!(modetype === "brief" || modetype === "verbose")) {
      result =
        '<span>Invalid mode type. Must be either "brief" or "verbose"</span>';
    } else {
      props.setMode(modetype);
      result = "<span>Mode set!</span>";
    }
    return result;
  }

  /*Loads file with specific filepath provided in Argument. 
  Returns the result of the load attempt. */
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

  /*Attempts to display the previously loaded file.  Returns a 
  table of the file's contents*/
  function viewCommand(args: string[]): string {
    if (!props.isLoaded) {
      return "<span>Please load a file first</span>";
    } else {
      return generateHTMLTable(props.loadedCSV);
    }
  }
  /* Mocks File Search.  Returns a text prompt if the incorrect number of 
  argument were entered.  Returns mocked search result if arguments are valid*/
  function searchCommand(args: string[]): string {
    let result = "";
    if (args.length != 2) {
      return "<span>Search requires 2 arguments: search 0 value or search header value</span>";
    } else if (!props.isLoaded) {
      return "<span>Please load a file first</span>";
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
    /* To add new commands, introduce a new function below. 
    It has to adhere to the REPLFunction interface.
    Don't forget to add it to the commandMap map before testing it.
    */

    return result;
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
