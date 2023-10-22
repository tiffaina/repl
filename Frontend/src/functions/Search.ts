/**
 * Search function
 */
import { Command } from "../functions/Command";
import { validFiles, searchMap } from "../functions/mockedJson";

/**
 * Search function
 * @param filepath string containing the filepath
 * @param hasHeader boolean indicating whether the given file has a header or
 * not
 * @param commandString string containing the whole command given by the user
 * split into individual strings by a space delimiter
 * @returns a Command with the command string, the result of searching, and a
 * message indicating search success or an error.
 */
export function search(
  filepath: string,
  hasHeader: boolean,
  commandString: string
) {
  if (!validFiles.includes(filepath)) {
    return new Command(
      commandString,
      [],
      "Error: CSV file could not be searched. Load correct filepath first."
    );
  }
  // Use a regex to split the commandString
  let commandStringReg: RegExpMatchArray | null =
    commandString.match(/(?:[^\s"]+|"[^"]*")+/g);
  if (commandStringReg == null) {
    return new Command(
      commandString,
      [],
      "Error: incorrect number of arguments given to search command. Two arguments expected: <column> <value>."
    );
  }
  // Remove the quotation marks from the split strings
  let commandStringSplit = commandStringReg.map((segment) => {
    return segment.replaceAll('"', "");
  });
  if (commandStringSplit.length !== 3) {
    return new Command(
      commandString,
      [],
      "Error: incorrect number of arguments given to search command. Two arguments expected: <column> <value>."
    );
  }
  // Attempt to find the searched data in the loaded CSV data
  let result = searchMap.get(
    filepath +
      " " +
      commandStringSplit[1] +
      " " +
      commandStringSplit[2] +
      " " +
      String(hasHeader)
  );
  if (result === undefined) {
    if (!hasHeader && isNaN(parseInt(commandStringSplit[1]))) {
      return new Command(
        commandString,
        [],
        'Error: search unsuccessful, could not search non-numeric column ID "' +
          commandStringSplit[1] +
          '" in file with no headers.'
      );
    }
    return new Command(
      commandString,
      [],
      "Error: search unsuccessful, could not find the value in the given column."
    );
  }
  if (result.length === 0) {
    return new Command(
      commandString,
      result,
      'Search success! However, no rows matching the search criteria "' +
        commandString +
        '" were found.'
    );
  }
  return new Command(commandString, result, "Search success!");
}
