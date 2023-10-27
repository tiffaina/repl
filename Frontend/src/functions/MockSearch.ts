
import { Console } from "console";
import { Command } from "../functions/Command";
import { validFiles, searchMap } from "../functions/mockedJson";
import { REPLFunction } from "./REPLFunction";
import { useDataContext } from '../components/DataContext';

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
export const mocksearch: REPLFunction = function (args: Array<string>): Promise<[string[], string[][]]> {
    let filepath = args[3];
    console.log(args)
    console.log(filepath)
    if (!validFiles.includes(filepath)) {
        return new Promise((resolve) => {
            resolve([["Error: CSV file could not be searched. Load correct filepath first"], []]);
        });
  }
  // Use a regex to split the commandString
  let commandString = args[0] + " " + args[1] + " " + args[2]
  let commandStringReg: RegExpMatchArray | null =
    commandString.match(/(?:[^\s"]+|"[^"]*")+/g);
  if (commandStringReg == null) {
    return new Promise((resolve) => {
        resolve([["Error: incorrect number of arguments given to search command. Two arguments expected: <column> <value>."], []]);
    });
  }
  // Remove the quotation marks from the split strings
  let commandStringSplit = commandStringReg.map((segment) => {
    return segment.replaceAll('"', "");
  });
  if (commandStringSplit.length !== 3) {
    return new Promise((resolve) => {
        resolve([["Error: incorrect number of arguments given to search command. Two arguments expected: <column> <value>."], []]);
    });
  }
  // Attempt to find the searched data in the loaded CSV data
  let hasHeader = args[4]
  let result = searchMap.get(
    filepath +
      " " +
      commandStringSplit[1] +
      " " +
      commandStringSplit[2] +
      " " +
      hasHeader
  );
  if (result !== undefined) {
    let validResult = result as string[][];
    if (validResult.length === 0) {
        return new Promise((resolve) => {
            resolve([['Search success! However, no rows matching the search criteria "' +
            commandString +
            '" were found.'], []]);
        });
    } else {
        return new Promise((resolve) => {
            resolve([["Search success!"], validResult]);
        });
    }
  } else {
    if ((hasHeader === "false") && isNaN(parseInt(commandStringSplit[1]))) {
        return new Promise((resolve) => {
            resolve([['Error: search unsuccessful, could not search non-numeric column ID "' +
            commandStringSplit[1] +
            '" in file with no headers.'], []]);
        });
    }
    return new Promise((resolve) => {
        resolve([["Error: search unsuccessful, could not find the value in the given column."], []]);
    });
}
}
