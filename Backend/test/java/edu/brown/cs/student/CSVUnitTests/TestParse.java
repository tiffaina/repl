package edu.brown.cs.student.CSVUnitTests;

import edu.brown.cs.student.main.CSVParser.rowtype.IntegerList;
import edu.brown.cs.student.main.CSVParser.Parse;
import edu.brown.cs.student.main.rowtype.StringList;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.testng.Assert;

public class TestParse {

  /** Testing Parse Class */

  /**
   * Tests a general case of Parse
   *
   * @throws FileNotFoundException if the passed in csv is not found
   */
  @Test
  public void testParse() throws FileNotFoundException {
    // init parser
    FileReader fReader = new FileReader("data/stars/ten-star.csv");
    StringList stringList = new StringList();
    Parse parser = new Parse(fReader, stringList, true);
    List<List<String>> dataRows = parser.getDataRows();

    // tests that the heading returns what we expect
    List<String> topRow = parser.getHeader(); // list of strings
    List<String> colHeader = new ArrayList<>(List.of("StarID", "ProperName", "X", "Y", "Z"));
    Assert.assertEquals(topRow, colHeader);

    // tests that a random row returns what we expect
    List<String> thirdRow = dataRows.get(5); // list of strings
    List<String> expected =
        new ArrayList<>(List.of("70667", "Proxima Centauri", "-0.47175", "-0.36132", "-1.15037"));
    Assert.assertEquals(thirdRow, expected);
  }

  /**
   * Tests that parse can parse an object and return a list of integers, when the input CSV has a
   * header
   *
   * <p>(Satisfies requirement of using multiple creatorFromRow classes to extract data in multiple
   * CSV formats)
   *
   * @throws FileNotFoundException if the CSV file path is invalid
   */
  @Test
  public void testParseIntData() throws FileNotFoundException {
    FileReader fReader = new FileReader("data/integerdata/intData1.csv");
    IntegerList intList = new IntegerList();
    Parse parser = new Parse(fReader, intList, true);

    List<List<Integer>> dataRows = parser.getDataRows();
    List<Integer> row1 = dataRows.get(0);
    List<Integer> expectedRow1 = new ArrayList<>(List.of(72, 100000, 600000));

    Assert.assertEquals(row1, expectedRow1);
  }

  /**
   * Tests that parse can parse an object and return a list of integers, when the input CSV does not
   * have a header
   *
   * <p>(Satisfies requirement of using multiple creatorFromRow classes to extract data in multiple
   * CSV formats)
   *
   * @throws FileNotFoundException if the CSV file path is invalid
   */
  @Test
  public void testParseIntDataNoHeader() throws FileNotFoundException {
    FileReader fReader = new FileReader("data/integerdata/intDataNoHeader.csv");
    IntegerList intList = new IntegerList();
    Parse parser = new Parse(fReader, intList, false);
    List<List<Integer>> dataRows = parser.getDataRows();

    List<Integer> actual = dataRows.get(0);
    Integer one = 1;
    List<Integer> expected = new ArrayList<>(List.of(one, one, one));

    Assert.assertEquals(actual, expected);
  }

  /** Tests that parser can parse data from a string reader */
  @Test
  public void testParseStringReader() {
    StringReader sReader = new StringReader("String 1,String 2,String 3,String 4,String 5");
    StringList stringList = new StringList();
    Parse parser = new Parse(sReader, stringList, false);
    List<List<String>> dataRows = parser.getDataRows();
    List<String> topRow = dataRows.get(0);

    List<String> expected =
        new ArrayList<>(List.of("String 1", "String 2", "String 3", "String 4", "String 5"));

    Assert.assertEquals(topRow, expected);
  }


  @Test
  public void testParseRICityIncomeData() throws FileNotFoundException {
    FileReader fReader = new FileReader("data/census/RI_Income_ACS_5Year_Estimates.csv");
    StringList stringList = new StringList();
    Parse parser = new Parse(fReader, stringList, true);
    List<List<String>> dataRows = parser.getDataRows();
    List<String> csvHeader = parser.getHeader();
    List<String> topRow = dataRows.get(0);

    List<String> expectedHeader =
        new ArrayList<>(List.of("City/Town", "Median Household Income ", "Median Family Income", "Per Capita Income"));

    Assert.assertEquals(csvHeader, expectedHeader);

    List<String> expectedRow = new ArrayList<>(List.of("Rhode Island", "\"74,489.00\"", "\"95,198.00\"", "\"39,603.00\""));

    Assert.assertEquals(topRow, expectedRow);
  }


}