---
title: Spring Configurations 
pubDate: '2022-09-07'
tags: 
  - spring
---


Example
---

```yaml
gcp:
	flatten: "flatten here"
	nested:
		inside-field: "nexted inside field value"
		another-inside-field: 5
```

```java
@Data
@Configuration
@ConfigurationProperties(prefix = "gcp")
public class GcpProperties {
	private String flatten;
	private Nested nested;

	GcpProperties() { }

	public static class Nested {
		String insideField;
		Integer anotherInsideField
	}
}
```