---
title: Python 版本切換 MacOS with Homebrew
pubDate: '2021-04-23'
tags:
  - python
---

### 小劇場
今天在使用 kubectl 要查詢 GKE 上的 storage class 的時候，執行下去之後，出現了缺少模組的狀況，後來清查發現，除了 gcloud 需要另外安裝
SDK 外，還要使用正確的版號。

### 大綱
假若你同時要開發多個版本的 python 程式，或是某段時間用的 tool 需要的 python 版本跟你的當前版本不符合時，快速切換版本用。

### Mac 環境下，使用 Homebrew 安裝的 python
1. Remove links from other version of python
   ```
   brew unlink python@3.7
   brew unlink python@3.8
   ```
2. Add link with target version of python
   ```
   brew link --force python@3.9
   ```