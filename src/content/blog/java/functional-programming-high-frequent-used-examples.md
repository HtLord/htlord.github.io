---
title: Functional Programming - High Frequent Used Examples 
pubDate: '2024-07-22'
tags:
  - java
  - functional programming
---


Abstract
---
The is some handy receipt for map, list converstion in stream.


Examples
---
```java
import com.google.common.collect.Lists;

class Element {

    public Long id;
    public String name;
    public Integer value;

    public static main(String[] args) {

        // Aggregate elements of multiple list into single list
        var List<List<Element>> multipleList = 
            Lists.newArrayList(
                Lists.newArrayList(
                    new Element(1L, "A", 10),
                    new Element(2L, "B", 20)
                ),
                Lists.newArrayList(
                    new Element(3L, "C", 30),
                ),
                Lists.newArrayList(),
                Lists.newArrayList(
                    new Element(4L, "D", 40),
                    new Element(5L, "E", 50),
                    new Element(6L, "F", 60),
                    new Element(7L, "G", 70),
                ),
            );
        var List<Element> singleList =
            multipleList.stream()
                .flatMap()
                .stream()
                .collect(Collector.toList());

        // Grouping by id and become a map
        var List<Element> examples =
            Lists.newArrayList(
                new Element(1L, "A", 10),
                new Element(2L, "B", 20),
                new Element(3L, "A", 50)
            );
        examples.stream()
            .collect(groupingBy(Element))
    }
}
```
