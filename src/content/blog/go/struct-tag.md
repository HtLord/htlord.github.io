---
title: Struct Tag
pubDate: '2021-09-22'
tags: 
  - golang
---

Definition
---
Add string literal after field name of struct which be called as tag

Example
---
```golang
type Hello struct {
	Word `im:"tag"`
	Golang `json:"golang" bson:"gogolang"`
}
```