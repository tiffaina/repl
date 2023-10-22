package edu.brown.cs.student.main.Server;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.main.CSVParser.Search;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;
import java.lang.*;

import java.util.List;

public class SearchCSVHandler implements Route {


  public SearchCSVHandler() {}

  /**
   * Handles a search request
   * @throws Exception This is part of the interface; we don't have to throw anything.
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    System.out.println("search handler was run");
    List<List<String>> listRows = Server.getCSVData();
    List<String> header = Server.getHeader();
    boolean containsHeader = Server.getContainsHeader();
    try {

      System.out.println("the header in searchCSV is " + header);
      System.out.println("the parsedCSV body in searchCSV is " + listRows);

      Search csvSearcher = new Search();

      String searchVal = request.queryParams("searchVal");
      String colIdentifier = request.queryParams("colIdentifier");

      // if there is no colIdentifier (meaning the user does not want to refine by a certain column),
      // then just search the body of the CSV for the searchVal
      if (colIdentifier.equalsIgnoreCase("none")) {
        System.out.println("searching without a col identifier was run");
        csvSearcher.search(listRows, searchVal);
        List<List<String>> matches = csvSearcher.getMatches();

        Map<String, Object> responseMap = new HashMap<>();

        if (containsHeader) {
          listRows.add(0, header);
        }
        responseMap.put("result", "success");
        responseMap.put("data", listRows);
        responseMap.put("matches", matches);
        responseMap.put("searchVal", searchVal);
        responseMap.put("colIdentifier", colIdentifier);
        return new SearchCSVSuccessResponse(responseMap).serialize();
      } else {
        // if the user wants to refine the search by a column name or index
        try {
          // see if the column identifier was an index (integer)
          // if so, convert from string to integer
          if (containsHeader) { // making sure the header exists
            Integer colIdx = Integer.parseInt(colIdentifier);
            csvSearcher.search(listRows, header, searchVal, colIdx);
            List<List<String>> matches = csvSearcher.getMatches();

            Map<String, Object> responseMap = new HashMap<>();


            if (containsHeader) {
              listRows.add(0, header);
            }
            responseMap.put("result", "success");
            responseMap.put("data", listRows);
            responseMap.put("matches", matches);
            responseMap.put("searchVal", searchVal);
            responseMap.put("colIdentifier", colIdentifier);
            return new SearchCSVSuccessResponse(responseMap).serialize();
          }
          // if the column identifier cannot be parsed into an integer, then it might be
          // a string of the column name
        } catch (NumberFormatException e) {
          // lastly, to ensure that the colIdentifier exists in the header
          // and that the header exists, run a final if statement

        }
        if (header.contains(colIdentifier) && containsHeader) {
          System.out.println("\nsearching with col identifier " + colIdentifier + "in our test");
          csvSearcher.search(listRows, header, searchVal, colIdentifier);
          List<List<String>> matches = csvSearcher.getMatches();

          Map<String, Object> responseMap = new HashMap<>();


          if (containsHeader) {
            listRows.add(0, header);
          }
          responseMap.put("result", "success");
          responseMap.put("data", listRows);
          responseMap.put("matches", matches);
          responseMap.put("searchVal", searchVal);
          responseMap.put("colIdentifier", colIdentifier);
          return new SearchCSVSuccessResponse(responseMap).serialize();
          // if the colIdentifier cannot be parsed into an Integer and it doesn't
          // exist in the header, return error_bad_request
        } else {
          Map<String, Object> responseMap = new HashMap<>();
          responseMap.put("result", "error_bad_request");
          responseMap.put("err_msg", "the colIdentifier " + colIdentifier + " was not in header");
          responseMap.put("colIdentifier", colIdentifier);
          responseMap.put("header", header);
          return new SearchCSVFailureResponse(responseMap).serialize();
        }
      }


    } catch (NullPointerException e) { // it will be null if it's never loaded
      System.out.println("see line 92 of SearchHandler -- null pointer error occured bc "
          + "CSV was not loaded before search eas run");
      Map<String, Object> responseMap = new HashMap<>();
      responseMap.put("result", "error");
      return new SearchCSVFailureResponse(responseMap).serialize();

    } catch (Exception e) {
      Map<String, Object> responseMap = new HashMap<>();
      responseMap.put("result", "error");
      responseMap.put("err_msg", "an error occurred when searching the CSV");
      return new SearchCSVFailureResponse(responseMap).serialize();

    }
    // NOTE: beware this "return Object" and "throws Exception" idiom. We need to follow it because
    //   the library uses it, but in general this lowers the protection of the type system.
//    Map<String, Object> responseMap = new HashMap<>();
//    responseMap.put("result", "error_csv_not_loaded");
//    return new SearchCSVSuccessResponse(responseMap).serialize();
  }


  /**
   * if the csv is successfully searched, then return responseMap in JSON format
   */
  public record SearchCSVSuccessResponse(String response_type, Map<String, Object> responseMap) {
    public SearchCSVSuccessResponse(Map<String, Object> responseMap) {
      this("success", responseMap);
    }

    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<SearchCSVSuccessResponse> adapter = moshi.adapter(
            SearchCSVSuccessResponse.class);
        return adapter.toJson(this);
      } catch(Exception e) {
        // For debugging purposes, show in the console _why_ this fails
        // Otherwise we'll just get an error 500 from the API in integration
        // testing.
        e.printStackTrace();
        throw e;
      }
    }
  }

  public record SearchCSVFailureResponse(String response_type, Map<String, Object> responseMap) {
    // return filepath & error message serialized as JSONs
    public SearchCSVFailureResponse(Map<String, Object> responseMap) {
      this("error", responseMap);
    }

    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<SearchCSVFailureResponse> adapter = moshi.adapter(
            SearchCSVFailureResponse.class);
        return adapter.toJson(this);
      } catch(Exception e) {
        // For debugging purposes, show in the console _why_ this fails
        // Otherwise we'll just get an error 500 from the API in integration
        // testing.
        e.printStackTrace();
        throw e;
      }

    }
  }


}