---
layout: main-frame
---

<div class="container">
    <div class="row justify-content-center text-center">
        最新文章
    </div>
    <div class="row justify-content-center text-center">
        <ul class="list-group list-group-flush">
            {% assign new_posts = site.posts | reverse | slice: 1, 5 %}
            {% for post in new_posts %}
            <li class="list-group-item">
                <a href="{{ post.url }}">
                {{ post.title }}
                </a>
            </li>
            {% endfor %}
        </ul>
    </div>
</div>

