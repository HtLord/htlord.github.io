---
layout: main-frame
---

{% assign posts = site.posts | where: "categories", "test" %}
<ul>
    {% for post in posts %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
