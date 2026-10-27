---
layout: default
title: Home
permalink: /
---

{% assign selected = site.projects | where: "featured", true | sort: "featured_order" %}
{% assign lead = selected | first %}
{% assign lead_preview = site.data.project_previews[lead.slug] %}
<div class="editorial-home">
  <section class="home-hero" aria-labelledby="home-title">
    <div class="home-identity">
      <p class="edition-label"><span class="edition-dot" aria-hidden="true"></span> Robotics / Worcester Polytechnic Institute</p>
      <h1 id="home-title">Shakthibala<br><em>Sivagami</em><br><em>Balamurugan.</em></h1>
      <p class="home-deck">I work on how robots see their surroundings, estimate motion, and learn from observations.</p>
      <p class="home-context">Robotics graduate student at WPI.<br><a href="{{ '/about/' | relative_url }}#experience-pear-lab">Student researcher · PeAR Lab <span aria-hidden="true">↗</span></a></p>
      <p class="home-role-statement">{{ site.data.career_interests.statement }}</p>
      <div class="career-availability" aria-label="Availability"><p><strong>{{ site.data.career_interests.availability.seeking }}</strong></p><p>Expected graduation: {{ site.data.career_interests.availability.graduation }}{% if site.data.career_interests.availability.start != empty %}<br>{{ site.data.career_interests.availability.start }}{% endif %}</p></div>
      <div class="editorial-actions">
        <a class="text-action" href="#selected-work">Selected work <span aria-hidden="true">↘</span></a>
        <a href="#home-research">Research questions <span aria-hidden="true">↓</span></a>
        <a href="mailto:shakthibala2004@gmail.com">Email me <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <figure class="hero-experiment" data-video-scope>
      <div class="experiment-caption"><span>From the work</span><span>01 / Estimation</span></div>
      <a class="hero-preview-media" data-video-hover href="{{ lead.url | relative_url }}" aria-label="Explore Stereo Visual-Inertial Odometry">
        <img src="{{ lead_preview.poster | relative_url }}" alt="Tracked camera features from the recorded EuRoC MH_05 estimator run" width="{{ lead_preview.width }}" height="{{ lead_preview.height }}" fetchpriority="high">
        <video class="card-preview-video" data-card-video data-video-src="{{ lead_preview.video | relative_url }}" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" hidden></video>
      </a>
      <figcaption>
        <span>Stereo visual-inertial odometry</span>
        <button type="button" class="card-preview-toggle" data-video-toggle aria-pressed="false" aria-label="Play preview: {{ lead.title | escape }}" hidden>Play preview</button>
        <a href="{{ lead.url | relative_url }}">View experiment <span aria-hidden="true">↗</span></a>
      </figcaption>
      <div class="experiment-result"><strong>0.156<span> m</span></strong><p>Mean trajectory error across 11 EuRoC sequences.<br>SE3 alignment · loop closure disabled.</p></div>
    </figure>
  </section>

  <section class="home-work" aria-labelledby="selected-work">
    <div class="editorial-section-heading"><h2 id="selected-work">Selected work<span class="section-count"> / 06</span></h2><a href="{{ '/work/' | relative_url }}">All projects <span aria-hidden="true">↗</span></a></div>
    <div class="home-work-grid">
      {% for project in selected %}
      {% assign preview = site.data.project_previews[project.slug] %}
      <article class="home-work-item" {% if preview.video %}data-video-scope{% endif %}>
        <a {% unless preview.video %}{% if preview.animation %}data-preview-hover{% endif %}{% endunless %} data-video-hover class="home-work-image" href="{{ project.url | relative_url }}" aria-label="Read {{ project.title | escape }}"><img src="{{ preview.poster | default: project.img | relative_url }}" {% unless preview.video %}data-preview-poster="{{ preview.poster | relative_url }}" data-preview-source="{{ preview.animation | relative_url }}"{% endunless %} alt="{{ preview.alt | default: project.media_alt | escape }}" width="{{ preview.width | default: project.media_width }}" height="{{ preview.height | default: project.media_height }}" loading="lazy">{% if preview.video %}<video class="card-preview-video" data-card-video data-video-src="{{ preview.video | relative_url }}" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" hidden></video>{% endif %}</a>
        <div class="card-preview-caption"><p class="preview-caption">{{ preview.label }}</p>{% if preview.video %}<button type="button" class="card-preview-toggle" data-video-toggle aria-pressed="false" aria-label="Play preview: {{ project.title | escape }}" hidden>Play preview</button>{% elsif preview.animation %}<button type="button" class="card-preview-toggle" data-preview-toggle aria-pressed="false" aria-label="Play workflow preview: {{ project.title | escape }}" hidden>Play workflow</button>{% endif %}</div>
        <div class="work-index"><span>{{ forloop.index | prepend: '0' }} / {{ project.featured_area }}</span><span aria-hidden="true">↗</span></div>
        <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
        <p>{{ project.featured_summary }}</p>
        <div class="home-work-evidence"><p class="home-work-outcome">{{ project.card_result | escape }}</p><p class="home-work-conditions">{{ project.card_conditions | escape }}</p></div>
        <p class="card-tech-stack">{{ project.card_stack | escape }}</p>
        <div class="card-code-links"><a href="{{ project.url | relative_url }}">Write-up <span aria-hidden="true">↗</span><span class="sr-only">: {{ project.title }}</span></a><a href="{{ project.github }}" target="_blank" rel="noopener noreferrer">Code <span aria-hidden="true">↗</span><span class="sr-only">: {{ project.title }}</span></a>{% if project.demo_anchor %}<a href="{{ project.url | relative_url }}#{{ project.demo_anchor }}">Demo <span aria-hidden="true">↗</span><span class="sr-only">: {{ project.title }}</span></a>{% endif %}</div>
      </article>
      {% endfor %}
    </div>
  </section>

  <section class="home-research" aria-labelledby="home-research">
    <div class="editorial-section-heading"><h2 id="home-research">Questions behind the work</h2><a href="{{ '/research/' | relative_url }}">Research &amp; experience <span aria-hidden="true">↗</span></a></div>
    <div class="home-question-grid">
      {% for question in site.data.research_questions %}
      <article class="home-question"><p class="edition-label">{{ forloop.index | prepend: '0' }} / Research question</p><h3>{{ question.question }}</h3><p>{{ question.context }}</p><a class="text-action" href="{{ question.project | relative_url }}">{{ question.evidence }} <span aria-hidden="true">↗</span></a></article>
      {% endfor %}
    </div>
  </section>

  <section class="home-notes" aria-labelledby="home-writing">
    <div class="editorial-section-heading"><h2 id="home-writing">From the notebook</h2><a href="{{ '/writing/' | relative_url }}">All writing <span aria-hidden="true">↗</span></a></div>
    {% for post in site.posts limit: 2 %}
    <article class="note-row"><span class="note-date">{{ post.date | date: "%b %Y" }}</span><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><span class="note-kind">Technical note <span aria-hidden="true">↗</span></span></article>
    {% endfor %}
  </section>

  <section class="home-personal" aria-labelledby="beyond-work">
    <img src="{{ '/assets/img/shakthibala-headshot.png' | relative_url }}" alt="Shakthibala Sivagami Balamurugan" loading="lazy" width="160" height="200">
    <div><p class="edition-label">Outside robotics</p><h2 id="beyond-work">A few other interests.</h2><p>Photography, chess, books, and films with a good plot. </p><div class="home-personal-links"><a class="text-action" href="{{ '/photography/' | relative_url }}">View photographs <span aria-hidden="true">↗</span></a><a class="text-action" href="{{ '/about/' | relative_url }}">More about me <span aria-hidden="true">↗</span></a></div></div>
  </section>
  <section class="contact-end" aria-labelledby="home-contact"><p class="edition-label" id="home-contact">Contact</p><a class="contact-address" href="mailto:shakthibala2004@gmail.com">shakthibala2004@gmail.com <span aria-hidden="true">↗</span></a><div class="contact-elsewhere"><a href="https://github.com/Shakthi-Bala">GitHub ↗</a><a href="https://www.linkedin.com/in/shakthi-bala/">LinkedIn ↗</a></div></section>
</div>

<script src="{{ "/assets/js/card-videos.js" | relative_url }}" defer></script>

<script src="{{ "/assets/js/project-previews.js" | relative_url }}?v=workflow-hover-1" defer></script>
