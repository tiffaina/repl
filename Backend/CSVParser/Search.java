package edu.brown.cs.student.main.CSVParser;

import edu.brown.cs.student.main.rowtype.StringList;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Search class searches a CSV file for a search value. Users can search the whole file, or can
 * narrow their search to a specific column by passing in the column name or column index they want
 * to refine their search to.
 */
public class Search {
  private List<List<String>> matchingRows;

  public Search() {
    this.matchingRows = new ArrayList<>();
  }


  /**
   * Search method searches a CSV for a given value.
   *
   * @param searchVal the value to search for
   */
  public void search(List<List<String>> parsedCSV, String searchVal) {
      List<List<String>> matches = new ArrayList<>();

      for (List<String> row : parsedCSV) {
        for (String val : row) {
          if (val.equalsIgnoreCase(searchVal)) {
            matches.add(row);
          }
        }
      }
      this.matchingRows = matches;
      // if the search value was not found, print out a user-readable
      // statement instead of empty brackets
      if (matches.isEmpty()) {
        System.out.println("No matches were found for " + searchVal);
        return;
      }
      System.out.println("matches are: " + matches);
      // if the file is not found, print out user-readable statement
  }

  /**
   * Search method searches a CSV for a given search value, refining the search to search only the
   * column matching the column name for each row of the CSV.
   *
   * @param searchVal the value to search for
   * @param colName the column name to refine the search by
   */
  public void search(List<List<String>> parsedCSV, List<String> header, String searchVal, String colName) {

      List<List<String>> matches = new ArrayList<>();

      Integer colIdx = header.indexOf(colName);

      for (List<String> row : parsedCSV) {
        if (row.get(colIdx).equalsIgnoreCase(searchVal)) { // checks val at col
          matches.add(row);
        }
      }
      this.matchingRows = matches;
      if (matches.isEmpty()) {
        System.out.println("No matches were found for " + searchVal);
        return;
      }
      System.out.println("matches are: " + matches); // print out all the matches
  }

  /**
   * Search method searches a CSV for a given search value, refining the search to search only the
   * column with index matching the colIdx for each row of the CSV.
   *
   * @param searchVal the value to search for
   * @param colIdx the column index to refine the search by
   */
  public void search(List<List<String>> parsedCSV, List<String> header, String searchVal, int colIdx) {
      List<List<String>> matches = new ArrayList<>();

      // checking the colIdx for out of bounds errors
      if (colIdx > header.size() - 1) {
        throw new IndexOutOfBoundsException(
            "The column index is greater than the"
                + " number of columns in the CSV. Please check for typos and try again");
      }
      if (colIdx < 0) {
        throw new IndexOutOfBoundsException(
            "The column index cannot be negative. "
                + "Remember, the column index starts at 0 and goes up to the # of "
                + "columns in the CSV -1. Please check for typos and try again.");
      }

      // iterate through each row, searching only the relevant column for matches
      // if there is a match, add the row to the list of matches, which will be
      // printed out
      for (List<String> row : parsedCSV) {
        if (row.get(colIdx).equalsIgnoreCase(searchVal)) {
          matches.add(row);
        }
      }
      if (matches.isEmpty()) {
        System.out.println("No matches were found for " + searchVal);
        return;
      }
      this.matchingRows = matches;
      System.out.println("matches are: "+ matches); // print out all the matches
  }

  /**
   * getMatches method returns all the matching rows. It is an optional feature added for testing.
   * It also provides opportunities for searching to be used in other context (extensibility)
   * including by developers or anyone who may wish to access the matching rows that a search
   * yields.
   *
   * @return a list of the matching rows
   */
  public List<List<String>> getMatches() {
    return this.matchingRows;
  }
}
