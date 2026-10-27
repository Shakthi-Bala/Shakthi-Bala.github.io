---
layout: default
title: About
permalink: /about/
nav: true
nav_order: 4
---

<div class="editorial-about">
  <header class="editorial-page-heading"><p class="edition-label">The person behind the work</p><h1>About <em>me.</em></h1></header>
  <section class="about-intro"><figure><img src="{{ '/assets/img/shakthibala-headshot.png' | relative_url }}" alt="Shakthibala Sivagami Balamurugan" width="480" height="600"><figcaption>Shakthibala Sivagami Balamurugan / WPI</figcaption></figure><div><p class="about-lead">I’m a robotics graduate student at Worcester Polytechnic Institute, working on perception, state estimation, and robot learning.</p><p>I’m interested in how robots estimate motion, represent their surroundings, and learn to act from observations. This portfolio includes coursework and projects I pursue in my own time.</p><p>The case studies include implementation details, evaluation conditions, and limitations. They also link to the code, reports, and experiment records.</p><a class="text-action" href="{{ '/research/' | relative_url }}">Research interests &amp; project experience <span aria-hidden="true">↗</span></a></div></section>
  <section class="about-opportunities" aria-labelledby="target-roles"><p class="edition-label">Opportunities</p><h2 id="target-roles">Roles I’m targeting</h2><p>{{ site.data.career_interests.statement }}</p><dl class="role-interests">{% for area in site.data.career_interests.areas %}<div><dt>{{ area.name }}</dt><dd><p>{{ area.roles | join: ' · ' }}</p><a href="{{ area.project | relative_url }}">{{ area.evidence }} <span aria-hidden="true">↗</span></a></dd></div>{% endfor %}</dl></section>
  <section class="about-outside"><p class="edition-label">Away from robotics</p><h2>Photography. Chess.<br>Books. A good film.</h2><p>I enjoy taking photographs, playing chess, reading, and watching films with a good plot. Some of my photographs are in the <a href="{{ '/photography/' | relative_url }}">photography collection</a>.</p></section>
  <section class="contact-end"><p class="edition-label">Contact</p><a class="contact-address" href="mailto:shakthibala2004@gmail.com">shakthibala2004@gmail.com <span aria-hidden="true">↗</span></a><div class="contact-elsewhere"><a href="https://github.com/Shakthi-Bala">GitHub ↗</a><a href="https://www.linkedin.com/in/shakthi-bala/">LinkedIn ↗</a></div></section>
</div>
