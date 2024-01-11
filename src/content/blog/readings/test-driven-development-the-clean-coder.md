---
title: Test Driven Development - The Clean Coder
pubDate: '2023-12-10'
tags:
  - tdd
  - mental
---

Brief
---
- TDD 必須是簡單，容易執行，重複執行的項目
- TDD 應該是要時刻進行，是功能的初始歷程
- TDD 是開發的必要項目，並非可選擇性
- TDD 確保釐清功能性目標，並精準運行，是專業度的表現
- TDD 協助在初期，就能觀察到，結構上的問題，比如說過高的耦合度
- TDD 下運行 library 的依賴，可以在 ut 一目了然，包含使用了哪些內容，也幫助新進的夥伴，更快速了解這個 library 的使用方式。
- TDD 下運行 library 的依賴，可以在 ut 下，安全的更版。你會知道專案運行時，使用了哪寫該 library 的函式以及功能。
- TDD 下運行重構，能保證即便改變了寫法，進入點以及出口點，仍能保持預期結果
- TDD 在 ISO 證明系統穩定時，coverage 本身，也是一個重要的評斷指標
- TDD 要是能夠自動化


Description
---
你是否在寫程式的過程中，有無數次的想說，我這次一定要先寫 UT，在寫程式，但每每都因為各種原因，背道而行。我只能說確實，TDD 不是件簡單事，但執行之後，能大大地讓事情變簡單。

我自己本身也經過了很長時間的掙扎，遲遲無法實現這個習慣。最近，我漸漸習慣了這個習慣，這邊分享我的心路歷程。

當你意識到你已經進入撰寫，產品等級的程式碼時，你要把它刪除，馬上新增一個 ut 並在上面嘗試解決問題。刪除你的努力的方式，懲罰你的大腦，在寫完 ut 給予鼓勵，以此往復，在這樣的模式下，很快的，你就習慣了 TDD。