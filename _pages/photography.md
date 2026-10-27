---
layout: default
title: Photography
permalink: /photography/
nav: true
nav_order: 3
---

<div class="photography-page">
  <header class="editorial-page-heading"><p class="edition-label">Outside robotics / Photographs</p><h1>A different <em>lens.</em></h1><p>A few photographs from my time away from the screen.</p></header>
  <div class="photo-gallery" data-photo-gallery>
    {% for photo in site.data.photographs %}
    <figure class="photo-print{% if photo.wide %} photo-print--wide{% endif %}">
      <a href="{{ '/assets/photography/' | append: photo.id | append: '-large.jpg' | relative_url }}" data-photo-open data-photo-caption="{{ photo.caption | escape }}" aria-label="View photograph: {{ photo.caption | escape }}">
        <img src="{{ '/assets/photography/' | append: photo.id | append: '-1000.webp' | relative_url }}" srcset="{{ '/assets/photography/' | append: photo.id | append: '-640.webp' | relative_url }} 640w, {{ '/assets/photography/' | append: photo.id | append: '-1000.webp' | relative_url }} 1000w, {{ '/assets/photography/' | append: photo.id | append: '-1600.webp' | relative_url }} 1600w{% if photo.wide %}, {{ '/assets/photography/' | append: photo.id | append: '-2400.webp' | relative_url }} 2400w{% endif %}" sizes="{% if photo.wide %}(max-width: 1240px) calc(100vw - 40px), 1180px{% else %}(max-width: 600px) calc(100vw - 40px), (max-width: 1240px) 48vw, 620px{% endif %}" alt="{{ photo.alt | escape }}" width="{{ photo.width }}" height="{{ photo.height }}" loading="{% if forloop.first %}eager{% else %}lazy{% endif %}" decoding="async">
      </a>
      <figcaption><span>{{ forloop.index | prepend: '0' }} / {{ photo.caption }}</span><span aria-hidden="true">↗</span></figcaption>
    </figure>
    {% endfor %}
  </div>
  <p class="photography-credit">Photographs by Shakthibala Balamurugan.</p>
</div>

<dialog class="photo-lightbox" data-photo-viewer aria-label="Photograph viewer" aria-describedby="photo-viewer-caption">
  <div class="photo-viewer-toolbar"><p id="photo-viewer-caption" data-photo-caption></p><button type="button" data-photo-close aria-label="Close photograph viewer">Close <span aria-hidden="true">×</span></button></div>
  <div class="photo-viewer-image"><img data-photo-image alt=""></div>
  <div class="photo-viewer-navigation"><button type="button" data-photo-previous aria-label="Previous photograph">← Previous</button><p data-photo-position aria-live="polite" aria-atomic="true"></p><button type="button" data-photo-next aria-label="Next photograph">Next →</button></div>
</dialog>
<script src="{{ '/assets/js/photography.js' | relative_url }}" defer></script>
