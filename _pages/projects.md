---
layout: default
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
  <header class="editorial-page-heading"><p class="edition-label">Selected projects / Full collection</p><h1>Selected <em>work.</em></h1><div class="work-page-deck"><p>Six projects in perception, estimation, robot learning, and research software. Each one includes the implementation, evaluation, and what I learned.</p><a class="text-action" href="#all-projects">Browse all {{ portfolio_projects.size }} projects <span aria-hidden="true">↓</span></a></div></header>

  <section class="portfolio-featured" aria-labelledby="selected-projects">
    <div class="portfolio-section-heading">
      <div>

        <h2 id="selected-projects">Selected work</h2>
      </div>
      <p>Six selected projects.</p>
    </div>
    <div class="portfolio-featured-grid">
      {% for project in featured_projects %}
      {% assign preview = site.data.project_previews[project.slug] %}
      <article {% if preview.video %}data-video-scope{% endif %} class="portfolio-featured-card " aria-labelledby="featured-{{ project.slug }}">
        <a {% unless preview.video %}{% if preview.animation %}data-preview-hover{% endif %}{% endunless %} data-video-hover class="portfolio-featured-media" href="{{ project.url | relative_url }}" aria-label="Read the {{ project.title | escape }} case study">
          <img src="{{ preview.poster | default: project.img | relative_url }}" data-preview-poster="{{ preview.poster | default: project.img | relative_url }}" data-preview-source="{{ preview.animation | default: project.img | relative_url }}" alt="{{ preview.alt | default: project.media_alt | escape }}" loading="lazy" width="{{ preview.width | default: project.media_width }}" height="{{ preview.height | default: project.media_height }}">{% if preview.video %}<video class="card-preview-video" data-card-video data-video-src="{{ preview.video | relative_url }}" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" hidden></video>{% endif %}
        </a>
        {% if preview.label %}<p class="preview-caption">{{ preview.label }}</p>{% endif %}
        <div class="portfolio-featured-body">
          <p class="portfolio-project-area"><span>{{ forloop.index | prepend: '0' }} /</span> {{ project.featured_area }}</p>
          <h3 id="featured-{{ project.slug }}"><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
          <p class="portfolio-evidence">{{ project.card_result | default: project.highlight | escape }}</p>
          {% if project.card_conditions %}<p class="portfolio-evidence-conditions">{{ project.card_conditions | escape }}</p>{% endif %}
          <p>{{ project.featured_summary }}</p>
          <p class="card-tech-stack">{{ project.card_stack | escape }}</p>
        {% if preview.video %}<button type="button" class="card-preview-toggle" data-video-toggle aria-pressed="false" aria-label="Play preview: {{ project.title | escape }}" hidden>Play preview</button>{% elsif preview.animation %}<button type="button" class="card-preview-toggle" data-preview-toggle aria-pressed="false" aria-label="Play workflow preview: {{ project.title | escape }}" hidden>Play workflow</button>{% endif %}
          <div class="portfolio-project-links">
            <a class="portfolio-primary-link" href="{{ project.url | relative_url }}">Read case study <span aria-hidden="true">↗</span><span class="sr-only">: {{ project.title }}</span></a>
            <a href="{{ project.github }}" target="_blank" rel="noopener noreferrer">Code <span aria-hidden="true">↗</span><span class="sr-only">: {{ project.title }}</span></a>{% if project.demo_anchor %}<a href="{{ project.url | relative_url }}#{{ project.demo_anchor }}">Demo <span aria-hidden="true">↗</span><span class="sr-only">: {{ project.title }}</span></a>{% endif %}
          </div>
        </div>
      </article>
      {% endfor %}
    </div>

  </section>

  <section class="portfolio-library" aria-labelledby="all-projects">
    <div class="portfolio-section-heading">
      <div>

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
          <img src="{{ preview.poster | default: project.img | relative_url }}" data-preview-poster="{{ preview.poster | default: project.img | relative_url }}" data-preview-source="{{ preview.animation | default: project.img | relative_url }}" alt="{{ preview.alt | default: project.media_alt | escape }}" loading="lazy" width="{{ preview.width | default: project.media_width }}" height="{{ preview.height | default: project.media_height }}">
        </a>
        {% if preview.label %}<p class="preview-caption">{{ preview.label }}</p>{% endif %}
        <div class="portfolio-library-body">
          <p class="portfolio-project-area">{{ project.category }}</p>
          <h3 id="library-{{ project.slug }}"><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
          <p>{{ project.description }}</p>
        {% if preview %}<button type="button" class="portfolio-filter" data-preview-toggle aria-pressed="false" aria-label="Play preview: {{ project.title | escape }}" hidden>Play preview</button>{% endif %}
          <div class="portfolio-project-links">
            <a class="portfolio-primary-link" href="{{ project.url | relative_url }}">Case study<span class="sr-only">: {{ project.title }}</span></a>
            <a href="{{ project.github }}" target="_blank" rel="noopener noreferrer">Code <span aria-hidden="true">↗</span><span class="sr-only">: {{ project.title }}</span></a>{% if project.demo_anchor %}<a href="{{ project.url | relative_url }}#{{ project.demo_anchor }}">Demo <span aria-hidden="true">↗</span><span class="sr-only">: {{ project.title }}</span></a>{% endif %}
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

<script src="{{ "/assets/js/project-previews.js" | relative_url }}?v=workflow-hover-1" defer></script>

<script src="{{ "/assets/js/card-videos.js" | relative_url }}" defer></script>
