---
layout: main-frame
title: Struct Tag
tags: golang introduction 
abstract: go
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