---
layout: page
permalink: /repositories/
title: repositories
description: GitHub activity and selected repositories in robotics, autonomous systems, and machine learning.
nav: true
nav_order: 4
---

{% if site.data.repositories.github_users %}

## GitHub activity

Total contributions covers all years and includes private activity shared on my GitHub profile. Commit and pull request counts cover public activity only; private repository details remain private. Commits are counted across all years, while the contributed-to repository count covers the last year.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% assign stats_url = site.external_services.github_readme_stats_url | append: '/api/?username=' | append: user %}
    {% assign stats_options = '&show_icons=true&include_all_commits=true&show=contributions&hide_rank=true&number_format=long' %}
    <div class="repo p-2 text-center">
      <a href="https://github.com/{{ user | escape }}" target="_blank" rel="noopener noreferrer" aria-label="View {{ user | escape }} on GitHub">
        <img class="only-light w-100" alt="{{ user | escape }}: all-time contributions including shared private activity, with public commit and pull request counts" src="{{ stats_url | escape }}&amp;theme={{ site.repo_theme_light | escape }}&amp;locale={{ site.lang | escape }}{{ stats_options | escape }}" loading="lazy">
        <img class="only-dark w-100" alt="{{ user | escape }}: all-time contributions including shared private activity, with public commit and pull request counts" src="{{ stats_url | escape }}&amp;theme={{ site.repo_theme_dark | escape }}&amp;locale={{ site.lang | escape }}{{ stats_options | escape }}" loading="lazy">
      </a>
    </div>
  {% endfor %}
</div>

---

{% if site.repo_trophies.enabled %}
{% for user in site.data.repositories.github_users %}
{% if site.data.repositories.github_users.size > 1 %}

  <h4>{{ user }}</h4>
  {% endif %}
  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_trophies.liquid username=user %}
  </div>

---

{% endfor %}
{% endif %}
{% endif %}

{% if site.data.repositories.github_repos %}

## GitHub Repositories

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
