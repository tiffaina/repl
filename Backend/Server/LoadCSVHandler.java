package edu.brown.cs.student.main.Server;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.main.CSVParser.Parse;
import edu.brown.cs.student.main.rowtype.StringList;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.List;

/**
 * Handler class for the loadCSV API endpoint.
 *
 * This endpoint takes a basic GET request with
 * no Json body, and returns a Json object in reply.
 *
 * Finds CSV, loads it to view & search, returns file so that other handlers can access
 *
 * TODO: what do we load this to?
 *
 */

public class LoadCSVHandler<T> implements Route {

  private String filepath;
  private List<String> header;
  private List<List<String>> parsedCSV;
  private boolean hasHeader;

  /**
   * Constructor accepts some shared state
   *
   */
  public LoadCSVHandler() { // constructor
    // initialize parsed CSV to an empty list,
    // so we can do empty checking instead of null checking
    this.parsedCSV = new ArrayList<>();
//    this.filepath = filepath;
    // call parser & return parsed version to viewCSV & searchCSV
  }


  /**
   * Responses must be serialized as Json strings. To keep the format simple, all responses must be serializations of a Map<String, Object> object. For all replies, the map must contain a "result" field with value "success" in case of success or an error code in the case of an error:
   * "error_bad_json" if the request was ill-formed;
   * "error_bad_request" if the request was missing a needed field, or the field was ill-formed; and
   * "error_datasource" if the given data source wasn't accessible (e.g., the file didn't
   *
   * A response to a loadcsv operation must include a "filepath" field containing the file path requested.
   */

  /**
   * Parse the given CSV
   * @throws Exception This is part of the interface; we don't have to throw anything.
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    this.filepath = request.queryParams("filepath");

    String hasHeaderRaw = request.queryParams("hasHeader");

    // parsing the header
    if (hasHeaderRaw.equalsIgnoreCase("true")) {
      this.hasHeader = true;
      Server.setContainsHeader(true);
    } else if (hasHeaderRaw.equalsIgnoreCase("false")) {
      System.out.println("hasHeader is set to false in load handler");
      this.hasHeader = false;
      Server.setContainsHeader(false);
      System.out.println("containsHeader in server is " + Server.getContainsHeader());
    } else {
      HashMap<String, Object> responseMap = new HashMap<>();
      responseMap.put("result", "error_bad_request");
      responseMap.put("filepath", this.filepath);
      responseMap.put("err_msg", "containsHeader must be true or false")
      return new LoadFailureResponse(responseMap).serialize();
    }

    try {
      FileReader fReader = new FileReader(this.filepath);

      StringList factoryString = new StringList();

      // parse the CSV
      // if it has a header, initialize the header method
      Parse csvParser = new Parse(fReader, factoryString, this.hasHeader);

      this.parsedCSV = csvParser.getDataRows();
      System.out.println("parsed csv is being printed in load class");
      System.out.println(this.parsedCSV);


      if (this.hasHeader) {
        this.header = csvParser.getHeader();
        System.out.println("header is " + this.header);
      }

      Map<String, Object> responseMap = new HashMap<>();
      responseMap.put("result", "success");
      responseMap.put("filepath", this.filepath);
//      responseMap.put("data", this.parsedCSV);

      Server.setCSVData(this.parsedCSV);
      Server.setHeader(this.header);


      return new LoadSuccessResponse(responseMap).serialize();
    } catch (FileNotFoundException e) {
      System.out.println("file not found exception ***");

      Map<String, Object> responseMap = new HashMap<>();
      responseMap.put("result", "err_bad_request");
      responseMap.put("filepath", this.filepath);
      responseMap.put("err_msg", "file not found. please try again. hint: you may have the wrong file path");
      return new LoadFailureResponse(responseMap).serialize();
    }

    catch (Exception e) {
      Map<String, Object> responseMap = new HashMap<>();
      responseMap.put("result", "error_datasource");
      responseMap.put("filepath", this.filepath);
      responseMap.put("err_msg", "some kind of error occured while attempting to load")
      return new LoadFailureResponse(responseMap).serialize();
    }

    // NOTE: beware this "return Object" and "throws Exception" idiom. We need to follow it because
    //   the library uses it, but in general this lowers the protection of the type system.
  }



  /**
   * if the csv successfully loads, then return responseMap in JSON format
   */
  public record LoadSuccessResponse(String response_type, Map<String, Object> responseMap) {
    public LoadSuccessResponse(Map<String, Object> responseMap) {
      this("success", responseMap);
    }

    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<LoadSuccessResponse> adapter = moshi.adapter(LoadSuccessResponse.class);
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

  public record LoadFailureResponse(String response_type, Map<String, Object> responseMap) {
    // return filepath & error message serialized as JSONs
    public LoadFailureResponse(Map<String, Object> responseMap) {
      this("error", responseMap);
    }

    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<LoadFailureResponse> adapter = moshi.adapter(LoadFailureResponse.class);
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

  public List<List<String>> getParsedCSV() {
    return this.parsedCSV;
  }

  public List<String> getHeader() {
    return this.header;
  }
}