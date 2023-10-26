import "../styles/main.css";
import CsvTable from "./CsvTable";
import { Command } from "../functions/Command";

import { useRef, useEffect, useState } from "react";
import React from "react";

/**
 * These are the props for the REPLHistory component.
 * - history is a list of all commands that have been pushed by the user in this session
 * - mode is a boolean set to true if in brief mode (default), and false in verbose mode
 */
interface REPLHistoryProps {
  history: Command[];
  mode: string;
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
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current!.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      setScrollPosition(scrollPosition - 1);
    } else if (e.key === "ArrowDown") {
      setScrollPosition(scrollPosition + 1);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'o' && event.ctrlKey) {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  /**
   * This code maps each command to an HTML div with its command information and
   * output as a table, depending on what mode the app is in (brief/verbose)
   */
  return (
    <div
      className="repl-history"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      ref={inputRef}
    >
      {props.history.map((command, index) =>
        (props.mode === "brief") ? (
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
            <span aria-label={"Command"+ String(index) +"is: "} className="boldText">Command: </span>
            <span aria-label={`${command.commandString}`}>
              {command.commandString}
            </span>
            <br />
            <span aria-label={"Output"+ String(index) +"is: "} className="boldText">Output: </span>
            <span aria-label={`${command.message}`}>
              {command.message}
            </span>
            <br />
            <span aria-label={"Data"+ String(index) + "is: "} className="boldText">Data:</span>
            <CsvTable data={command.data} ariaLabel={`${command.data}`} />
            <br />
            <hr />
          </div>
        )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
