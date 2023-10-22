import "../styles/main.css";
import { useState } from "react";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { Command } from "../functions/Command";

/**
 * This component is called as part of the App component.
 * The component encloses both the REPLHistory component and the REPLInput component,
 * which together displays the full screen of the command log and the command input
 * area at the bottom.
 * @returns An HTML div including both REPLHistory and REPLInput components
 */
export default function REPL() {
  // These constants manage the state that sub-components have access to
  const [history, setHistory] = useState<Command[]>([]);
  const [mode, setMode] = useState<boolean>(true);

  return (
    <div className="repl">
      <REPLHistory history={history} mode={mode} />
      <hr></hr>
      <REPLInput
        history={history}
        mode={mode}
        setHistory={setHistory}
        setMode={setMode}
      />
    </div>
  );
}
