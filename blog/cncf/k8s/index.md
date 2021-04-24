---
layout: main-frame
---

{% assign posts = site.posts | where: "categories", "k8s" %}
<ul>
    {% for post in posts %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
