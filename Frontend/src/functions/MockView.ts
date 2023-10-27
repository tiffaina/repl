import { Command } from "../functions/Command";
import { filepathMap } from "../functions/mockedJson";
import { REPLFunction } from "./REPLFunction";

/**
 * View function 
 * @param filepath string containing the filepath
 * @param commandString string containing the whole command given by the user
 * @returns a Command with the command string, a 2D array of strings if the view 
 * attempt is successful, and a message indicating view success or an error. 
 */
export const mockview: REPLFunction = function (args: Array<string>): Promise<[string[], string[][]]> {
    console.log(args)
    let filepath = args[1];
    let result = filepathMap.get(filepath);
  if (result === undefined) {
    return new Promise((resolve) => {
        resolve([["Error: CSV file could not be viewed. Load correct filepath first."], []]);
    });
  } else {
    let validResult = result as string[][];
    if (result.length === 0) {
        return new Promise((resolve) => {
            resolve([["View success! However, " + filepath + " appears to be an empty file."], []]);
        });
    }
    return new Promise((resolve) => {
        resolve([["View success!"], validResult]);
        });
    }
}
