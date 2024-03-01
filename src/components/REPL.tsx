import "../styles/main.css";
import { useState } from "react";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { DATASET_1, DATASET_2, DATASET_3 } from "../Data/mockedJson";

export default function REPL() {
  /* History is a string[] that stores history of commands/results.
  Its strings are formatted as HTML tags, for example: "<span>hello</span>"
  */
  const [History, setHistory] = useState<string[]>([]);
  /* mode is a variable for tracking the mode of the History. 
  It can have two values: "brief" or "verbose". Its initial value is brief.

  brief: only the result of the command will be shown and saved to history.
  verbose: both the command and the result of it will be shown and saved to history
  */
  const [mode, setMode] = useState<string>("brief");

  /* A map for Mocked CSV Databases for testing. 
  It Links path names with actual data set up in ../Data/mockedJson
  */
  const CSVDatabase = new Map();
  CSVDatabase.set("./data/1.csv", DATASET_1);
  CSVDatabase.set("./data/2.csv", DATASET_2);
  CSVDatabase.set("./data/3.csv", DATASET_3);

  /* A variable that stores the current CSV that is loaded. 
  It is saved as a string[][] 
  */
  const [loadedCSV, setloadedCSV] = useState<string[][]>([[""]]);

  /* A boolean that indicates whether there a CSV file has been loaded since 
  the start of the program
  */
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const REPLInputVar = (
    <REPLInput
      History={History}
      setHistory={setHistory}
      mode={mode}
      setMode={setMode}
      CSVDatabase={CSVDatabase}
      loadedCSV={loadedCSV}
      setloadedCSV={setloadedCSV}
      isLoaded={isLoaded}
      setIsLoaded={setIsLoaded}
    />
  );
  if (History.length === 9) {
    // Start of the program indicated by empty history
    return (
      <div>
        <p>Hello! Enter commands below to use this webpage</p>
        <p>Enter mode brief to have only results show in history</p>
        <p>Enter mode verbose to have both command and results show history</p>
        <p>Other supported commands:</p>
        <ul>
          <li>
            load_file: for loading a CSV file. Arguments: file_path - the path
            to the file
          </li>
          <li>view: for viewing a loaded CSV file. Arguments: none</li>
          <li>
            search: for searching a loaded CSV file. Arguments: (index/column) -
            to specify index/column to search in, value - the value to search
            for enter{" "}
          </li>
        </ul>
        {REPLInputVar}
      </div>
    );
  } else {
    return (
      <div className="repl">
        <REPLHistory History={History} />
        {REPLInputVar}
      </div>
    );
  }
}
