package edu.brown.cs.student.main.CSVParser.rowtype;

import java.util.ArrayList;
import java.util.List;

/**
 * IntegerList class implements the CreatorFromRow interface and transforms rows into lists of
 * integers.
 */
public class IntegerList implements
edu.brown.cs.student.main.CSVParser.rowtype.CreatorFromRow<List<Integer>> {

  /**
   * Converts all the objects in a row to integers.
   *
   * @param row the row to convert to a list of integers
   * @return the row represented as a list of integers
   */
  @Override
  public List<Integer> create(List<String> row) {
    System.out.println("running create method in IntegerList");
    List<Integer> convertedRow = new ArrayList<>();
    for (String val : row) {
      try {
        Integer convertedVal = Integer.valueOf(val);
        convertedRow.add(convertedVal);
      } catch (ClassCastException e) {
        System.err.println(
            val
                + " cannot be converted to an integer. Please "
                + "make sure that your CSV includes purely numeric data outside"
                + "of the header when trying to parse it into a list of integers.");
        System.exit(1);
      } catch (NumberFormatException e) {
        System.err.println(
            val
                + " cannot be converted to an integer. Please "
                + "make sure that your CSV contains integers without decimal "
                + "values. ");
        System.exit(1);
      }
    }
    return convertedRow;
  }
}
