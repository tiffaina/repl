package edu.brown.cs.student.main.Census;

public interface CensusDataSource {
  BroadbandData getBroadbandData(String stateCode, String countyCode) throws DatasourceException;
}
