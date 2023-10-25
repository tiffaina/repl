import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { load } from "../functions/Load";
import { Command } from "../functions/Command";
import { view } from "../functions/View";
import { search } from "../functions/Search";
import { REPLFunction } from "../functions/REPLFunction";
import React from "react";
import { mode } from "../functions/Mode";
import CommandRegistry from './CommandRegistration';

/**
 * These are the props for the REPLInput component.
 * - history is a list of all commands that have been pushed by the user in this session
 * - mode is a boolean set to true if in brief mode (default), and false in verbose mode
 * - setHistory is a function that allows the caller to set the value of the history array
 * - setMode is a function that allows the caller to set the value of mode
 */
export interface REPLInputProps {
  history: Command[];
  mode: string;
  setHistory: Dispatch<SetStateAction<Command[]>>;
  setMode: Dispatch<SetStateAction<string>>;
}

/**
 * This component is called as part of the REPL component.
 * The REPLInput component uses a text input bar and a submit button to allow the user
 * to enter commands in the input box and send them with the submit button. The REPLHistory
 * component is updated according to the results of these commands.
 * Valid commands include mode, load_file <csv-file-path>, view, and search <column> <value>
 * @param props is the interface above containing the arguments to REPLInput
 * @returns HTML div representing input area, with input box and submit button
 */
export function REPLInput(props: REPLInputProps) {
  // These constants manage the state that sub-components have access to
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [filepath, setFilepath] = useState<string>("");
  const [hasHeader, setHasHeader] = useState<boolean>(false);
  const [csvLoaded, setCsvLoaded] = useState<boolean>(false);
  // const [csvdata, setCsvData] = useState<string[][]>([[]]);
  const [header, setHeader] = useState<string[]>([]);
  const [filePathSearch, setFilePath] = useState<string>("");
  

  // This function enables the command to be sent when the return key is pressed.
  const handleKey = (e: any) => {
    if (e.key === "Enter") {
      if (!commandString) {
        return;
      }
      handleSubmit(commandString);
    }
  };

  // This function is triggered when the button is clicked
  // It depending on the command text, it creates a Command object
  function handleSubmit(commandString: string) {
    let commandArr: string[] = commandString.split(" ");
    let command: string = commandArr[0];
    let newCommand: Command;

    // get mapped command function and execute it
    let result = CommandRegistry.executeCommand(command, commandArr)
    .then(result => {
      if (result[0] === "Mode success!") {
        let newMode = props.mode === "brief" ? "verbose" : "brief";
        props.setMode(newMode);
      } 
      newCommand = new Command(commandString, result[1], result[0]);
      props.setHistory([...props.history, newCommand]);
      setCommandString("");
    })
  }
        

    // if (command === "mode") {
    //   // mode
    //   props.setMode(!props.mode);
    //   newCommand = new Command(commandString, [], "Mode success!");
    // } else if (command === "load_file") {
    //   //load
    //   if (commandArr.length >= 4 || commandArr.length <= 1) {
    //     newCommand = new Command(
    //       commandString,
    //       [],
    //       "Error: incorrect number of arguments given to load_file command"
    //     );
    //   } else {
    //     //let loadMessage: string = load(commandArr, setHeader);
    //     //newCommand = new Command(commandString, [], loadMessage);
    //     setFilepath(commandArr[1]);
    //   }
    // } else if (command === "view") {
    //   // view
    //   newCommand = view(filepath, commandString);
    // } else if (command === "search") {
    //   // search
    //   newCommand = search(filepath, hasHeader, commandString);
    // } else {
    //   // unrecognized command
    //   newCommand = new Command(
    //     commandString,
    //     [],
    //     "Error: Please provide a valid command. Valid commands: mode, load_file <csv-file-path>, view, or search <column> <value>"
    //   );
    // }

  /**
   * This returns the legend, input box, and submit button that allow the user to
   * send commands and update the app's state, so that commands can be displayed by
   * the REPLHistory component.
   */
  return (
    <div className="repl-input" onKeyDown={handleKey}>
      <fieldset>
        <legend aria-label="legend">
          Enter a command: mode, load_file &lt;csv-file-path&gt;, view, or
          search &lt;column&gt; &lt;value&gt;
        </legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <br />
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
