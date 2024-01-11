---
title: Local Module
pubDate: '2021-09-18'
tags: 
  - golang 
---

Definition
---
In this tutorial will use hello module in you project and its directory structure will demonstrate below.
```
/where/your/project/path
 |-- im_module_1/
 |-- im_moduel_2/
 |-- ...
 |-- hello/
```

How to
---
1. Create a customized module
	1. Create directory
	1. Go to directory and run `go mod init`
	1. Here you are good enough to import your customized module to other package

1. Import customized module to your main package
	1. Import your module to your code
	1. Run `go mod edit -replace <your-module-name>=<path-where-your-module-is>`
	1. Run `go mod tidy`

1. Vola

Example
---
This will create a package main to run customized module call `word`. The structure will demonstrate below.
```
/hello
 |-- word/
 |-- main.go
```
1. Go to `word` directory(/hello/word)
1. Run `go mod init htlord.taipei/word`
1. Impl module function
	```golang
	// word.go
	package word

	import fmt

	function SayWord() {
		fmt.Println("Word")
	}
	```

1. Go to `hello` directory(/hello)
1. Run `go mod init htlord.taipei/hello` (not nessary)
1. Impl main function
	```
	// main.go
	package main

	import _ htlord.taipei/word

	function main() {
		SayWord()
	}
	```
1. Run `go mod edit -replace htlord.taipei/word=./word`
1. Run `go mod tidy`
1. You are good to run main code. `go run main.go`
