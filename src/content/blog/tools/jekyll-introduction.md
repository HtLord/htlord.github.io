---
title: Jekyll 快速上手
pubDate: '2021-04-20'
tags: 
  - jekyll 
---

### 小劇場
原本使用 hackmd 用得很開心，隨著文件量變多了，就想自己經營一下 blog 感受一下。最一開始想著 ReactJs 加 markdown 套件刻一套出來，整個
除了外觀醜之外，用起來基本上就是劣化版的 hackmd，那我幹嘛自己開發，然後就被棄用了。後來又轉向 Wordpress 雖然功能很多，對一般民眾
很是親近，但是很多進階功能都要收費，爾且常常要回到上一動，就直接給我回到上個存檔點，很不愉快。最後，看到 Github Page，使用 Jekyll 來
幫助你管理文章跟排版，還能直接操作 html, css, js 非常得愉快。

### Index
- 安裝開發環境
- Jekyll
  - [Directory Structure](#directory-structure)
  - [Page](#jekyll-page)
  - [Post](#jekyll-post)
  - [Front Matter](#jekyll-front-matter)
  - [Variables](#jekyll-variables)
- Liquid
  - [Tags](#liquid-tags)
  - [Filters](#liquid-filters)

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

### <a name="directory-structure"></a>Directory structure
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

### <a name='jekyll-page'></a>Pages
分頁意味著你有多個頁面可以放不同的內容，是用來擴展你的部落格的豐富性，讓他不只有文章的功能。比方說你想要由 `hello.github.io/hello` 
提供一些額外內容，這時候你就會需要分頁功能了。這邊你有 2 種方式來定義你的分頁。
- 定義你有多個頁面可以進行跳轉，直接加入 markdown or html 於 project root 底下就可以了。
- 或是開立一個不包含 `.`, `_`, `#`, `~` 的檔案夾名稱，裡面放 markdown or html，只要 url 後面加上 
  `/<directory>/<file-name-and-extesion>` 就可以呈現該頁面。
  ```
  --- your-project-directory
   |_ _post
   |_ _site
   |_ hello
       |_ world.html
       |_ world2.md
   |_ ...
  
  # http://hello.github.io/hello/world
  # http://hello.github.io/hello/world2
  ```
  
### <a name='jekyll-post'></a>Posts
markdown or html 都可以，前面可以加上 Front Matter 做一些操作給 Jekyll 控制，或在 Liquid 中使用。必須符合 
`<yyyy>-<mm>-<dd>-<artical-name>`.md 或 `<yyyy>-<mm>-<dd>-<artical-name>`.html 的格式。另一特性是，任意檔案結構下，有 `_posts`
的結構，依樣可以被找到，並且 url 會照著檔案結構。
```
--- your-project-directory
 |_ blog
     |_ hello
         |_ _posts
              |_ 2021-01-01-article1.md
              |_ 2021-01-02-article2.md
     |_ world
         |_ _posts
              |_ 2021-05-01-article3.md
              |_ 2020-01-01-article4.md
...
 
Url
host/blog/hello/2021/01/01/article1.html
host/blog/hello/2021/01/02/article2.html
...
```

###  <a name='jekyll-front-matter'></a>Front Matter
就是該檔案的 metadata，一班會被放在 mardkwon or html 於 posts or layouts 使用。他是 yaml 格式，且會被 Jekyll 解析並做一些事情。
看起來會如下方範例
```yaml
---
layout: post
title: Hello Jekyll
categories: hello
published: false
permalink: /hello/world
myVariables: hello world
---
your contents
```

| Front Matter Key | Value Means | Comments |
| :---: | --- | --- |
| layout | 你可以使用原生定義好，或者是 plugin 的 layout，或這你可以用你自己定義的 html 來使用它 | |
| title | 在作為 posts 的 front matter 用 default, post 他會自動用此作為標題顯示 | |
| categories | 會自動幫你 url 幫你多分類一層 | |
| permalink | 自定義這個頁面的 url，更多設定值可以在下方連結查詢 | |
| myVariables | 這不一定要叫這個名稱，但是他代表你下方使用到的 Liquid 語法可以使用的變數名稱，至於內容就會等同於你設定的 value | |

> 這個 Yaml block 的內容都可以在文件後面的 Liquid 做使用

> [Front Matter](https://jekyllrb.com/docs/front-matter/)

### <a name='jekyll-variables'></a>Variables
如果你有自行定義 layout 的需求，那你會需要搭配 variable 清單一起使用，來操作 site, post, page, data, etc,. 。

> [Variables](https://jekyllrb.com/docs/variables/)
 
### <a name='liquid-filters'></a>Filters
語法是 `{% raw %}{{ abc }}{% endraw %}` ，運用上很像 Linux 的 pipeline。前者的運算結果，會給後者作為輸入運算，並輸出，以此類通直至 
`{% raw %}}}{% endraw %}` 結束。能應用在 markdown or html 被使用。所有可用的 Filters 放在下方連結。
範例：
```
{% raw %}{{ "abc" | append: "abc" }}{% endraw %} will output {{ "abc" | append: "abc" }}
{% raw %}{{ -10 | abs | append: "abc" }}{% endraw %} will output {{ -10 | abs | append: "abc" }}
```
{{ abc }}

### <a name='liquid-tags'></a>Tags 
語法是 `{% raw %}{% somethings %}{% endraw %}`，達到做變數、流程控制、迴圈。能應用在 markdown or html 被使用，也能混用 Filters
。所有可用的 Tags 放在下方連結。
範例：
```
{% raw %} {%for post in site.post %} {{ post.title }} {% endfor %} {% endraw %}
{% raw %} {% assign new_posts = site.posts reverse | slice: 1, 5 %} {% endraw %}
```

> 利用開頭利用 raw tag 跟結尾以 endraw tag 包起來，就可以達到 Filter, Tag 的 escape 

### Cautions
- 由於是部署在 Github Page 上的免費版本，你需要跟上 Github Page 上發佈的版本，此外，你還需要有一個名為 <your-github-name>.github.io
的 repo 於 Github 上，並推送你的原始馬上去。當然你要自行 host 也不成問題，但這就不在本文的範圍內了。
- Liquid filter 要當作 html element attribute 值的時候，記得用 " 包住他

### Reference
- [Jekyll](https://jekyllrb.com/)
- [Liquid](https://shopify.github.io/liquid/)
- [Github Page](https://pages.github.com/)
- [Github Page Supported Version](https://pages.github.com/versions/)