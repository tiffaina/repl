// Note this is a .ts file, not .tsx. It's TypeScript, but not React.
import { Dispatch, SetStateAction, useState } from "react";
import { validFiles } from "../functions/mockedJson";
import { REPLFunction } from "../functions/REPLFunction";
import {REPLInput} from "../components/REPLInput"

/**
 * Load function which attempts to load a file from the mocked data and sets
 * the hasHeader boolean in REPLInput to true or false.
 * @param commandArr array of strings where the first element should be the
 * command, the second element should be the filepath, and the third element
 * could be the hasHeader boolean. If the third hasHeader argument is not there,
 * then default to true.
 * @param setHeader the useState Hook function that can set the hasHeader
 * boolean in REPL.
 * @returns a message indicating either Load success! or an error.
 */
// export const load: REPLFunction = function (args: Array<string>, setHeader: Dispatch<SetStateAction<boolean>>) {
export const load: REPLFunction = function (args: Array<string>): Promise<[string[], string[][]]> {

    

  // check that correct number of arguments is passed
  if (args.length > 6 || args.length < 3) {
    return new Promise((resolve) => {
      resolve([["Error: incorrect number of arguments given to load_file command"], []]);
      });
    }
  
  let filepath = args[1];
  // if (setFilepath) {
  //   setFilepath(filepath);
  // }
  let filepathSplit: string[] = filepath.split("/");
  // Check that the file is in the correct directory (data)
  if (
    !(
      filepathSplit[0] === "data" ||
      (filepathSplit[0] === "." && filepathSplit[1] === "data")
    )
  ) {
    return new Promise((resolve) => {
      resolve([["Error: filepath " + filepath + " located in an unaccessible directory."], []]);
      });
  }
  // By default, set hasHeader to false
  let hasHeaderCopy = "false"
  if (args.length == 2) {
    // if (setHasHeader) {
    //   setHasHeader(false);}
  } else if (args.length > 2) {
    let header = args[2];
    if (header.toLowerCase() === "true") {
      // if (setHasHeader){
      // setHasHeader(true);}
      
      hasHeaderCopy = "true"
    } else if (header.toLowerCase() === "false") {
      // if (setHasHeader) {
      // setHasHeader(false);}
      hasHeaderCopy = "false"
    } else {
      return new Promise((resolve) => {
      resolve([["Error: header parameter must be either true or false."], []]);
      });
      
    }
  }
  // Check that the filepath is in the list of valid files
    // TODO: Access CSVDATA from backend and check existence

  async function callBackend(): Promise<[string[], string[][]]> {
    const fetch1 = await fetch("http://localhost:3232/loadCSV?filepath=Backend/"+filepath+"&hasHeader="+hasHeaderCopy)
    const json1 = await fetch1.json()
    let result: string = json1.responseMap.result
    // check that "result" from the responseMap is success. Otherwise return an error 
    if (result === "success") {
      const resultArray: [string[], string[][]] = [["Load success!", filepath], []];
      return resultArray;
    } else {
      let errorMessage: string = json1.responseMap.err_msg
      const errorArray: [string[], string[][]] = [
        [errorMessage, ""],
        [],
      ];
      return errorArray;
    } 
  }

  return callBackend()

   
}

