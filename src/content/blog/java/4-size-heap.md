---
title: 4 Size Heap
pubDate: '2023-11-28'
tags: 
  - java
  - jvm
---

Decription
---
JVM will occupy part of memory of the system. JVM hold memory can be seperate 2 group, heap and non-heap. The heap is the space which will occupy or release memory dynamically while running the application on JVM.

![Alt text for broken image link](/assets/img/java/the-heap.jpg)

Eden
---
New created object will be place in here first till it be remove by GC or move to `survivor space`.

Survivor
---
There is 2 space of `survivor space`. If object go through multiple young space then it will be place to `tenured space`.


Tenured
---
It will grow less quick than young generation and keep longer till GC remove it. 


Virtual
---
Decribe a space which is not used but reserved for `eden space` and `tenured space`
