---
title: Postman automatic workflow
pubDate: '2021-11-13'
tags: 
  - postman
---

# Postman component naming
- Collection: contain multiple api template
- Enviroment: setup for api call contain url, parameter, body, header, etc,.
- Pre-script: Javascript work before calling api.
- Test: Javascript work after calling api.

# How to use variable in enviroment
- Using double bracket `` and add variable name in it. e.g. `{{hello}}`, `{{host}}`
- Use it to replace enviroment variables like url, parameter, body, header, etc,.