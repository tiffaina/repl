package edu.brown.cs.student.main.Server;

import static spark.Spark.after;

import edu.brown.cs.student.main.Census.ACSAPIDataSource;
import edu.brown.cs.student.main.Census.CensusDataSource;
import edu.brown.cs.student.main.Census.DatasourceException;
import java.util.List;
import spark.Spark;

/**
 * Contains the main() method which starts Spark and runs the various handlers.
 * handles getRequests from US census api
 */
public class Server {
  static private List<List<String>> csvData;
  static private List<String> header;
  static private boolean containsHeader;
  private final CensusDataSource state;

  public Server(CensusDataSource toUse) { // constructor
    state = toUse;
    int port = 3232;
    Spark.port(port);
    /*
            Setting CORS headers to allow cross-origin requests from the client; this is necessary for the client to
            be able to make requests to the server.

            By setting the Access-Control-Allow-Origin header to "*", we allow requests from any origin.
            This is not a good idea in real-world applications, since it opens up your server to cross-origin requests
            from any website. Instead, you should set this header to the origin of your client, or a list of origins
            that you trust.

            By setting the Access-Control-Allow-Methods header to "*", we allow requests with any HTTP method.
            Again, it's generally better to be more specific here and only allow the methods you need, but for
            this demo we'll allow all methods.

            We recommend you learn more about CORS with these resources:
                - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
                - https://portswigger.net/web-security/cors
         */
    after((request, response) -> {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Methods", "*");
    });

    // Setting up the handler for the GET /loadCSV, /viewCSV, /searchCSV and /broadband endpoints

    System.out.println("contains header in server 2 is " + containsHeader);
    Spark.get("loadCSV", new LoadCSVHandler());
    Spark.get("viewCSV", new ViewCSVHandler());
    Spark.get("searchCSV", new SearchCSVHandler());
    Spark.get("broadband", new BroadbandHandler(state)); // state is the datasource, allowing us to search the ACSAPI

    Spark.init();
    Spark.awaitInitialization();


  }

  public static void main(String[] args) throws DatasourceException {

    Server server = new Server(new ACSAPIDataSource());
    System.out.println("Server started; exiting main...");

  }

  /**
   * setter to set CSV data, so that loadHandler can pass data to server class
   * @param loadedData    the loaded CSV to initialize the csvData instance var to
   */
  public static void setCSVData(List<List<String>> loadedData) {
    csvData = loadedData;
  }

  /**
   * setter to set CSV header, so that loadHandler can pass data to server class
   * @param loadedHeader    the csv header to initialize the csvData instance var to
   */
  public static void setHeader(List<String> loadedHeader) {
    header = loadedHeader;
  }


  /**
   * setter to let the server class know whether the csv data contains a header
   * @param headerBool      a boolean representing if a header is present or not
   */
  public static void setContainsHeader(boolean headerBool) {
    containsHeader = headerBool;
  }

  /**
   * accesses CSV data
   * @return csvData object representing parsed csv
   */
  public static List<List<String>> getCSVData() {
    return csvData;
  }

  /**
   * accesses csv header
   * @return    header object representing csv header
   */
  public static List<String> getHeader() {
    return header;
  }

  /**
   * accesses a boolean representing if the csv has a header or not
   * @return      a boolean of if the header exists
   */
  public static boolean getContainsHeader() {
    return containsHeader;
  }

}
