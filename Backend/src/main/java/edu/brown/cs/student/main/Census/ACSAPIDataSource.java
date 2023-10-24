package edu.brown.cs.student.main.Census;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.xml.crypto.Data;
import okio.Buffer;

public class ACSAPIDataSource implements CensusDataSource{
  private boolean stateCodesLoaded;
  private Map<String, String> stateCodes;
  private Map<String, String> countyCodes;
  private String stateCode;
  private String countyCode;

  public ACSAPIDataSource() throws DatasourceException {
    this.stateCodesLoaded = false;
    this.stateCodes = new HashMap<>();
    this.countyCodes = new HashMap<>();
    this.loadStateCodes();
  }
  /**
   * Private helper method; throws IOException so different callers
   * can handle differently if needed.
   */
  private static HttpURLConnection connect(URL requestURL) throws DatasourceException, IOException {
    URLConnection urlConnection = requestURL.openConnection();
    if(! (urlConnection instanceof HttpURLConnection))
      throw new DatasourceException("unexpected: result of connection wasn't HTTP");
    HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
    clientConnection.connect(); // GET
    if(clientConnection.getResponseCode() != 200)
      throw new DatasourceException("unexpected: API connection not success status "+clientConnection.getResponseMessage());
    return clientConnection;
  }

  // store the hashmap in the data source
  // return boolean if it has been loaded
  // makes hashtable of state name -> state code

  /**
   * loads the state codes and saves them as a hashmap
   * @throws DatasourceException
   */
  public void loadStateCodes() throws DatasourceException {
    try {
      URL requestURL = new URL("https", "api.census.gov",
          "/data/2010/dec/sf1?get=NAME&for=state:*");
      HttpURLConnection clientConnection = connect(requestURL);

      Moshi moshi = new Moshi.Builder().build();
      Type type = Types.newParameterizedType(List.class, List.class, String.class);
      JsonAdapter<List<List<String>>> adapter = moshi.adapter(type);

      List<List<String>> stateAndCountyCodes = adapter.fromJson(
          new Buffer().readFrom(clientConnection.getInputStream()));

      for (List<String> row : stateAndCountyCodes) {
        this.stateCodes.put(row.get(0).toLowerCase(), row.get(1));
      }
      this.stateCodes.remove("NAME");
    } catch (IOException e) {
      throw new DatasourceException(e.getMessage());
    }
  }

  /**
   * user passes in the state and county they want to search
   * We get the state code by looking it up in the map, then use that as an
   * api query to find the county code
   * @param state
   * @param county
   */
  public void getStateAndCountyCode(String state, String county) throws DatasourceException{
    try {
      // get the state code from hashmap
      this.stateCode = this.stateCodes.get(state.toLowerCase());

      // find the counties in that state using the statecode
      URL requestURL = new URL("https", "api.census.gov",
          "/data/2010/dec/sf1?get=NAME&for=county:*&in=state:" + this.stateCode);
      HttpURLConnection clientConnection = connect(requestURL);

      Moshi moshi = new Moshi.Builder().build();
      Type type = Types.newParameterizedType(List.class, List.class, String.class);
      JsonAdapter<List<List<String>>> adapter = moshi.adapter(type);

      List<List<String>> countyData = adapter.fromJson(
          new Buffer().readFrom(clientConnection.getInputStream()));

      // get the county code
      for (List<String> row : countyData) {
        if (row.get(0).toLowerCase().contains(county.toLowerCase())) {
          // the county has been found
          this.countyCode = row.get(2);
        }
      }

      if (countyCode.isEmpty()) {
        throw new DatasourceException("error bad request. invalid county provided: " + county);
      }
      if (this.stateCode.isEmpty()) {
        throw new DatasourceException("error bad request. invalid state provided: " + state);
      }

    // https://api.census.gov/data/2021/acs/acs1/subject/variables?get=NAME,S2802_C03_022E&for=county:*&in=state:06
    } catch (IOException e) {
      throw new DatasourceException(e.getMessage());
    }
  }

  public BroadbandData getBroadbandData(String state, String county) throws DatasourceException {
    this.getStateAndCountyCode(state, county);

    try {
      URL requestURL = new URL("https", "api.census.gov", "https://api.census.gov/data/2021" +
          "/acs/acs1/subject/variables?get=NAME,S2802_C03_022E&for=county:" + this.countyCode + "&in=state:"
          + this.stateCode);
      HttpURLConnection clientConnection = connect(requestURL);
      Moshi moshi = new Moshi.Builder().build();
      Type type = Types.newParameterizedType(List.class, List.class, String.class);
      JsonAdapter<List<List<String>>> adapter = moshi.adapter(type);

      List<List<String>> censusResponseData = adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

      if(censusResponseData == null) throw new DatasourceException("Malformed response from given State and County");

      clientConnection.disconnect();

      // https://api.census.gov/data/2021/acs/acs1/subject/variables?get=NAME,S2802_C03_022E&for=county:071&in=state:06
      String broadBandData = censusResponseData.get(1).get(1);

      return new BroadbandData(broadBandData);

    } catch (IOException e) {
      throw new DatasourceException(e.getMessage());
    }

  }


}
