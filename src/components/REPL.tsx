import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

export default function REPL() {
  const [History, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<string>("brief");
  const CSVData = new Map();
  CSVData.set("./data/1.csv", [["test"]]);
  CSVData.set("./data/2.csv", [["test"]]);
  CSVData.set("./data/3.csv", [["test"]]);
  const loaded;

  const REPLInputVar = (
    <REPLInput
      History={History}
      setHistory={setHistory}
      mode={mode}
      setMode={setMode}
      CSVData={CSVData}
    />
  );
  if (History.length === 0) {
    // emtpy list
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
