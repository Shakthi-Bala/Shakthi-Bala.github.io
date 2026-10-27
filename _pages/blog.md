---
layout: page
permalink: /writing/
title: Writing
nav: true
nav_order: 2
description: Notes on experiments, evaluation, and implementation details from my robotics projects.
---

Short technical notes from my projects: what I tested, what failed, and what the evidence supports.

<div class="writing-list">
{% for post in site.posts %}
  <article class="writing-entry">
    <p class="writing-meta">{{ post.date | date: "%B %-d, %Y" }} · Technical note</p>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p>{{ post.description }}</p>
  </article>
{% endfor %}
</div>
