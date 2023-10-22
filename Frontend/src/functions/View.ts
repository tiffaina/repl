import { Command } from "../functions/Command";
import { filepathMap } from "../functions/mockedJson";

/**
 * View function 
 * @param filepath string containing the filepath
 * @param commandString string containing the whole command given by the user
 * @returns a Command with the command string, a 2D array of strings if the view 
 * attempt is successful, and a message indicating view success or an error. 
 */
export function view(filepath: string, commandString: string) {
  let result = filepathMap.get(filepath);
  if (result === undefined) {
    return new Command(
      commandString,
      [],
      "Error: CSV file could not be viewed. Load correct filepath first."
    );
  }
  if (result.length === 0) {
    return new Command(
      commandString,
      result,
      "View success! However, " + filepath + " appears to be an empty file."
    );
  }
  return new Command(commandString, result, "View success!");
}
