---
layout: post
title: Jekyll 快速上手
categories: jekyll
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
  - ⭐ Directory Structure
  - ⭐ Page
  - ⭐ Post
  - ⭐ Front Matter
  - Collection
  - Data File
  - Asset
  - Static File
  - ⭐ Variables
- Liquid
  - ⭐ Tags
  - ⭐ Filters

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
  1. 用你喜歡的編輯器，開啟 `Gemfile`
  1. 把 `#` 加到你第一個找到且開頭為 `gem "jekyll"` 的代碼，用以註解他
  1. 找到 `gem "github-pages", group: :jekyll_plugins`
  1. 並用 `gem "github-pages", "~> 214", group: :jekyll_plugins` 取代
  1. 之後你只要 push 上去
  1. Just wait，你就可以在 <your-account-name>.github.io 看到你的 blog 了
- 其實到這邊你的 Blog 已經完成了，你只需要到 `_posts` 用 markdonw 撰寫你的文章就可以了。跟著他的命名規則，
  `<yyyy>-<mm>-<dd>-<your-article-name>.md` 在 push 到 Github 即可。
- 為了方便開發，你會需要下面這道指令，當然不用也可以。
  ```
  bundle exec jekyll serve
  ```
  執行上述指令，你就可以到 `localhost:4000` 查看你的部署在 Github Page 上的模樣了，也可以快速在本機除錯。

> 而`<github-pages-version-on-website>`基本上他是一串數字，你可以在[這個頁面](https://pages.github.com/versions/)找到他。
  實際上的例子會是長這樣，`gem "github-pages", "~> 214", group: :jekyll_plugins`
  
  
> Ruby安裝時，需要注意的地方是，我使用 Homebrew 在 Mac 上安裝，他會放到 /Library 底下，會導致一些權限的問題，而我不
  想要進入 superuser mode 下進行開發，或做一些事情。而我這邊選擇把他複製一份到我的 home 裡面。
  ```bash
  cp -r /Library/Ruby/Gems/2.6.0 $HOME/gems
  export GEM_HOME=$HOME/gems
  export PATH=$HOME/gems/bin:$PATH
  ```

### Directory structure
這邊會提供幾項我個人覺得實用的項目，跟注意事項。jekyll 特殊用途的檔案夾，會以 `_`(underscore) 表示。

| Directory Name | Directory Functionality | Comments |
|:---:|:---|:---|
| _drafts | 文章草稿可以放在這裡，他不會被發布，需執行 `bundle exec jekyll serve --drafts` 或 `bundle exec jekyll build --draft` 才會出現在文章列表當中 | 裡面的文章命名不能帶日期 |
| _posts | 文章需要跟著命名規則，`<yyyy>-<mm>-<dd>-<your-article-name>.md` or html | |
| _layouts | 自定義的 html 樣板可以讓你快速利用 markdown, site data 替換資料 |  |
| _data | 自定義的文字型的資料，可存為 yaml, json, csv, tsv，用法為 `site.data.<file-name>` 搭配 Liquid Tag, Filter 一起使用 | |
| _site | 工具 build 的結果會輸出到這個資料夾，要加入 `.gitignore` 中，已防預期外的結果 | |
| assets | 個人使用偏好，是個普通的資料夾 | 把一些 css, images, etc,. 檔案丟到這邊一併管理 |

> [Directory Structure](https://jekyllrb.com/docs/structure/)

### Pages
分頁意味著你有多個頁面可以放不同的內容，是用來擴展你的部落格的豐富性，讓他不只有文章的功能。比方說你想要由 `hello.github.io/hello` 
提供一些內容，這時候你就會需要分頁功能了。這邊你有 2 種方式來定義你的分頁。
- 定義你有多個頁面可以進行跳轉，直接加入 markdown or html 於 project root 底下就可以了。
- 或是開立一個不包含 `.`, `_`, `#`, `~` 的檔案夾名稱，裡面放 markdown or html，只要 url 後面加上 
  `/<directory>/<file-name-and-extesion>` 就可以呈現該頁面。
  ```
  --- your-project-directory
   |_ _post
   |_ _site
   |- hello
       |_ world.html
       |_ world2.md
   |_ ...
  
  # http://hello.github.io/hello/world
  # http://hello.github.io/hello/world2
  ```

### Variables
如果你有自行定義 layout 的需求，那你會需要搭配 variable 清單一起使用，來操做 site, post, page, data, etc,. 。

> [Variables](https://jekyllrb.com/docs/variables/)
  
### Cautions
由於是部署在 Github Page 上的免費版本，你需要跟上 Github Page 上發佈的版本，此外，你還需要有一個名為 <your-github-name>.github.io
的 repo 於 Github 上，並推送你的原始馬上去。當然你要自行 host 也不成問題，但這就不在本文的範圍內了。

### Reference
- [Jekyll](https://jekyllrb.com/)
- [Github Page](https://pages.github.com/)
- [Github Page Supported Version](https://pages.github.com/versions/)