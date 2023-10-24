import { Command } from "../functions/Command";
import { Dispatch, SetStateAction, useState } from "react";
import { filepathMap } from "../functions/mockedJson";
import { REPLFunction } from "../functions/REPLFunction";
import {REPLInput} from "../components/REPLInput"

/**
 * View function 
 * @param args string containing the whole command given by the user 
 * @returns a Promise with the command string, a 2D array of strings if the view 
 * attempt is successful, and a message indicating view success or an error. 
 */
export const view: REPLFunction = function (args: Array<string> 
  // hasHeader: any,
  // setHasHeader: Dispatch<SetStateAction<boolean>> | undefined, 
  // setCsvLoaded: Dispatch<SetStateAction<boolean>> | undefined, 
  // setHeader: Dispatch<SetStateAction<string[]>> | undefined, 
  // setCsvData: Dispatch<SetStateAction<string[][]>> | undefined,
  // setFilepath: Dispatch<SetStateAction<string>> | undefined) 
): Promise<string>  {
    
  
  async function callBackend(): Promise<string> {
    const fetch1 = await fetch(`http://localhost:3232/view`)
    const json1 = await fetch1.json()
    let result: string = json1.result
    let data = json1.data // get csvdata
    // check that "result" from the responseMap is success. Otherwise return an error 
    if (result === "success") {
      // if (setCsvData){
      //   setCsvData(data)
      // }
      return new Promise((resolve) => {
        resolve("View success!");
        });
    } else {
      let errorMessage: string = json1.err_msg
      return new Promise((resolve) => {
        resolve(errorMessage)
     }); 
    } 
  }

  return callBackend()
  
  // return new Command(commandString, result, "View success!");
}
