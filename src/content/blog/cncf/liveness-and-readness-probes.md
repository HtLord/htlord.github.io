---
title: Liveness and Readiness probes
pubDate: '2021-11-01'
tags: 
  - k8s
  - monitoring
---

# Description
---
### Liveness probe
Let k8s know your app is available to send request to, or not.

### Readiness probe
Let k8s know your app is alive or dead to decide kill, restart, etc,.


### Three method to apply Liveness and Readiness probes
- CMD
- TCP
- HTTP

### Example
- Liveness probe with cmd
   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     labels:
   	   test: probes
   	 name: cmd-probes
   spec:
   	 containers:
   	 - name: test
   	   image: busybox
   	   args:
   	   - /bin/sh
   	   - -c
   	   - touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep
   	livenessProbe:
      exec:
      	command:
      	- cat
      	- /tmp/healthy
      	initalDelaySeconds: 5
      	periodSeconds: 5
   ```
   Container will create file in `/tmp/healthy` while container is up. After 30 secs it will remove file. In this case, liveness probe is depend on container file `/tmp/healthy` and using `cat` command response code as probe to tell k8s it's alive, or not. In timeline visual will looks like:
   ```text
   0-----5-----10-----...-----30-----35-----...----->
   |     |     |              |      |
   |     |     |              |      v
   |     |     |              |      due to file is removed then probe will tell k8s this app is dead
   |     |     |              v
   |     |     |              container remove file but probe not working yet
   v     v     v     
   create file and liveness probe will be healthy because file still there

   ```

# Reference
---
- [Google liveness and readiness](https://cloud.google.com/blog/products/containers-kubernetes/kubernetes-best-practices-setting-up-health-checks-with-readiness-and-liveness-probes)