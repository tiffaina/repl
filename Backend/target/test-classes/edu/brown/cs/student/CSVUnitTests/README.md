# CSV Project

Team Members: swilli43
Repo Link: https://github.com/cs0320-f23/csv-selenajwilliams.git

## Project Overview
This project builds a user-facing search program that allows a user to search
a CSV file for a search value, with the option to refine their search by
providing a column identifier (column name or index). It supports this through
a parser program that can parse any reader object and output that data in a
variety of forms, according to a strategy pattern. Current functionality allows
each row of the reader object to be parsed into a list of Strings or a list of
Integers. The project structure is such that a developer can build out
alternative parser outputs if desired.

## Project Structure
Data files (i.e. CSV files) can be found in csv/data/<fileCategory>/<fileName>

The main logic of the program can be found in the Parse, Search, and Main files
found in the main folder at src/main/java/edu/brown/cs/student/main/. There is
also a package for

Similarly, the main testing files are TestSearch and TestParse and they can
be found in the test folder at src/test.

The main packages of this program include:
**main**, which contains Main, Parse, and Search, and rowType (a package)
**test**, which contains TestParse and TestSearch
**rowType**, which contains the CreatorFromRow interface and IntegerList and
StringList, two classes that implement the CreatorFromRow interface
**data**, which contains the following folders: census, integerdata, and stars, which
contain CSV files related to their parent-folder name and are be used in testing


## Design Choices
The **Main file** creates an instance of the search class, followed by 3 examples
of the search method demonstrating the different options to search by.

The **Search class** takes has 3 different search methods, one for each of the search
options (no column identifier, passing in column name, or passing in column index).
Each search method makes an instance of the parse class which parses the data and
computes search-related logic on the parsed data. Searching for a value is supported
with case-insensitivity, so if you're searching for Sol but you pass in SOL, if your
CSV contains Sol, that row will be returned. This implementation of search does not
support finding values that differ from what is passed in beyond case insensitivity.

The search class has one other method: getMatches() which returns the list of rows
that contain a match with the search value. This is used for testing purposes but
could be used by a developer going forward if they wanted to do something with the
matches besides just printing them out in terminal. The last thing to note about
the search class is that it handles errors gracefully by catching them and printing
out user friendly messages that can help the user re-run the search method with
better results if an error occurs.

The **Parse class** takes in a Reader object, CreatorFromRow object, and a boolean
specifying whether the object being read has a header. The parse() method is the
contains most of the logic for this class. In summary, the parse() method parses
data by going through each row in the data, converting it to a list of strings, and
then transforms each row into a new data type based ont the instance of the
CreatorFromRow object that is passed in. The Parse class also has a getDataRows()
method that can be used to get the parsed object. Since the parse() method doesn't
return anything, getDataRows() should be used to access the parsed object.

**CreatorFromRow** is an interface that allows classes that implement it to determine
what kind of data each row is transformed into, after being read and parsed into a list
of strings using a regex.

**StringList** is one class that implements the CreatorFromRow interface and represents
each row as a list of Strings.

**IntegerList** is another class that implements the CreatorFromRow interface and
represents each row as a list of Integers.

## Errors/Bugs
None.

## Instructions to Run Program
Open the Main file in the main package (edu.brown.cs.student.main/Main) and
run the file to search with the example search methods. Feel free to change
the CSV file path, the searchValue, the hasHeader argument, and/or the
column identifiers to search your own CSV for a value.

Please note that the CSV file path that is passed in must contain the relative
path of the CSV (i.e. data/realCSVData.csv, not just realCSVData.csv) if the
CSV is not in the same folder as the Main file.

## Instructions to Run Tests
To run tests for the Parse class, open the TestParse file in the test package
and press run.
To run tests for the Parse class, open the TestSearch file in the test package
and press run.

Each testing file has methods within for a variety of tests.