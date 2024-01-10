---
title: How to quickly build up monitor system with Prometheus and Grafana
pubDate: '2023-11-27'
tags:
  - prometheus
  - grafana
  - how-to
---


Description
---
When you want to monitor your applications Prometheus and Grafana will be a great one to do this. Here some docker-cli example for quickly build up the monitor system.

Prometheus is a collector which scrap metric data from your application and store it on local or others depend on what kind of configuration you setup. 

Grafana is a displayer which query data from Prometheus and design what kind of chart you want to present.

Prometheus
---

```yaml
scrape_configs:
  - job_name: 'example-scrape'
    # rest url of application after domain
    metrics_path: /some/path/of/application 
    scrape_interval: 10s
    # default value is http, must setup manually to https if needed
    scheme: https  
    authorization:
      credentials: '<token>'
    static_configs:
      - targets:
          # only domain
          - 'example.io'
        labels: 
          # cusomized label for query if needed
          group: 'app'
          run: 'staging'
```


```bash
docker run -d \
    --name=the-prometheus \
    --user 1000:1000 \
    -v <native-folder>:/prometheus \
    -v <native-folder>/prometheus.yml:/etc/prometheus/prometheus.yml \
    -p 9090:9090 \
    prom/prometheus:<some-fixed-version>
```

> Recommend using fixed version of prometheus, becuase different version may having different syntax of prometheus configuration.


Grafana
---

```bash
docker run -d \
    --name=the-grafana \
    --user 1000:1000 \
    -v <native-folder>:/var/lib/grafana \
    -p 3000:3000 \
    grafana/grafana-oss:10.2.0

```


Extra
---
- Get id of user

```bash
id
```



