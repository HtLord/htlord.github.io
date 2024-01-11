---
title: Spring MockMVC for API Testing
pubDate: '2021-11-30'
tags:
  - spring
  - test
---

Descript
---
Using Mock MVC to simulate client fire http request to server. And focus on api logic rather than whole spring mvc flow.

Steps
---
1. Create a method with `Before` annotation for mocking api
1. Init mock, resource, and chaining api flow for mock in method which is previous step described
1. Declare variables for resource

Example
---

```java
import org.springframework.test.web.servlet.MockMvc;

class MockApiTest() {

	private MockMvc mvc;

	@Autowired
	private MappingJackson2HttpMessageConverter jacksonMessageConverter;

	/**
		(optional)
		Helping you to map response from byte[] to object. Otherwise, you need to use `ResultActions` and `MockMvcResultMatchers` to compare data.
		It will demonstrate later.
	**/
	@Autowired
	private ObjectMapper objectMapper;

	/**
		(optional)
		Just example for you to understand that there is lots of thing can be configured by set object into mvc for api call flow.
	**/
    @Autowired
    protected PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private HelloService helloService;

    @Autowired
    private WordService wordService;

    @Autowired
    private YoloRepository yoloRepository;

    @Before
    public void setup() {
    	// Init mock for test
 		MockitoAnnotations.initMocks(this);
 		        
 		// Here is an example of your resource in project
        final HelloResource resource = new HelloResource(
        	helloService,
        	wordService,
        	yoloRepository
        );

        // Chaning flow to your resource a.k.a add middleware around your resource
        this.mvc = MockMvcBuilders.standaloneSetup(resource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .build();   	
    }

    @Test
    public void simplePostTest() {
    	// Mocking frontend sending data
    	Hello hello = new Hello();

    	// Build request with your own config like header, body, etc,. 
    	MockHttpServletRequestBuilder requestBuilder = post("/api/hello")
            .contentType(APPLICATION_JSON)
            .content(objectMapper.writeValueAsBytes(hello));

        // Fire request to resource
        ResultActions resultActions = this.mvc.perform(requestBuilder);

        // For convenient use `objectMapper` to parse response body(will be byte[]) to object for assert something
        Hello responseBody = objectMapper.readValue(
            resultActions.andReturn().getResponse().getContentAsByteArray(),
            Hello.class
        );

        // Add assert for test
    }

    @Test
    public void simpleGetTest() {
    	// Build request with your own config like header, body, etc,. 
        MockHttpServletRequestBuilder requestBuilder = get("/api/hello")
            .contentType(APPLICATION_JSON)
            .param("some.query.string", "some.value");

        // Fire request to resource
        ResultActions resultActions = this.mvc.perform(requestBuilder);

        // For convenient use `objectMapper` to parse response body(will be byte[]) to object for assert something
        List<Hello> hellos = objectMapper.readValue(
            resultActions.andReturn().getResponse().getContentAsString(),
            new TypeReference<List<Hello>>() {}
        );

        // Add assert for test
    }
}
```
