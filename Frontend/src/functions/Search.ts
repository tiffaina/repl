
import { Command } from "../functions/Command";
import { validFiles, searchMap } from "../functions/mockedJson";
import { REPLFunction } from "../functions/REPLFunction";
import {REPLInput} from "../components/REPLInput"

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

export const search: REPLFunction = async function (args: Array<string>): Promise<[string, string[][]]>  {
  let colIdentifier = args[1]
  let searchVal = args[2]
  
  const fetch1 = await fetch("http://localhost:3232/searchCSV?searchVal="+searchVal+"&colIdentifier="+colIdentifier)
  const json1 = await fetch1.json()
  let result: string = json1.result
    // check that "result" from the responseMap is success. Otherwise return an error 
  if (result === "success") {
      return new Promise((resolve) => {
        resolve(["View success!", json1.data]);
        });
    } else {
      let errorMessage: string = json1.err_msg
      return new Promise((resolve) => {
        resolve(["errorMessage", []])
     }); 
    } 
}