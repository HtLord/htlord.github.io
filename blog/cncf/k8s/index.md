---
layout: main-frame
---

<div class="container-fluid">
    {% assign targetPosts = site.posts | where: "tags", "k8s" %}
    <div class="row">
        {% for post in targetPosts %}
        <div class="col-3">
        <div class="card" >
          <div class="card-img-top" style='background-image: url({{ "https://picsum.photos/seed/" | append: post.title | append: "/300/180" | replace: " ", "" }}); height: 180px;'>
            <img />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">
            {{ post.abstract | truncate: 60 }}
            <a href="{{ post.url }}">繼續閱讀</a>
            </p>
          </div>
        </div>
        </div>
        {% endfor %}
    </div>
</div>