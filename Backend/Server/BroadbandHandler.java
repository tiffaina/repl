package edu.brown.cs.student.main.Server;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Census.BroadbandData;
import edu.brown.cs.student.main.Census.CensusDataSource;
import edu.brown.cs.student.main.Census.DatasourceException;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;
import java.lang.reflect.Type;

public class BroadbandHandler implements Route {
  private CensusDataSource state;
  public BroadbandHandler(CensusDataSource state) { // constructor
    this.state = state;
  }

  /**
   * Handles a request about broadband data
   * @throws Exception This is part of the interface; we don't have to throw anything.
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    // Get the location that the request is for
    String stateName = request.queryParams("state");
    String countyName = request.queryParams("county");

    // Prepare to send a reply
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
    JsonAdapter<BroadbandData> ACSDataAdapter = moshi.adapter(BroadbandData.class);
    Map<String, Object> responseMap = new HashMap<>();

    // Generate the reply
    try {
      // Low-level NWS API invocation isn't the job of this class!
      // Neither is caching!
      BroadbandData data = state.getBroadbandData(stateName, countyName);
      // Building responses is the job of this class:
      responseMap.put("result", "success");

      // Decision point; note the difference here
      responseMap.put("percentage of households with broadband access", ACSDataAdapter.toJson(data));
      responseMap.put("state", stateName);
      responseMap.put("county", countyName);

      return adapter.toJson(responseMap);
    } catch (DatasourceException e) {
      responseMap.put("type", "error");
      responseMap.put("error_type", "datasource");
      responseMap.put("details", e.getMessage());
      return adapter.toJson(responseMap);
    }
  }
}