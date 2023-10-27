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
export const mode: REPLFunction = function (args: Array<string>): Promise<[string[], string[][]]>  {


    // const mode: REPLFunction = function (args: Array<string>): Promise<string> {
      return new Promise((resolve, reject) => {
        if (args.length !== 3) {
          reject([["Error - Mode Should Not Include Other Args"], []]);
        } else {
          
          resolve([["Mode success!"], []]);
        }
      });
    
    
}
