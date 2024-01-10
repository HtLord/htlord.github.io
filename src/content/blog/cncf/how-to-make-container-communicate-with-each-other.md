---
title: How to make container communicate with each other
pubDate: '2023-11-25'
tags:
  - docker
  - how-to
  - network
---

Description
---
This article will demonstrate how to make container-container communication throught bridge and container-native throught dns.


Container-Container Communication
---

1. Create a bridge
1. Binding bridge to container-a
1. Inspect ip of container-a from the bridge
1. Binding bridge to container-b
1. Setup rest of configuration of container-b

```bash
docker network create my-bridge
docker network connect my-bridge container-a
# You can found ip of container in my-bridge and descript network details about the container
docker network inspect my-bridge
docker network connect my-bridge container-b
# Now you can setup ip into your container-b
```

Container-Native Communication
---

1. Running native application
1. Setup container connection to native application

### Description
Assume you running redis on native machine with port, 6379. Then you want container be able to communicate with the redis. In this case you only need to set url to `host.docker.internal` in the container.
