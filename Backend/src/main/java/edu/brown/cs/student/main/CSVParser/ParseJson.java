package edu.brown.cs.student.main.CSVParser;

import java.io.FileReader;
import java.io.IOException;
import java.util.Map;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.JsonReader;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;

import java.lang.reflect.Type;

import edu.brown.cs.student.main.Census.DatasourceException;

public class ParseJson {
    static Map<String, Object> jsonData;

    public ParseJson() {}

    public Map<String, Object> parseJson(String filepath) throws edu.brown.cs.student.main.Census.DatasourceException {
        Moshi moshi = new Moshi.Builder().build();
        Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
        try {
        Map<String, Object> jsonMap = adapter.fromJson(filepath);
        jsonData = jsonMap;
        return jsonMap;
        } catch (IOException e) { 
            throw new DatasourceException(e.getMessage()); }
    

    }
}
