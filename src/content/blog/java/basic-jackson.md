---
title: Basic Jackson
pubDate: '2022-09-02'
tags:
  - java
  - jackson
---

Abstract
---
This is common library to convert POJOs to json. This artical will helping you quick review and make it handy by few common examples.
Will include:
- Convert from json source into POJOs
- Convert from POJOs into json source
- Configure jackson for trivial setting during conversion
	- Serialization
	- Deserialization
	- JsonParser
	- JsonGenerator
- Common tags for domains

Example
---

```java
public class Test {
	// import com.fasterxml.jackson.databind.ObjectMapper;
	ObjectMapper mapper = new ObjectMapper();

	private void jsonToPojo() {
		// from file to POJO
		MyValue value = mapper.readValue(new File("data.json"), MyValue.class);

		// from external source to POJO
		value = mapper.readValue(new URL("http://some.com/api/entry.json"), MyValue.class);

		// from String to POJO
		value = mapper.readValue("{\"name\":\"Bob\", \"age\":13}", MyValue.class);

		// from String to list which contain POJO
		Map<MyValue> results = mapper.readValue(jsonSource, new TypeReference<List<MyValue>>() {});

		// from String to map which contain POJO
		Map<String, ResultValue> results = mapper.readValue(jsonSource, new TypeReference<Map<String, ResultValue>>() { } );
	}

	private void pojoToJson() {
		// from POJO to json formated file
		mapper.writeValue(new File("result.json"), myResultObject);

		// from POJO to json formated bytes
		byte[] jsonBytes = mapper.writeValueAsBytes(myResultObject);

		// from POJO to json formated String
		String jsonString = mapper.writeValueAsString(myResultObject);
	
	}

	private void configuration() {
		/**
		* SerializationFeature for changing how JSON is written
		*/
		// to enable standard indentation ("pretty-printing"):
		mapper.enable(SerializationFeature.INDENT_OUTPUT);
		// to allow serialization of "empty" POJOs (no properties to serialize)
		// (without this setting, an exception is thrown in those cases)
		mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
		// to write java.util.Date, Calendar as number (timestamp):
		mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

		/**
		* DeserializationFeature for changing how JSON is read as POJOs:
		*/
		// to prevent exception when encountering unknown property:
		mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		// to allow coercion of JSON empty String ("") to null Object value:
		mapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);

		/**
		* JsonParser.Feature for configuring parsing settings:
		*/
		// to allow C/C++ style comments in JSON (non-standard, disabled by default)
		// (note: with Jackson 2.5, there is also `mapper.enable(feature)` / `mapper.disable(feature)`)
		mapper.configure(JsonParser.Feature.ALLOW_COMMENTS, true);
		// to allow (non-standard) unquoted field names in JSON:
		mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
		// to allow use of apostrophes (single quotes), non standard
		mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);

		/**
		* JsonGenerator.Feature for configuring low-level JSON generation:
		*/
		// to force escaping of non-ASCII characters:
		mapper.configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
	}

}


public class SomeDomain {

	@JsonIgnore()
	private String hello;

	@JsonProperty(name = "replacedField")
	private String wolrd;

	// get/set
}
```

Reference
---
- [FasterXML github repository](https://github.com/FasterXML/jackson-databind)