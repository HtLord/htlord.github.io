---
title: Model Driven Design - DDD
pubDate: '2024-01-03'
tags: 
  - mdd
  - ddd
  - mental
---


Description
---
- Associations
- Entity
- Value Object
- Service
- Module


Association
---
- 描述資料與資料間的關係，one-to-one, one-to-many, many-to-many
- 關係複雜度由低到高，分別為，one-to-one, one-to-many, many-to-many
- 分析需求，只留下需要的關聯性，並盡可能地降低複雜度，是最佳化的方法之一


Entity
---
- 當資料的可辨識性是重要的，那就應該要被定義成 entity
- 擁有 ID，於同類型的 model 獨一無二的值
- 目的在於，讓資料可以被 tracking
- 設定關聯性時，注意關聯性的方向。如果可以盡可能單向簡化，只有在必要的時候接受雙向的情境


Value Object
---
- 有兩種類型，shared or copy
- 較好的使用情境是，令其為 immutable
- 適用情境相當於 flyweight


Service
---
- 非 Entity, Value Object 就可被歸為 Service
- 作為 Function 類型的作用


Module
---
- Model 之間高度耦合，並且歸類在同一個群組，這個群組就稱作 Module
- 當 Module 與 Module 需要互相依賴的時候，應當重新分析規劃，Model 所在的 Module 是否妥當