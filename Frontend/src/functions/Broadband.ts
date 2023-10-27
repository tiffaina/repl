import { REPLFunction } from "../functions/REPLFunction";

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

export const broadband: REPLFunction = async function (args: Array<string>): Promise<[string[], string[][]]>  {
  let state = args[1]
  let county = args[2]
  const fetch1 = await fetch("http://localhost:3232/broadband?state="+state+"&county="+county)
  const json1 = await fetch1.json()
  console.log('Full Response:', json1);
  console.log('json1 result', json1.result);
  let result: string = json1.result
    // check that "result" from the responseMap is success. Otherwise return an error 
  if (result === "success") {
    console.log('broadband coverage',json1.percentage_of_households_with_broadband_access)
    let responseArr: string[][] = 
    [["State", "County", "Percentage of households with broadband access"], 
    [state, county, json1.percentage_of_households_with_broadband_access]]
    return new Promise((resolve) => {
        resolve([["Broadband success!"], responseArr]);
      });
    } else {
      let errorMessage: string = "Broadband API Request did not go through. Please check that the entered State and County names are correct."
      return new Promise((resolve) => {
        resolve([[errorMessage], []])
     }); 
    } 
}