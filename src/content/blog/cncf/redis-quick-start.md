---
title: Redis Quick Start
pubDate: '2021-09-17'
tags:
  - redis
  - example
---

Brief
---
First of all, you need a redis server. Then you can operate it by client or redis-cli. The list of supported language of client can be found [here](https://redis.io/clients)

How to
---
1. Pull redis image
	```
	docker pull redis:6.2.5
	```
1. Create `Dockerfile` for build your own redis
	```dockerfile
	FROM redis:6.2.5
	COPY redis.conf /usr/local/etc/redis/redis.conf
	CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
	```
1. Copy redis.conf from [offical default redis.conf file](https://raw.githubusercontent.com/redis/redis/6.0/redis.conf)
	```bash
	curl https://raw.githubusercontent.com/redis/redis/6.0/redis.conf > redis.conf
	```
1. (Optional) Add password for default user for preventing every one can access your redis if instance is been expose to internet.
	```text
	...
	requirepass helloredis
	...
	```
1. Build images by docker
	```bash
	docker build -t my-redis -f Dockerfile .
	```
1. Run it in docker
	```bash
	docker run -d -p 6379:6379 --name=my-redis my-redis
	```



Reference
---
- [Redis Command](https://redis.io/commands)
- [Redis Client](https://redis.io/clients)