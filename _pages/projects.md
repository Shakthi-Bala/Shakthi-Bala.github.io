---
layout: page
title: Projects
permalink: /work/
description: Selected projects in robot perception, state estimation, world models, robot learning, and research software, with a browsable collection of all work.
nav: true
nav_order: 1
---

<link rel="stylesheet" href="{{ '/assets/css/portfolio-projects.css' | relative_url }}">

{% assign featured_projects = site.projects | where: "featured", true | sort: "featured_order" %}
{% assign portfolio_projects = site.projects | where: "portfolio", true | sort: "importance" %}

<div class="projects portfolio-projects" data-project-portfolio>
  <div class="portfolio-intro">
    <p class="portfolio-eyebrow">Perception · Robot learning · Research software</p>
    <p class="portfolio-lead">Perception, state estimation, and robot learning.</p>
    <p>From visual-inertial estimation and occupancy forecasting to learned manipulation and reproducible research. Explore six selected projects, or browse the full collection by topic.</p>
    <a class="portfolio-jump" href="#all-projects">Browse all {{ portfolio_projects.size }} projects <span aria-hidden="true">↓</span></a>
  </div>

  <section class="portfolio-featured" aria-labelledby="selected-projects">
    <div class="portfolio-section-heading">
      <div>
        <p class="portfolio-eyebrow">A closer look</p>
        <h2 id="selected-projects">Selected work</h2>
      </div>
      <p>Systems, experiments, and the evidence behind them.</p>
    </div>
    <div class="portfolio-featured-grid">
      {% for project in featured_projects %}
      {% assign preview = site.data.project_previews[project.slug] %}
      <article class="portfolio-featured-card hoverable{% if forloop.first or forloop.last %} portfolio-featured-card--wide{% endif %}" aria-labelledby="featured-{{ project.slug }}">
        <a class="portfolio-featured-media" href="{{ project.url | relative_url }}" aria-label="Read the {{ project.title | escape }} case study">
          <img src="{{ preview.poster | default: project.img | relative_url }}" data-preview-poster="{{ preview.poster | default: project.img | relative_url }}" data-preview-source="{{ project.img | relative_url }}" alt="{{ project.media_alt | escape }}" loading="lazy" width="{{ project.media_width }}" height="{{ project.media_height }}">
        </a>
        <div class="portfolio-featured-body">
        {% if preview %}<button type="button" class="portfolio-filter" data-preview-toggle aria-pressed="false" aria-label="Play preview: {{ project.title | escape }}" hidden>Play preview</button>{% endif %}
          <p class="portfolio-project-area">{{ project.featured_area }}</p>
          <h3 id="featured-{{ project.slug }}"><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
          <p class="portfolio-evidence">{{ project.highlight }}</p>
          <p>{{ project.featured_summary }}</p>
          <p class="portfolio-skills">{{ project.skills }}</p>
          <div class="portfolio-project-links">
            <a class="portfolio-primary-link" href="{{ project.url | relative_url }}">Read case study <span aria-hidden="true">↗</span><span class="sr-only">: {{ project.title }}</span></a>
            <a href="{{ project.github }}" target="_blank" rel="noopener noreferrer">GitHub<span class="sr-only">: {{ project.title }}</span></a>
          </div>
        </div>
      </article>
      {% endfor %}
    </div>
  </section>

  <section class="portfolio-library" aria-labelledby="all-projects">
    <div class="portfolio-section-heading">
      <div>
        <p class="portfolio-eyebrow">Explore further</p>
        <h2 id="all-projects" tabindex="-1">All projects</h2>
      </div>
      <p>{{ portfolio_projects.size }} projects across perception, learning, vision, and robotics.</p>
    </div>
    <div class="portfolio-controls" data-project-controls hidden>
      <div class="portfolio-filters" role="group" aria-label="Filter projects by topic">
        <button type="button" class="portfolio-filter" data-project-topic="all" aria-pressed="true" aria-controls="project-library-grid">All work</button>
        {% for topic in site.data.project_topics %}
        <button type="button" class="portfolio-filter" data-project-topic="{{ topic.id }}" aria-pressed="false" aria-controls="project-library-grid">{{ topic.label }}</button>
        {% endfor %}
      </div>
      <div class="portfolio-search-row">
        <label class="portfolio-search-label" for="project-search">Find a project
          <input id="project-search" type="search" placeholder="Search title, method, or tool" autocomplete="off" aria-controls="project-library-grid">
        </label>
        <p class="portfolio-result-count" role="status" aria-live="polite" aria-atomic="true" data-project-count>{{ portfolio_projects.size }} projects</p>
      </div>
    </div>
    <div class="portfolio-library-grid" id="project-library-grid">
      {% for project in portfolio_projects %}
      {% assign preview = site.data.project_previews[project.slug] %}
      <article class="portfolio-library-card" data-project-card data-topics="{{ project.topics | join: ' ' | escape }}" data-search="{{ project.title | append: ' ' | append: project.description | append: ' ' | append: project.skills | append: ' ' | append: project.category | escape }}" aria-labelledby="library-{{ project.slug }}">
        <a class="portfolio-library-media" href="{{ project.url | relative_url }}" aria-label="Read the {{ project.title | escape }} case study">
          <img src="{{ preview.poster | default: project.img | relative_url }}" data-preview-poster="{{ preview.poster | default: project.img | relative_url }}" data-preview-source="{{ project.img | relative_url }}" alt="{{ project.media_alt | escape }}" loading="lazy" width="{{ project.media_width }}" height="{{ project.media_height }}">
        </a>
        <div class="portfolio-library-body">
        {% if preview %}<button type="button" class="portfolio-filter" data-preview-toggle aria-pressed="false" aria-label="Play preview: {{ project.title | escape }}" hidden>Play preview</button>{% endif %}
          <p class="portfolio-project-area">{{ project.category }}</p>
          <h3 id="library-{{ project.slug }}"><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
          <p>{{ project.description }}</p>
          <div class="portfolio-project-links">
            <a class="portfolio-primary-link" href="{{ project.url | relative_url }}">Case study<span class="sr-only">: {{ project.title }}</span></a>
            <a href="{{ project.github }}" target="_blank" rel="noopener noreferrer">GitHub<span class="sr-only">: {{ project.title }}</span></a>
          </div>
        </div>
      </article>
      {% endfor %}
    </div>
    <div class="portfolio-empty" data-project-empty hidden>
      <p>No projects match this search and topic.</p>
      <button type="button" class="portfolio-filter" data-project-reset>Show all projects</button>
    </div>
  </section>
</div>

<script src="{{ '/assets/js/portfolio-projects.js' | relative_url }}" defer></script>

<script src="{{ "/assets/js/project-previews.js" | relative_url }}" defer></script>
