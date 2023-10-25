package edu.brown.cs.student.main.Server;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import com.squareup.moshi.adapters.PolymorphicJsonAdapterFactory;
import edu.brown.cs.student.main.Server.LoadCSVHandler.LoadFailureResponse;
import edu.brown.cs.student.main.Server.LoadCSVHandler.LoadSuccessResponse;
import java.io.FileReader;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;


import java.util.List;
import java.util.Set;

/**
 * Handler class for the viewCSV API endpoint.
 *
 * This endpoint takes a basic GET request with
 * no Json body, and returns a Json object in reply.
 *
 * gets parsed CSV to view
 *
 * TODO: which sends back the entire CSV file's contents as a Json 2-dimensional array.
 * A successful viewcsv or searchcsv operation must contain a "data" field with a serialized
 * List<List<String>> value containing the contents of the CSV.
 *
 */

public class ViewCSVHandler implements Route {

  /**
   * Constructor accepts some shared state
   *
   */
  public ViewCSVHandler() {}


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
  public Object handle(Request request, Response response) {
    try {
  //    this.filepath = request.queryParams("filepath");
      List<List<String>> listRows = Server.getCSVData();
      List<String> header = Server.getHeader();
      boolean containsHeader = Server.getContainsHeader();
      System.out.println("the header in viewCSV is " + header);
      System.out.println("the parsedCSV body in viewCSV is " + listRows);

      if (listRows.size() > 0) {
        if (containsHeader) {
                // Append the header to listRows only if it's not already included
                if (!listRows.isEmpty() && !listRows.get(0).isEmpty() && !listRows.get(0).equals(header)) {
                    listRows.add(0, header);
                }
            

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("result", "success");
            responseMap.put("data", listRows);

            return new ViewSuccessResponse(responseMap).serialize();
        
        } else {
          Map<String, Object> responseMap = new HashMap<>();
          responseMap.put("result", "success");
          responseMap.put("data", listRows);

          return new ViewSuccessResponse(responseMap).serialize();}
        
      } else {
        Map<String, Object> responseMap = new HashMap<>();
        System.out.println("this was run");
        responseMap.put("result", "error_csv_not_loaded");
        return new ViewFailureResponse(responseMap).serialize();
      }
    } catch (Exception e) {
      Map<String, Object> responseMap = new HashMap<>();
      responseMap.put("result", "error_csv_not_loaded");
      return new ViewFailureResponse(responseMap).serialize();
    }

    // NOTE: beware this "return Object" and "throws Exception" idiom. We need to follow it because
    //   the library uses it, but in general this lowers the protection of the type system.
  }




  /**
   * if the csv successfully loads, then return reponseMap in JSON format
   */
  public record ViewSuccessResponse(String response_type, Map<String, Object> responseMap) {
    public ViewSuccessResponse(Map<String, Object> responseMap) {
      this("success", responseMap);
    }

    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<ViewCSVHandler.ViewSuccessResponse> adapter = moshi.adapter(
            ViewCSVHandler.ViewSuccessResponse.class);
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

  public record ViewFailureResponse(String response_type, Map<String, Object> responseMap) {
    // return filepath & error message serialized as JSONs
    public ViewFailureResponse(Map<String, Object> responseMap) {
      this("error", responseMap);
    }

    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<ViewCSVHandler.ViewFailureResponse> adapter = moshi.adapter(
            ViewCSVHandler.ViewFailureResponse.class);
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