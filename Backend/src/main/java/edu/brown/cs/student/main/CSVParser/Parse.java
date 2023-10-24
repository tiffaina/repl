package edu.brown.cs.student.main.CSVParser;


import edu.brown.cs.student.main.CSVParser.rowtype.CreatorFromRow;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Parse class parses a reader object and saves the object as a list of rows, with the row type
 * depending on the CreatorFromRow instance that is used.
 *
 * @param <T> A generic type parameter, so that the dataRows object can be generic, according to a
 *     strategy pattern.
 */
public class Parse<T> {
  private List<T> dataRows;
  private List<String> header; // this is better design
  static final Pattern regexSplitCSVRow =
      Pattern.compile(",(?=([^\\\"]*\\\"[^\\\"]*\\\")*(?![^\\\"]*\\\"))");

  /**
   * Constructor to parse a reader object.
   *
   * @param reader the object from which to read in data
   * @param rowType the type of object each row should be converted into
   * @param hasHeader a boolean of whether the object has a header
   */
  public Parse(Reader reader, CreatorFromRow<T> rowType, boolean hasHeader) {
    this.dataRows = new ArrayList<>();
    this.header = new ArrayList<>();
    this.parse(reader, rowType, hasHeader);
  }

  /**
   * Parse method reads in a reader object, converting each row to a list of strings, and then
   * converting each row to whatever the create method returns. The objects returned are added to
   * dataRows which represents the parsed reader object.
   */
  public void parse(Reader reader, CreatorFromRow<T> creatorFromRow, boolean hasHeader) {
    try {
      // read the csv
      BufferedReader bReader = new BufferedReader(reader);
      /* Go through each line in the reader object, process it, & add it to dataRows. */
      String line;
      int counter = 0;
      while ((line = bReader.readLine()) != null) {
        // breaks row into an array of strings
        List<String> rowData = Arrays.asList(regexSplitCSVRow.split(line));
        // if there is a header, save it to dataRows without converting it
        // through the create method

        if (hasHeader) {
          if (counter == 0) {
            List<String> heading = new ArrayList<>(List.of(line.split(",")));
            this.header = heading;
            counter++;
            continue;
          }
        }

        try {
          // process the rest of the rows using create() & add them to dataRows
          T processedRow = creatorFromRow.create(rowData);
          this.dataRows.add(processedRow);
          counter++;
        } catch (CreatorFromRow.FactoryFailureException e) {
          System.err.println(
              "Factory Failure Exception occurred. Row cannot be "
                  + "added to the parsed object"
                  + rowData);
          System.exit(1);
        }
      }
    } catch (IOException e) {
      System.err.println("An IO Exception occurred");
      System.exit(1);
    }
  }

  /**
   * getDataRows() is a simple getter for dataRows.
   *
   * @return dataRows, the object that represents the parsed reader object
   */
  public List<T> getDataRows() {
      return this.dataRows;
  }

  public List<String> getHeader() {
    return this.header;
  }
}
