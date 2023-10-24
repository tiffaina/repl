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
export const mode: REPLFunction = function (args: Array<string>, 
        setters: Map<string, Dispatch<SetStateAction<any>>>,)
        : Promise<[string, string[][]]>  {
        //   // mode
        //   props.setMode(!props.mode);
        //   newCommand = new Command(commandString, [], "Mode success!");
    
       // TODO need: setMode 
    let setMode = setters.get("setMode") // : Dispatch<SetStateAction<boolean>> 

    if (setMode) {
        setMode("verbose") // TODO fix this
        return new Promise((resolve) => {
        resolve(["Mode success!", []]);
        });
    } else {
        return new Promise((resolve) => {
        resolve(["Mode failed", []]);
        });
    }
}
