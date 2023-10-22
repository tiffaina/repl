import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * These are the props for the ControlledInput component.
 * - value is the value that is entered into the command box
 * - setValue is a function that allows the caller to update value
 * - ariaLabel is the label for the input that allows playwright testing
 */
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * This component allows the user to type their input into the command box, and
 * updates the variable value as the user types.
 * @param props is the interface above containing the arguments to ControlledInput
 * @returns an HTML input that shows and updates the text that the user has entered
 */
export function ControlledInput(props: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={props.value}
      placeholder="Enter command here!"
      onChange={(ev) => props.setValue(ev.target.value)}
      aria-label={props.ariaLabel}
    ></input>
  );
}
