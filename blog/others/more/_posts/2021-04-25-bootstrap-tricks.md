---
layout: post-frame
title: Bootstrap 疑難雜症
tags: more bootstrap trouble-shooting 
---

### Mobile 字型太小
- Add meta to your html 
```html
<html>
  <head>
     <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  ...
</html>
```

### 其他不明版面異常原因
- Add html5 tag
```html
<!doctype html>
<html>
  ...
</html>
```