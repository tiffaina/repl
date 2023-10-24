package edu.brown.cs.student.CSVUnitTests;

import edu.brown.cs.student.main.CSVParser.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.testng.Assert;
import edu.brown.cs.student.main.CSVParser.rowtype.StringList;


public class TestSearch {

  /** Tests the search case where there is a header and no column identifier is passed. in */
  @Test
  public void testSearch() throws FileNotFoundException {
    FileReader fReader = new FileReader("data/stars/stardata.csv");
    StringList factoryString = new StringList();

    Parse parser = new Parse(fReader, factoryString, true);
    List<List<String>> parsedCSV = parser.getDataRows();

    Search searcher = new Search();
    searcher.search(parsedCSV, "Sol");
    List<List<String>> searchResults = searcher.getMatches();
    List<String> innerList = new ArrayList<>(List.of("0", "Sol", "0", "0", "0"));
    List<List<String>> expectedResults = new ArrayList<>(List.of(innerList));
    Assert.assertTrue(searchResults.equals(expectedResults));
  }

  /** Tests search case where there is a header and the column name is passed in. */
  @Test
  public void testSearchColName() throws FileNotFoundException {

    FileReader fReader = new FileReader("data/stars/stardata.csv");
    StringList factoryString = new StringList();

    Parse parser = new Parse(fReader, factoryString, true);
    List<List<String>> parsedCSV = parser.getDataRows();
    List<String> csvHeader = parser.getHeader();

    Search searcher = new Search();
    searcher.search(parsedCSV, csvHeader, "Sol", "ProperName");
    List<List<String>> searchResults = searcher.getMatches();
    List<String> innerList = new ArrayList<>(List.of("0", "Sol", "0", "0", "0"));
    List<List<String>> expectedResults = new ArrayList<>(List.of(innerList));
    Assert.assertTrue(searchResults.equals(expectedResults));
  }

  /** Tests search case where there is a header and the column index is passed in. */
  @Test
  public void testSearchColIdx() throws FileNotFoundException {
    FileReader fReader = new FileReader("data/stars/stardata.csv");
    StringList factoryString = new StringList();

    Parse parser = new Parse(fReader, factoryString, true);
    List<List<String>> parsedCSV = parser.getDataRows();
    List<String> csvHeader = parser.getHeader();

    Search searcher = new Search();
    searcher.search(parsedCSV, csvHeader, "Sol", 1);
    List<List<String>> searchResults = searcher.getMatches();
    List<String> innerList = new ArrayList<>(List.of("0", "Sol", "0", "0", "0"));
    List<List<String>> expectedResults = new ArrayList<>(List.of(innerList));
    Assert.assertTrue(searchResults.equals(expectedResults));
  }

  /** Tests search where there is no header and no column identifier is passed in */
  @Test
  public void testSearchNoHeader() throws FileNotFoundException {
    FileReader fReader = new FileReader("data/stars/stardata.csv");
    StringList factoryString = new StringList();

    Parse parser = new Parse(fReader, factoryString, false);
    List<List<String>> parsedCSV = parser.getDataRows();
    List<String> csvHeader = parser.getHeader();

//    Assert.assertNull(csvHeader);

    Search searcher = new Search();
    searcher.search(parsedCSV, "Sol");
    List<List<String>> searchResults = searcher.getMatches();
    List<String> innerList = new ArrayList<>(List.of("0", "Sol", "0", "0", "0"));
    List<List<String>> expectedResults = new ArrayList<>(List.of(innerList));
    Assert.assertTrue(searchResults.equals(expectedResults));
  }

  /**
   * Tests search where there is a header, no column identifier is passed in, and the searchValue of
   * the string is matches a value in the CSV but with different capitalization
   */
  @Test
  public void testSearchCaseInsensitive() throws FileNotFoundException {
    FileReader fReader = new FileReader("data/stars/stardata.csv");
    StringList factoryString = new StringList();

    Parse parser = new Parse(fReader, factoryString, true);
    List<List<String>> parsedCSV = parser.getDataRows();
    List<String> csvHeader = parser.getHeader();

    Search searcher = new Search();
    searcher.search(parsedCSV, "SOL");
    List<List<String>> searchResults = searcher.getMatches();
    List<String> innerList = new ArrayList<>(List.of("0", "Sol", "0", "0", "0"));
    List<List<String>> expectedResults = new ArrayList<>(List.of(innerList));
    Assert.assertTrue(searchResults.equals(expectedResults));
  }

  /** Test search where the searchVal doesn't exist in the csv */
  @Test
  public void testSearchValNotThere() throws FileNotFoundException {
    FileReader fReader = new FileReader("data/stars/stardata.csv");
    StringList factoryString = new StringList();

    Parse parser = new Parse(fReader, factoryString, true);
    List<List<String>> parsedCSV = parser.getDataRows();
    List<String> csvHeader = parser.getHeader();

    Search searcher = new Search();
    searcher.search(parsedCSV, "heeby jeebies");
    List<List<String>> searchResults = searcher.getMatches();
    Assert.assertTrue(searchResults.size() == 0);
  }

  /** Test search where a value is present, but is in the wrong column */
  @Test
  public void testSearchValWrongCol()  throws FileNotFoundException {
    FileReader fReader = new FileReader("data/stars/stardata.csv");
    StringList factoryString = new StringList();

    Parse parser = new Parse(fReader, factoryString, true);
    List<List<String>> parsedCSV = parser.getDataRows();
    List<String> csvHeader = parser.getHeader();

    // establishes that searchVal is in the CSV
    Search searcher = new Search();
    searcher.search(parsedCSV, "Sol");
    List<List<String>> searchResults1 = searcher.getMatches();
    List<String> innerList = new ArrayList<>(List.of("0", "Sol", "0", "0", "0"));
    List<List<String>> expectedResults = new ArrayList<>(List.of(innerList));
    Assert.assertTrue(searchResults1.equals(expectedResults));

    // shows that there are no matches when the wrong col is searched w/ colName
    // implementation
    searcher.search(parsedCSV, csvHeader, "Sol", "Y");
    List<List<String>> searchResults2 = searcher.getMatches();
    Assert.assertTrue(searchResults2.isEmpty());

    // shows that there are no matches when the wrong col is searched w/ colIdx
    // implementation
    searcher.search(parsedCSV, csvHeader, "Sol", 3);
    List<List<String>> searchResults3 = searcher.getMatches();
    Assert.assertTrue(searchResults3.isEmpty());
  }

  /**
   * This tests that out of bounds errors are called as expected when various indexes are passed
   * into search
   */
  @Test
  public void testOutOfBoundsErrors() throws FileNotFoundException {
    FileReader fReader = new FileReader("data/stars/ten-star.csv");
    StringList factoryString = new StringList();

    Parse parser = new Parse(fReader, factoryString, true);
    List<List<String>> parsedCSV = parser.getDataRows();
    List<String> csvHeader = parser.getHeader();

    // case 1: colIdx > num columns
    boolean idxTooLarge = false;
    try {
      Search searcher = new Search();
      searcher.search(parsedCSV, csvHeader, "Sol", 20);
    } catch (IndexOutOfBoundsException e) {
      idxTooLarge = true;
    }
    Assert.assertTrue(idxTooLarge);

    // case 2: colIdx < 0
    boolean idxBelowZero = false;
    try {
      Search searcher = new Search();
      searcher.search(parsedCSV, csvHeader, "Sol", -5);
    } catch (IndexOutOfBoundsException e) {
      idxBelowZero = true;
    }
    Assert.assertTrue(idxBelowZero);

    // case 3: correct input for colIdx
    boolean idxInRange = true;
    try {
      Search searcher = new Search();
      searcher.search(parsedCSV, csvHeader, "Sol", 3);
    } catch (IndexOutOfBoundsException e) {
      idxInRange = false;
    }
    Assert.assertTrue(idxInRange);
  }
}