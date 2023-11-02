package edu.brown.cs.student.CSVUnitTests;

import edu.brown.cs.student.main.CSVParser.ParseJson;
import edu.brown.cs.student.main.Census.DatasourceException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.testng.Assert;

public class TestJson {

    @Test
    public void testJsonDataContents() {
        String jsonString = "{\"type\": \"Feature\", \"geometry\": {\"type\": \"Point\", \"coordinates\": [125.6, 10.1]}, \"properties\": {\"name\": \"Dinagat Islands\"}}";

        // Parse the JSON data into a structure
        ParseJson parser = new ParseJson();
        try {
            Map<String, Object> jsonMap = parser.parseJson(jsonString);
            Map<String, Object> parsedObject = parser.parseJson(jsonString);
             // Assertions for specific keys and values
            assertEquals("Feature", parsedObject.get("type"));
            Map<String, Object> test = new HashMap<>();
            test.put("type", "Point");
            test.put("coordinates", new Double[]{125.6, 10.1});
            assertEquals(test, parsedObject.get("geometry"));
            
            Map<String, Object> test2 = new HashMap<>();
            test2.put("name", "Dinagat Islands");
            assertEquals(test2, parsedObject.get("properties"));
        } catch (DatasourceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


       

        // Map<String, Object> jsonMap2 = parser.parseJson(jsonString);

        // assertEquals("Feature", jsonMap2.get("type"));
        // assertEquals("Point", ((Map<String, Object>) jsonMap2.get        
        // Map<String, Object> jsonMap = parser.parseJson(jsonString);("geometry")).get("type"));
        // assertEquals(125.6, ((Map<String, Object>) jsonMap.get("geometry")).get("coordinates"));
     

        // assertEquals("Dinagat Islands", ((Map<String, Object>) jsonMap.get("properties")).get("name"));
    }

    @Test
    public void testJsonDataShape() {
        String jsonString = "{\"type\": \"Feature\", \"geometry\": {\"type\": \"Point\", \"coordinates\": [125.6, 10.1]}, \"properties\": {\"name\": \"Dinagat Islands\"}}";

        // Parse the JSON data into a structure
        ParseJson parser = new ParseJson();
        Map<String, Object> jsonMap;
        try {
            jsonMap = parser.parseJson(jsonString);
             assertTrue(jsonMap.containsKey("type"));
            assertTrue(jsonMap.containsKey("geometry"));
            assertTrue(jsonMap.containsKey("properties"));

            Map<String, Object> geometryMap = (Map<String, Object>) jsonMap.get("geometry");
            assertTrue(geometryMap.containsKey("type"));
            assertTrue(geometryMap.containsKey("coordinates"));

            Map<String, Object> propertiesMap = (Map<String, Object>) jsonMap.get("properties");
        } catch (DatasourceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
 
    }


}
