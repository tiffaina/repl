# Full Stack REPL - Software Engineering


In a nutshell: Frontend of a web application allowing users to load, view, and search
CSV files through a command line tool. Backend allows the server to make API calls to ACS Datasource. 


Team members: taina1 and ilana27. We worked on the vast majority of the project by pair programming, where we sat together and switched roles as the driver/navigator. We also developed on individual branches, and practiced merging into main.

## Running the program:


To run our program locally, first run `npm install`, to ensure that you have all dependencies needed by our program. Next, run `npm start`, which will start the program running locally on your computer. Then, navigate to http://localhost:8000/ to use the program!


On the page, valid commands include:


mode: changes the mode from brief to verbose and vice versa
load &lt;filepath&gt; &lt;OPTIONAL hasHeader = true or false&gt;: loads in a CSV from the given filepath, hasHeader parameter is optional and will default to FALSE if not given one.

## Design choices:


Here are a few notable design choices we made:
- In order for our 3 handlers to have access to the same variables we made a shared state class private static variables that can be globally accessed.
This is where a variable is stored that tells whether the backend has been loaded with a file. 
- To make our program accessible you can navigate the scrollable history with up and down arrows, and enter the submit button with the error key. We added keyboard shortcuts like Ctrl + I to shift react focus to the input box, then Ctrl + O to shift the focus to the output/history box. The manual shift of focus allows the user to control the program without the trackpad.


- We chose to use the App.tsx file as the main driver for the website, with REPL as the exported function running the main page. REPL calls REPLHistory, which displays the past commands and outputs given by the user, and REPLInput, which handles the input from the user by parsing the text and calling the appropriate functions for load_file, view, and search.


- We made a CommandRegistration class which is the way developers can add their own command functions to the program,  making it easier to manage and extend your command registry.


- We chose to wrap commands in a class called "Command" which is stored in a file called Command.ts. A Command contains the command input, the data returned from running the command, and a message indicating success or an error.


- We chose to represent the current 'mode' that the program is in with a share state of a boolean value. For this shared boolean, true represents 'brief' mode, the default, and false represents 'verbose' mode.
- We chose to display output from view and search as HTML tables, which we create in our CsvTable function, which takes in a 2D array of strings.


Moreover, here are some sources we used to learn how to implement specific pieces of functionality:
- [Here]https://www.bekk.christmas/post/2020/22/create-a-generic-table-with-react-and-typescript is the source we used to learn how to use
Typescript to dynamically create an HTML table.
- [Here]https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react is the source we used to learn how to make our REPLHistory box autoscroll.
- [Here] https://stackoverflow.com/questions/16261635/javascript-split-string-by-space-but-ignore-space-in-quotes-notice-not-to-spli is the source we used to learn how to split a string on spaces, but not on quotation marks


## Errors/Bugs:


One small bug that could come up is if someone tries to search for a value by a column name that has a space in it, like "Median Household Income." This is because we parse the different inputs in our command by splitting the command string on spaces, so the column name also gets split.


## Tests:
In order to switch between real and mocked data we added 3 new commands to the registry : mock_load_file, mock_search, and mock_view. These are coded to rely on frontend data that are mocked from the backend and eliminate costs associated with API calls.


We wrote tests for command registration on the front end using Jest. Due to our architecture, we didn’t require many unit tests for the front end that differed from our last sprint. 
Our global variable that checks if the backend has been loaded helped us write states that cause state changes in the backend without restarting the server. If I load a good file, bad file, then want to search we want to make sure that upon restarting the front-end the variable gets reset to false so the backend state is cleaned.


For our testing, we split our tests into multiple files: BasicFunctionality.spec.ts, ModeExtra.spec.ts, Load.spec.ts, View.spec.ts, Search.spec.ts, broadband.spec.ts, Registration.ts,  Integration.spec.ts. BasicFunctionality just tests general page functionality, for example, making sure all the elements load properly and that commands get pushed properly. ModeExtra tests that the mode command works as expected, even when called multiple times in a row, and also that the program is able to handle invalid commands. Load tests the load functionality, including attempting to load an invalid filepath, a valid filepath that leads to an empty CSV, and valid filepaths with and without headers. View tests the view functionality, including attempting to view without loading any file, attempting to view after an unsuccessful load attempt, and viewing a file successfully. 


There are also some integration tests in this file relating to multiple sequences of calling mode, load, and view. Search tests the search functionality including many different shapes of possible search commands, like calling search without any of the required arguments, calling search with an invalid column identifier, calling search with a valid column identifier but a value that is not in the CSV, and finally some successful searches. There is also some integration tests involving searching after failed load commands. Lastly, Integration tests the integration of multiple commands and the interactions between states, such as trying to load a valid file and viewing it, then loading an invalid file and viewing it. There is also a test for loading an invalid file, trying to search, loading a valid file, doing an unsuccessful search, and then doing a successful search. Finally, there is a test to load a valid file, do a successful search, load a new file, try to search on the old file and fail, then finally do a successful search on the new file.


## Running the tests:


To run the tests in our program, first run `npx playwright install` to install Playwright, which allows us to visually see tests that interact with the frontend of our application. Next, run `npx playwright test` to simply run the tests in the terminal, or `npx playwright test --ui` to see the UI application corresponding to the tests.
to run jest: npx jest





view: displays the currently-loaded CSV


search &lt;column identifier = column index or column name&gt; &lt;value&gt;: searches the currently-loaded CSV for the given value in the column corresponding with the column identifier. If a column name is given, it must be in quotations to indicate to the search function that the column name is within the quotes. This was designed because our function parses the search command by splitting on spaces.
