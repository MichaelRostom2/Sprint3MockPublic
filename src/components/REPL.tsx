import "../styles/main.css";
import { useState } from "react";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { DATASET_1, DATASET_2, DATASET_3 } from "../Data/mockedJson";

export default function REPL() {
  const [History, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<string>("brief");
  const CSVDatabase = new Map();

  CSVDatabase.set("./data/1.csv", DATASET_1);
  CSVDatabase.set("./data/2.csv", DATASET_2);
  CSVDatabase.set("./data/3.csv", DATASET_3);
  const [loadedCSV, setloadedCSV] = useState<string[][]>([[""]]);
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
  if (History.length === 0) {
    // start of the program
    return (
      <div>
        <p>Hello! Enter commands below to use this webpage</p>
        <p>Enter mode brief to have only results show in history</p>
        <p>Enter mode verbose to have both command and results show history</p>
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
