---
layout: default
title: About
permalink: /about/
nav: true
nav_order: 4
---

<div class="editorial-about">
  <header class="editorial-page-heading"><p class="edition-label">The person behind the work</p><h1>About <em>me.</em></h1></header>
  <section class="about-intro"><figure><img src="{{ '/assets/img/shakthibala-headshot.png' | relative_url }}" alt="Shakthibala Sivagami Balamurugan" width="480" height="600"><figcaption>Shakthibala Sivagami Balamurugan / WPI</figcaption></figure><div><p class="about-lead">I’m a robotics graduate student at Worcester Polytechnic Institute, working on perception, state estimation, and robot learning.</p><p>I’m interested in how robots estimate motion, represent their surroundings, and learn to act from observations. This portfolio includes coursework and projects I pursue in my own time.</p><p>The case studies include implementation details, evaluation conditions, and limitations. They also link to the code, reports, and experiment records.</p><div class="about-intro-links"><a class="text-action" href="#education">Education <span aria-hidden="true">↓</span></a><a class="text-action" href="#experience">Experience <span aria-hidden="true">↓</span></a><a class="text-action" href="{{ '/research/' | relative_url }}">Research interests <span aria-hidden="true">↗</span></a></div></div></section>
  <section class="about-education" aria-labelledby="education">
    <div class="editorial-section-heading"><h2 id="education">Education</h2></div>
    <ol class="education-list">
      {% for entry in site.data.education %}
      <li class="education-entry">
        <div class="education-dates"><p>{{ entry.period }}</p>{% if entry.expected %}<span>Expected completion</span>{% endif %}</div>
        <div class="education-content"><h3><a href="{{ entry.url }}" target="_blank" rel="noopener noreferrer">{{ entry.institution }} <span aria-hidden="true">↗</span></a></h3><p class="education-degree">{{ entry.degree }}</p><p class="education-field">{{ entry.field }}</p></div>
      </li>
      {% endfor %}
    </ol>
  </section>
  <section class="professional-experience" aria-labelledby="experience">
    <div class="editorial-section-heading"><h2 id="experience">Research, teaching &amp; industry</h2><p>2024 — Present</p></div>
    <ol class="experience-list">
      {% for entry in site.data.experience %}
      <li class="experience-entry{% if entry.current %} experience-entry--current{% endif %}" id="experience-{{ entry.id }}">
        <div class="experience-dates"><p>{{ entry.period }}</p>{% if entry.current %}<span class="experience-current">Current</span>{% endif %}</div>
        <div class="experience-content">
          <p class="experience-organization">{{ entry.organization }}{% if entry.unit %}<span>{{ entry.unit }}</span>{% endif %}</p>
          <h3>{{ entry.role }}</h3>
          <p class="experience-location">{{ entry.location }}{% if entry.context %} · {{ entry.context }}{% endif %}</p>
          <ul>{% for bullet in entry.bullets %}<li>{{ bullet }}</li>{% endfor %}</ul>
          <p class="experience-skills">{{ entry.skills | join: ' · ' }}</p>
        </div>
      </li>
      {% endfor %}
    </ol>
  </section>
  <section class="about-opportunities" aria-labelledby="target-roles"><p class="edition-label">Opportunities</p><h2 id="target-roles">Roles I’m targeting</h2><p>{{ site.data.career_interests.statement }}</p><div class="career-availability" aria-label="Availability"><p><strong>{{ site.data.career_interests.availability.seeking }}</strong></p><p>Expected graduation: {{ site.data.career_interests.availability.graduation }}{% if site.data.career_interests.availability.start != empty %}<br>{{ site.data.career_interests.availability.start }}{% endif %}</p></div><dl class="role-interests">{% for area in site.data.career_interests.areas %}<div><dt>{{ area.name }}</dt><dd><p>{{ area.roles | join: ' · ' }}</p><a href="{{ area.project | relative_url }}">{{ area.evidence }} <span aria-hidden="true">↗</span></a></dd></div>{% endfor %}</dl></section>
  <section class="about-outside"><p class="edition-label">Away from robotics</p><h2>Photography. Chess.<br>Books. A good film.</h2><p>I enjoy taking photographs, playing chess, reading, and watching films with a good plot. Some of my photographs are in the <a href="{{ '/photography/' | relative_url }}">photography collection</a>.</p></section>
  <section class="contact-end"><p class="edition-label">Contact</p><a class="contact-address" href="mailto:shakthibala2004@gmail.com">shakthibala2004@gmail.com <span aria-hidden="true">↗</span></a><div class="contact-elsewhere"><a href="https://github.com/Shakthi-Bala">GitHub ↗</a><a href="https://www.linkedin.com/in/shakthi-bala/">LinkedIn ↗</a></div></section>
</div>
