---
title: Tips for Spring Testing
pubDate: '2023-12-16'
tags: 
  - spring
---

Brief
---

- Manually add @Autowired for DI rather by constructor
- Manually add package to load beans
- Maunally setup application-dev.yaml for test enviroment
- Running gradle on terminal and IDE is different enviroment setup.
- Clean up cache of IDE it helps sometime.


Decription
---

TDD is good. But sometimes it is frustrating when doing test on Spring Framework. Becuase the framework itself is huge and complex mechanism. More, it has different setup and behavior on test sid and production side. According to its' difficulty, keep the track of TDD is not a easy thing. So, here is little helpful tips for moments while test is broken.