---
title: TDD 導入
pubDate: '2024-01-12'
tags:
  - career
---

Story
---
在過去的開發經驗當中，要不是總在趕進度，就是趕進度的路上。往往都會有各種解釋，
逃避撰寫 UT。或者是，當產能比較有餘的時候，或者特定要素，才會回頭補上。
而過程總會依者，當前已有的邏輯撰寫，以提高 coverage，這種做法往往，
效果只在表面數據的好看，刻意避開某些潛在的問題，或者條件。

Pros
---
- 提早發現問題，在早期開發階段
- 提升程式碼的乾淨程度
- 提升程式碼的信心程度
- 明確了解，程式碼的安全度，根據撰寫的測試範圍
- 提供 demo 給後進人員快速上手的渠道
- 提供明確的 library dependencies

Cons
---
- 需要有一套固定且熟悉的流程套用
- 需要能夠說服其他夥伴

How-To
---
建立一個固定的開發過程，舉個例子，下列會是我的工作流程。

1. 分解問題
2. 確定工作目標以及過程 (BDD)
3. 最小限度下，撰寫程式碼於產品區塊中，盡可能寫在 test 底下。可能是一個
   folder (/src/text/**)、可能是一類檔名 (*.test.*, *._test_.*)
4. 執行測試，並調整
5. 通過測試，轉移程式碼到產品區塊中
6. 反覆 3-5 直到整張票面終結

有了固定的流程，剩下的就是不斷的練習，直到習慣並享受這個方法帶來的優勢。
但是，假若要應用到團退， 這是一個困難的問題，這是很難推動的事情，
針對兩類人做分析，對新人，以及資深開發者。

- 新人，沒有過往的包袱，容易進入狀況，但前提是帶領者本身，需要有足夠的經驗，
  新人才不會無所適從，或者是走上奇怪的歪路。
- 資深，十分具有挑戰性，在台灣目前的經驗當中，很習慣一騎當千，先把東西弄到
  會動的程度就可以了。在這樣的文化熏陶下，測試這個項目，就漸漸被遺忘了。
  資深的人們，他們在不同的面向，展現出他們經驗深厚的底子，他們可以寫出可運作的
  程式碼、可以快速的完成階段性目標，也因為這些優勢，要說服他們是一件很困難的事情。

如何打動這些資深人員，只能靠你自身的行為，每次的 code review 不論是你的程式碼，
或是在評論對方的程式碼，把 TDD 融入其中，在時間的推移下，漸漸地融入他們的血液中
，或是其他政治手段了。
