// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Dispatch, SetStateAction, useState } from "react";
import { validFiles } from "../functions/mockedJson";
import { REPLFunction } from "./REPLFunction";
import { useDataContext } from '../components/DataContext';


/**
 * Load function which attempts to load a file from the mocked data and sets
 * the hasHeader boolean in REPLInput to true or false.
 * @param commandArr array of strings where the first element should be the
 * command, the second element should be the filepath, and the third element
 * could be the hasHeader boolean. If the third hasHeader argument is not there,
 * then default to true.
 * @param setHeader the useState Hook function that can set the hasHeader
 * boolean in REPLInput.
 * @returns a message indicating either Load success! or an error.
 */
export const mockload: REPLFunction = function (args: Array<string>): Promise<[string[], string[][]]> {
  if ((args.length > 5 ) || (args.length < 3)) {
    return new Promise((resolve) => {
      resolve([["Error: incorrect number of arguments given to mock_load_file command","", ""], []]);
      });
  }

  let filepath = args[1];
  let filepathSplit: string[] = filepath.split("/");
  // Check that the file is in the correct directory (data)
  if (
    !(
      filepathSplit[0] === "data" ||
      (filepathSplit[0] === "." && filepathSplit[1] === "data")
    )
  ) {
    return new Promise((resolve) => {
        resolve([["Error: filepath " + filepath + " located in an unaccessible directory.","", ""], []]);
        });
  }
  // By default, set hasHeader to false
  let hasHeader = "false";
  if (args.length == 2) {
    hasHeader = "false";
  } else if (args.length > 2) {
    if (args[2].toLowerCase() === "true") {
        hasHeader = "true"
    } else if (args[2].toLowerCase() === "false") {
        hasHeader = "false"
    } else {
        return new Promise((resolve) => {
            resolve([["Error: header parameter must be either true or false.", "", ""], []]);
            });
    }
  }
  // Check that the filepath is in the list of valid files
  if (validFiles.includes(filepath)) {
    return new Promise((resolve) => {
        resolve([["Load success!", filepath, hasHeader], []]);
        });
  }
  return new Promise((resolve) => {
    resolve([["Error: " + filepath + " not found","", ""], []]);
    });
}
