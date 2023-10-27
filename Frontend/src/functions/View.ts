import { Command } from "../functions/Command";
import { Dispatch, SetStateAction, useState } from "react";
import { filepathMap } from "../functions/mockedJson";
import { REPLFunction } from "../functions/REPLFunction";
import {REPLInput} from "../components/REPLInput";
import { useDataContext } from '../components/DataContext';
import BackendStatus from '../components/SharedState';



/**
 * View function 
 * @param args string containing the whole command given by the user 
 * @returns a Promise with the command string, a 2D array of strings if the view 
 * attempt is successful, and a message indicating view success or an error. 
 */
export const view: REPLFunction = async function (args: Array<string>): Promise<[string[], string[][]]>  {
  
    let filepath = args[1]
    if (!BackendStatus.getBackendStatus() === true) {
        return new Promise((resolve) => {
          resolve([["Backend has not been loaded"], []])
      }); 
    }

    if (filepath === "") {
      return new Promise((resolve) => {
        resolve([["Error: CSV file could not be viewed. Load correct filepath first."], json1.responseMap.data]);
        });
    }
    const fetch1 = await fetch("http://localhost:3232/viewCSV")
    const json1 = await fetch1.json()
    console.log('Full Response:', json1);
    let result: string = json1.responseMap.result
    // check that "result" from the responseMap is success. Otherwise return an error 
    console.log(result)
    console.log(json1.responseMap.data)
    if (result === "success") {
      return new Promise((resolve) => {
        resolve([["View success!"], json1.responseMap.data]);
        });
    } else {
      let errorMessage: string = json1.responseMap.err_msg
      return new Promise((reject) => {
        reject([[errorMessage], []])
     }); 
    } 
}
