---
layout: page
permalink: /blog/
title: Writing
nav: true
nav_order: 2
description: Notes on experiments, evaluation, and implementation details from my robotics projects.
---

Short technical notes from my projects: what I tested, what failed, and what the evidence supports.

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url | relative_url }})

{{ post.date | date: "%B %-d, %Y" }} · Technical note

{{ post.description }}

{% endfor %}
