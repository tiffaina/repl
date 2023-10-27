import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { Command } from "../functions/Command";
import CommandRegistry from './CommandRegistration';
import { useDataContext } from './DataContext';
import BackendStatus from './SharedState';



/**
 * These are the props for the REPLInput component.
 * - history is a list of all commands that have been pushed by the user in this session
 * - mode is a boolean set to true if in brief mode (default), and false in verbose mode
 * - setHistory is a function that allows the caller to set the value of the history array
 * - setMode is a function that allows the caller to set the value of mode
 */
interface REPLInputProps {
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
  const [hasHeader, setHasHeader] = useState<string>("");
  const [filepath, setFilepath] = useState<string>("");
  let backendLoaded: boolean = BackendStatus.getBackendStatus();
  

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
    commandArr.push(filepath) // add filepath into args
    commandArr.push(hasHeader) // add hasHeader into args
    let result = CommandRegistry.executeCommand(command, commandArr)
    .then(result => {
      if (result[0][0] === "Mode success!") {
        let newMode = props.mode === "brief" ? "verbose" : "brief";
        props.setMode(newMode);
      } 
      if(result[0].length === 2) {
        setFilepath(result[0][1]);
      } else if (result[0].length === 3) {
        setFilepath(result[0][1]);
        setHasHeader(result[0][2]);
      }
      newCommand = new Command(commandString, result[1], result[0][0]);
      setCount(count + 1);
      props.setHistory([...props.history, newCommand]);
      setCommandString("");
    })
    
    .catch(error => {
    console.error("Error occurred:", error);
    // Handle the error, e.g., update the UI to show an error message.
    setCount(count + 1);
    newCommand = new Command(commandString, [], "Error occurred:"+error);
    props.setHistory([...props.history, newCommand]);
    setCommandString("");
    BackendStatus.setStatus(false)
  });

    
    
  }

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
