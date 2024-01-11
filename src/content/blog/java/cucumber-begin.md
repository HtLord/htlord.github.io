---
title: API BDD with cucumber
pubDate: '2021-12-28'
tags: 
  - java
  - cucumber
  - bdd
---

Abstruct
---
Here we using JUnit to run bdd. It can be setup like plan JUnit then add on more annotation to define steps.


Features
---

| Name | Description |
|-|-|
| Features		 | Files that define what scenario should be |
| StepDefinition | Implementation of scenario which defined in features |
| InfoHolder	 | Global variable for store object temprary during scenario |
| DataTableType  | For adding multiple records to steps |
| ParameterType  | Customize meaning words for usage in steps definition |


Steps
---

1. Create feature file and define scenarioes
1. Implement step definition which defined in feature files


Example
---

```bash
# Recommend using addon to color different section for increase productive
Feature: test feature scenario
	Scenario Outline: scenario 1
		# Here will use DataTableType in UserStepDefinition
        Given: Create user
            | id | name | activated |
            |  1 |    A | 	   true | 
            |  2 |    B | 	  false | 
            |  3 |    C | 	   true | 
        Then: check search only by <Activated>
        Examples:
            | Activated |
            | true      |
            | false 	|
```


```java
@Component
@ScenarioScope
public UserHolder {

	private Long id;

	private String name;

	private boolean activated;

	// Gets/Sets
	// ...
}

public UserStepDefinition {
	@Autowired
	private SomeService sometimes;

	@Autowired
	private SomeRepository someRepository;

	@Before
	public void setup() {
		// do something like setup mock mvc.
	}

	@DataTableType
	public User user(Map<String, String> entry) {
		// do something, recommend using MapStruct to save your time
	}

	/**
	*	If you define data table type then it will auto find and call the method which defined arg is
	**/
	@Given("Create user")
	public void createUser(User user) {
		// do some business logic
	}
}
```

Problems
---
- Sometimes it will report no fail but senario seems not working. There may senoario name is not matching to your operation cli.