package edu.brown.cs.student.main.CSVParser.rowtype;

import java.util.List;

/**
 * StringList class implements the CreatorFromRow interface by returning the row represented as a
 * list of strings.
 */
public class StringList implements edu.brown.cs.student.main.CSVParser.rowtype.CreatorFromRow<List<String>> {

  /**
   * Create method takes in a row and converts the values in that row to strings, then returns the
   * list of strings.
   *
   * @param row a row of string values in a list
   * @return a list of Strings representing the row
   */
  @Override
  public List<String> create(List<String> row) {
    return row;
  }
}
