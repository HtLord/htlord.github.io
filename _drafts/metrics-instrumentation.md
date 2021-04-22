---
layout: post
title: Metric instrumentation
categories: prometheus
---
### 小劇場
Server 上線了，JVM 在 K8s 上運作，常常遇到 memory 爆掉 Pod 被下架重啟的狀況屢屢發生。由於中間多了一層 K8s ，看到的都是 Pod 的長相，
JVM 發生了什麼事情，則一無所知。一氣之下，正式開啟了 metric 的 moniting 日常。

### Index
- 三類服務
    - online-service
    - offline processing
    - batch job
- Subsystem
    - Libraries
    - Logging
    - Failures
    - Threadpools
    - Caches
    - Collectors

### Content

### Reference
- [Prometheus Instrumentation](https://prometheus.io/docs/practices/instrumentation/)

