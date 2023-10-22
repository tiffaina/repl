import "../styles/main.css";
import CsvTable from "./CsvTable";
import { Command } from "../functions/Command";
import { useRef, useEffect } from "react";

/**
 * These are the props for the REPLHistory component.
 * - history is a list of all commands that have been pushed by the user in this session
 * - mode is a boolean set to true if in brief mode (default), and false in verbose mode
 */
interface REPLHistoryProps {
  history: Command[];
  mode: boolean;
}

/**
 * This component is called as part of the REPL component.
 * The REPLHistory component displays each of the outputs of all of the commands sent by
 * the user in this session. If the app is in verbose mode, the commands themselves are
 * also displayed in the REPLHistory area.
 * The commands are stacked on top of one another, with the oldeset commands at the top. The
 * component also auto-scrolls, so that the newest commands are visible.
 * @param props is the interface above containing the arguments to REPLHistory
 * @returns HTML div representing command history log
 */
export function REPLHistory(props: REPLHistoryProps) {
  // This code tells React to scroll to the bottom of the REPLHistory component
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [props.history]);

  /**
   * This code maps each command to an HTML div with its command information and
   * output as a table, depending on what mode the app is in (brief/verbose)
   */
  return (
    <div className="repl-history">
      {props.history.map((command, index) =>
        props.mode ? (
          <div className="leftAlign">
            <p aria-label={"commandMessage" + String(index)}>
              {command.message}
            </p>
            <CsvTable data={command.data} ariaLabel={"data" + String(index)} />
            <br />
            <hr />
          </div>
        ) : (
          <div className="leftAlign">
            <span className="boldText">Command: </span>
            <span aria-label={"commandString" + String(index)}>
              {command.commandString}
            </span>
            <br />
            <span className="boldText">Ouptut: </span>
            <span aria-label={"commandMessage" + String(index)}>
              {command.message}
            </span>
            <CsvTable data={command.data} ariaLabel={"data" + String(index)} />
            <br />
            <hr />
          </div>
        )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
