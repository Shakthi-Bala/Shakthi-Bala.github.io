---
layout: default
permalink: /writing/
title: Writing
nav: true
nav_order: 2
---

<div class="editorial-writing">
  <header class="editorial-page-heading"><p class="edition-label">Experiments / Observations</p><h1>Technical <em>notes.</em></h1><p>Things I’ve tested, questions I’m still working through, and the details that changed a result.</p></header>
  <div class="writing-list">
    {% for post in site.posts %}
    <article class="writing-entry">
      <div class="writing-meta"><span>{{ forloop.index | prepend: '0' }}</span><span>{{ post.date | date: "%d %b %Y" }}</span><span>Technical note</span></div>
      <div class="writing-entry-body"><h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2><p>{{ post.description }}</p><a class="text-action" href="{{ post.url | relative_url }}">Read note <span aria-hidden="true">↗</span></a></div>
    </article>
    {% endfor %}
  </div>
  <p class="writing-further"><a href="{{ '/publications/' | relative_url }}">Course reports &amp; project documentation <span aria-hidden="true">↗</span></a></p>
</div>
