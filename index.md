---
layout: main-frame
---

<div class="container">
    <div class="row justify-content-center">
{% assign new_posts = site.posts | reverse | slice: 1, 5 %}
<div class="card" style="width: 18rem;">
    <div class="card-header">
        最新文章
    </div>
    <ul class="list-group list-group-flush">
        {% for post in new_posts %}
            <li class="list-group-item">{{ post.title }}</li>
        {% endfor %}
      </ul>
    </div>
    </div>
</div>

