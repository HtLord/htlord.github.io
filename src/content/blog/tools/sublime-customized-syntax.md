---
title: Sublime customized syntax
pubDate: '2021-12-28'
tags: 
  - sublime
---

Abstruct
---
Customize which kind of composite of word will be special for you. Here will demonstrate my TODO style.

Steps
---
1. On sublime bar, `Tools > Developer > New Syntax`. Then it will create a file an template for you
1. Edit and save it into `~/Library/Application Support/Sublime Text 3/Packages`(under mac machine if you are using others. Check the correct folder path on web)
1. Make sure your syntax file end with `sublime-syntax` as extension(there are others but not mention details here)
1. To your target file and select customized syntax

Description
---
Most of scope is already been defined more infomations [here](https://www.sublimetext.com/docs/scope_naming.html). First, it will scanning your file and check and `contexts.main` defined regex is matched. While matched it will be direct apply scope then it will apply scope colors. If you may encounter cross line but want mark it as the same section. It will using push/pop mechanism, matching as main defined keep every scanned char until hit customized match regex.

Example
---
htlord-todo-md.sublime-syntax
```yaml
%YAML 1.2
---
# See http://www.sublimetext.com/docs/3/syntax.html
file_extensions:
  - md 
scope: source.htlord-todo-md
contexts:
  main:
    # Strings begin and end with quotes, and use backslashes as an escape
    # character
    - match: '"'
      scope: punctuation.definition.string.begin.htlord-todo-md
      push: double_quoted_string

    # Comments begin with a '//' and finish at the end of the line
    - match: '^\-\s'
      scope: punctuation.definition.comment.htlord-todo-md
      push: line_comment

    # Keywords are if, else for and while.
    # Note that blackslashes don't need to be escaped within single quoted
    # strings in YAML. When using single quoted strings, only single quotes
    # need to be escaped: this is done by using two single quotes next to each
    # other.
    - match: '^x\b'
      scope: keyword.control.htlord-todo-md

    # Numbers
    - match: '^v\b'
      scope: constant.numeric.htlord-todo-md

    - match: '^[A-Z].*\n'
      scope: punctuation.definition.tri.dash.htlord-todo-md
      push: tri_dash

  double_quoted_string:
    - meta_scope: string.quoted.double.htlord-todo-md
    - match: '\\.'
      scope: constant.character.escape.htlord-todo-md
    - match: '"'
      scope: punctuation.definition.string.end.htlord-todo-md
      pop: true

  line_comment:
    - meta_scope: comment.line.htlord-todo-md
    - match: $
      pop: true

  tri_dash:
    - meta_scope: storage.type.class.htlord-todo-md
    - match: '\-\-\-$'
      pop: true
```

example-todo.md
```markdown
Week meeting
---
# final
- Enhance CI/CD

# pre-day
v 1.31, Modify ledger naming rule
v 1.32, Fix P6705C point to 700
v Service, Query clinic's user number
v Service, Create new clinic ugood168
- CI/CD

# plain to
- dora, Add SMS init to dora monitor
- dora, Add SMS record adding to dora monitor

Release
---
v before release 1.29 hotfix to prod check migration a17, a18 logic again

New CI/CD
---
- 

Dora monitor
---
v Remove json db from server service
v Remove json db from storage service
v Remove json db from db service
v Remove json db from k8s service
v Remove add user from ui and api
v Impl api running background interval for k8s and dev env
v Modify way that ui get gcp sql backup list
v Modify list war/sql
v Modify ui download flow 
v Fix slack member will be replace will modify it
v Add send slack message back
v After ui operate download reload sql, war list
x Modify way that GCP sql backup naming rules to clinic + date only
v Modify way that GCP cronjob backup servless servic
x Fix web will broken while can not get server list from api
v Modify ui baseUrl from dev to local
```
