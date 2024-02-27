import "../styles/main.css";

interface REPLHistoryProps {
  commandHistory: string[];
  resultHistory: string[];
  mode: string;
}
// TODO: enum?
export function REPLHistory(props: REPLHistoryProps) {
  if (props.mode === "brief") {
    return (
      <div className="repl-history">
        {props.resultHistory.map((ele, idx) => (
          <p key={idx}>{ele}</p>
        ))}
      </div>
    );
  } else if (props.mode == "verbose") {
    return (
      <div className="repl-history">
        {props.commandHistory.map((ele, idx) => (
          <p key={idx}>{ele}</p>
        ))}
        {props.resultHistory.map((ele, idx) => (
          <p key={idx}>{ele}</p>
        ))}
      </div>
    );
  } else {
    return <p>hello</p>;
  }
}
