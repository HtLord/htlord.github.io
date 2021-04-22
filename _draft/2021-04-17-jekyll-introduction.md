---
layout: post
title: Jekyll 快速上手
categories: jekyll
permalink: none
published: false
revision: 1, 2021-04-17
---
### 小劇場
原本使用 hackmd 用得很開心，隨著文件量變多了，就想自己經營一下 blog 感受一下。最一開始想著 ReactJs 加 markdown 套件刻一套出來，整個
除了外觀醜之外，用起來基本上就是劣化版的 hackmd，那我幹嘛自己開發，然後就被棄用了。後來又轉向 Wordpress 雖然功能很多，對一般民眾
很是親近，但是很多進階功能都要收費，爾且常常要回到上一動，就直接給我回到上個存檔點，很不愉快。最後，看到 Github Page，使用 Jekyll 來
幫助你管理文章跟排版，還能直接操作 html, css, js 非常得愉快。

### Index
- 安裝開發環境
- Jekyll
  - Directory Structure
  - Page
  - Post
  - Front Matter
  - Collection
  - Data File
  - Asset
  - Static File
- Liquid
  - Tags
  - Filters

### 安裝開發環境
- 安裝 Ruby，這邊就不詳細說明了。
- ```
  gem install bunder
  gem install jekyll
  # 到你的檔案夾 <your-github-name>.github.io ，你可以預先有或是從 Github clone 一份
  cd hello.github.io
  jekyll new .
  
  ```
  上述就是在開啟一個新的 blog project 的過程
- 為了讓上 Github Page 後能正常運作，需要在做下述幾項動作。
  - 用你喜歡的編輯器，開啟 `Gemfile`
  - 把 `#` 加到你第一個找到且開頭為 `gem "jekyll"` 的代碼，用以註解他
  - 找到 `gem "github-pages", group: :jekyll_plugins` 並且用 
    `gem "github-pages", "~> <github-pages-version-on-website>", group: :jekyll_plugins` 取代。而
    <github-pages-version-on-website> 基本上他是一串數字，你可以在這 [web](https://pages.github.com/versions/) 找到他。
    實際上的例子會是長這樣，`gem "github-pages", "~> 214", group: :jekyll_plugins`
  - 之後你只要 push 上去，過一段時間，你就可以在 <your-account-name>.github.io 看到你的 blog 了
- 其實到這邊你的 Blog 已經完成了，你只需要到 `_posts` 用 markdonw 撰寫你的文章就可以了。這間建議你跟著他的命名規則，
  <yyyy>-<mm>-<dd>-<your-article-name>.md 在 push 到 Github 即可。
- 為了方便開發，你會需要下面這道指令，當然不用也可以。
  ```
  bundle exec jekyll serve
  ```
  執行上述指令，你就可以到 `localhost:4000` 查看你的部署在 Github Page 上的模樣了，也可以快速在本機除錯。

> Ruby安裝時，需要注意的地方是，我使用 Homebrew 在 Mac 上安裝，他會放到 /Library 底下，會導致一些權限的問題，而我不
  想要進入 superuser mode 下進行開發，或做一些事情。而我這邊選擇把他複製一份到我的 home 裡面。
  ```bash
  cp -r /Library/Ruby/Gems/2.6.0 $HOME/gems
  export GEM_HOME=$HOME/gems
  export PATH=$HOME/gems/bin:$PATH
  ```

---

### Jekyll

---

  
### Cautions
由於是部署在 Github Page 上的免費版本，你需要跟上 Github Page 上發佈的版本，此外，你還需要有一個名為 <your-github-name>.github.io
的 repo 於 Github 上，並推送你的原始馬上去。當然你要自行 host 也不成問題，但這就不在本文的範圍內了。

### Reference
- [Jekyll](https://jekyllrb.com/)
- [Github Page](https://pages.github.com/)