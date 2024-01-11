---
title: GCP token 驗證過期
pubDate: '2021-11-01'
tags: 
  - gcp
  - token 
---

### ToC

### Description
---
Using service account token to upload file to google storage then get token expiration response message.


```
"error":
    "invalid_grant",
"error_description":
    "Invalid JWT: Token must be a short-lived token"
    "(60 minutes) and in a reasonable timeframe."
    "Check your iat and exp values in the JWT claim."
```

### Solution
---
Checking local machine NTP is sync with google server's date time. In my case, im using `Apple macbook pro` that default using apple NTP server. At the time, the clock on my machine is quicker than others.