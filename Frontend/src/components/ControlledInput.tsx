import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from 'react';


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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'i' && event.ctrlKey) {
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

  return (
    <input
      ref={inputRef}
      type="text"
      className="repl-command-box"
      value={props.value}
      placeholder="Enter command here! Press Ctrl + i to focus on the input box. Press Ctrl + o to focus on the output history."
      onChange={(ev) => props.setValue(ev.target.value)}
      aria-label={props.ariaLabel}
    ></input>
  );
}
