---
layout: page
title: projects
permalink: /projects/
description: Selected work in robot perception, state estimation, and research software.
nav: true
nav_order: 3
---

From stereo camera and IMU data to robot trajectories; from research protocols to inspectable execution evidence. These projects show how I build systems, investigate failures, and measure results.

{% assign featured_projects = site.projects | where: "featured", true | sort: "importance" %}

<div class="projects">
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in featured_projects %}
    <article class="col mb-4" aria-labelledby="project-{{ project.slug }}">
      <div class="card h-100">
        <a href="{{ project.url | relative_url }}" aria-label="Read the {{ project.title | escape }} case study">
          {% include figure.liquid path=project.img avoid_scaling=true alt=project.media_alt loading="lazy" width=project.media_width height=project.media_height class="card-img-top img-fluid" %}
        </a>
        <div class="card-body">
          <p class="card-text"><small>{{ project.category }}</small></p>
          <h2 class="card-title" id="project-{{ project.slug }}"><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
          <p class="card-text"><strong>{{ project.highlight }}</strong></p>
          <p class="card-text">{{ project.description }}</p>
          <p class="card-text"><small>{{ project.skills }}</small></p>
          <p class="card-text">
            <a class="btn btn-sm btn-outline-primary" href="{{ project.url | relative_url }}">Read case study</a>
            <a class="btn btn-sm btn-outline-primary" href="{{ project.github }}" target="_blank" rel="noopener noreferrer">View GitHub <span class="sr-only">for {{ project.title }}</span></a>
          </p>
        </div>
      </div>
    </article>
    {% endfor %}
  </div>
</div>
