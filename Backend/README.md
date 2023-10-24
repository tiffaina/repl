# Server

## Team Members
Ilana Nguyen: inguyen4
Selena Williams: swilli43
Total estimated time to complete: 30 hours

## Link to repo
https://github.com/cs0320-f23/server-ilana27-selenajwilliams

## Design choices
The Server class handles the GET requests from the users and calls the corresponding handlers: LoadCSVHandler, ViewCSVHandler, SearchCSVHandler, and BroadbandHandler. 

## Errors/Bugs
BroadbandHandler functionality is not test-ready. 

## Tests
We wrote integration tests in the TestIntegration.java file that covered GET requests to each of the handlers and the interactions between them. 

## How to run the tests
To run each test individually, press the run button next to each individual test method declaration.

## How to build and run the program 
To build and run the program, first run the main method in the Server class. Then, open the server https on your browser, then enter your request in the given formats:\\
For loading: /loadCSV?filepath=<filepath>&hasHeader=<true or false>\\
For viewing: /viewCSV
For searching: /searchCSV?searchValue=<val>&colIdentifier=<none, column index, or column name>
For broadband: /broadband?state=<state>&county=<county>



Collaborators: 
* fvavrovs helped gracoiusly with broadband handling logic and the logic of how to connect to the census API
