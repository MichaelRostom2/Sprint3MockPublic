import "../styles/main.css";

interface REPLHistoryProps {
  History: string[];
}
// TODO: enum?

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.History.map((ele, idx) => (
        <p key={idx}>{ele} </p>
      ))}
    </div>
  );
}
