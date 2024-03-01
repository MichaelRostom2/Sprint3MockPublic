import "../styles/main.css";

interface REPLHistoryProps {
  History: string[];
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" data-testid="history">
      {props.History.map((ele, idx) => (
        <div key={idx} dangerouslySetInnerHTML={{ __html: ele }}></div>
      ))}
    </div>
  );
}
