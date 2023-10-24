package edu.brown.cs.student.main.CSVParser.rowtype;

import java.util.ArrayList;
import java.util.List;

/**
 * This interface defines a method that allows your CSV parser to convert each row into an object of
 * some arbitrary passed type.
 *
 * <p>Your parser class constructor should take a second parameter of this generic interface type.
 */
public interface CreatorFromRow<T> {

  /**
   * create method takes in a row and transforms it, returning something of type T.
   *
   * @param row a row as a list of Strings
   * @return a new representation of that row, of type T
   * @throws FactoryFailureException thrown if errors related to transforming the row occur
   */
  T create(List<String> row) throws FactoryFailureException;

  /**
   * This is an error provided to catch any error that may occur when you create an object from a
   * row. Feel free to expand or supplement or use it for other purposes.
   */
  class FactoryFailureException extends Exception {
    final List<String> row;

    public FactoryFailureException(String message, List<String> row) {
      super(message);
      this.row = new ArrayList<>(row);
    }
  }
}
