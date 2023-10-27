
import { Command } from "../functions/Command";
import { validFiles, searchMap } from "../functions/mockedJson";
import { REPLFunction } from "../functions/REPLFunction";
import {REPLInput} from "../components/REPLInput";
import { useDataContext } from '../components/DataContext';
import BackendStatus from '../components/SharedState';



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

export const search: REPLFunction = async function (args: Array<string>): Promise<[string[], string[][]]>  {
  
  let colIdentifier = args[1]
  let searchVal = args[2]
       
  if (BackendStatus.getBackendStatus() === true) {

    const fetch1 = await fetch("http://localhost:3232/searchCSV?searchVal="+searchVal+"&colIdentifier="+colIdentifier)
    const json1 = await fetch1.json()
    console.log('Full Response:', json1);
    let result: string = json1.responseMap.result
      // check that "result" from the responseMap is success. Otherwise return an error 
    if (result === "success") {
      if ((json1.responseMap.matches).length === 0) {
        return new Promise((resolve) => {
          resolve([["No results found"], json1.responseMap.matches]);
          });
        } else {
            return new Promise((resolve) => {
              resolve([["Search success!"], json1.responseMap.matches]);
            });
        }
      } else {
        let errorMessage: string = json1.responseMap.err_msg
        return new Promise((resolve) => {
          resolve([[errorMessage], []])
      }); 
      } 
    } else {
      return new Promise((resolve) => {
          resolve([["Backend has not been loaded"], []])
      }); 

    }
}