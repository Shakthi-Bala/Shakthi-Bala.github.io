---
layout: page
title: research
description: Questions behind my work, project experience, and technical notes.
permalink: /research/
nav: false
nav_order: 2
---

<link rel="stylesheet" href="{{ '/assets/css/research-content.css' | relative_url }}">

<div class="research-page">
  <p>I work on perception and learning for robots. The questions below come from the failure cases and comparisons in these projects.</p>

  <section aria-labelledby="research-questions">
    <h2 id="research-questions">Questions behind the work</h2>
    <div class="research-question">
      <h3>Which geometry should a model be given rather than learn?</h3>
      <p>In the <a href="{{ '/projects/occupancy-world-model/' | relative_url }}">occupancy world model</a>, explicit ego-motion warping made a large difference under the same training schedule. I’m interested in where that division stops helping: moving objects, newly visible space, and imperfect pose estimates.</p>
    </div>
    <div class="research-question">
      <h3>How should a planner treat space it has not observed?</h3>
      <p>The occupancy experiments exposed two related problems: forecasts that leave unseen regions empty, and metrics that confuse missing ground labels with off-road evidence. I want to understand how those unknowns should affect candidate scoring and evaluation.</p>
    </div>
    <div class="research-question">
      <h3>What can a localization system keep using when stereo matching fails?</h3>
      <p>On a difficult EuRoC sequence, temporal tracks remained useful while stereo matches disappeared. The <a href="{{ '/projects/stereo-vio/' | relative_url }}">VIO work</a> investigates how to retain those observations without adding poorly constrained landmarks. The <a href="{{ '/projects/deep-vio/' | relative_url }}">Deep VIO comparison</a> raises a related question: when does a lower prediction loss actually improve the integrated trajectory?</p>
    </div>
    <p>I’d be interested in comparing failure cases, evaluation protocols, and reproduction results with others working on these problems. The <a href="https://github.com/Shakthi-Bala" target="_blank" rel="noopener noreferrer">project repositories</a> contain the code and supporting records.</p>
  </section>

  <section aria-labelledby="recent-work">
    <h2 id="recent-work">Recent work</h2>
    <ul>
      <li><a href="{{ '/projects/occupancy-world-model/' | relative_url }}">Occupancy forecasting:</a> a warp/no-warp ablation and matched-candidate planning comparisons.</li>
      <li><a href="{{ '/projects/imitation-learning/' | relative_url }}">Robot learning:</a> zero-shot transfer to a simulated UR5e and paired evaluation of PPO fine-tuning.</li>
      <li><a href="{{ '/projects/devresearchflow/' | relative_url }}">Research software:</a> checking that reviewed code and data still match what an experiment runs.</li>
    </ul>
  </section>

  <section aria-labelledby="project-experience">
    <h2 id="project-experience">Project experience</h2>
    <p>Dates below come from repository history. They show when work was recorded in Git; coursework terms are included where documented.</p>
    <ol class="research-timeline">
      {% for entry in site.data.project_experience %}
      <li>
        <p class="research-period">{{ entry.period }}</p>
        <h3><a href="{{ entry.project | relative_url }}">{{ entry.title }}</a></h3>
        <p class="research-context">{{ entry.type }}</p>
        <p>{{ entry.contribution }}</p>
        <a class="research-history" href="{{ entry.history }}" target="_blank" rel="noopener noreferrer">{{ entry.activity }}</a>
      </li>
      {% endfor %}
    </ol>
  </section>

  <section aria-labelledby="skills-in-use">
    <h2 id="skills-in-use">Skills in use</h2>
    <ul>
      <li><strong>C++17, Eigen, Ceres, ROS 2:</strong> <a href="{{ '/projects/stereo-vio/' | relative_url }}">Stereo VIO</a> — numerical parity, two estimation back ends, profiling, and bag playback.</li>
      <li><strong>PyTorch and geometry:</strong> <a href="{{ '/projects/occupancy-world-model/' | relative_url }}">Occupancy world model</a> — SE(2) warping, temporal prediction, and a controlled ablation.</li>
      <li><strong>MuJoCo, flow matching, PPO:</strong> <a href="{{ '/projects/imitation-learning/' | relative_url }}">UR5e transfer</a> — a simulation task and final-checkpoint comparisons on matched start states.</li>
      <li><strong>Sensor fusion and model evaluation:</strong> <a href="{{ '/projects/deep-vio/' | relative_url }}">Deep VIO</a> — comparing modalities, fusion strategies, and integrated trajectories.</li>
      <li><strong>OpenCV and optical flow:</strong> <a href="{{ '/projects/gap-navigation/' | relative_url }}">Gap navigation</a> — connecting image-space detections to waypoint motion.</li>
      <li><strong>Python CLI design, Git, schemas, testing:</strong> <a href="{{ '/projects/devresearchflow/' | relative_url }}">DevResearchFlow</a> — staged-file validation, input manifests, execution receipts, and packaging checks.</li>
    </ul>
  </section>

  <section aria-labelledby="technical-notes">
    <h2 id="technical-notes">Technical notes</h2>
    <ul class="research-note-list">
      <li><a href="{{ '/notes/stereo-tracking-dropouts/' | relative_url }}">Keeping tracks when stereo matching fails</a><br>Engineering note · Exposure differences, monocular observations, and triangulation checks on EuRoC V2_03.</li>
      <li><a href="{{ '/notes/occupancy-metric-checks/' | relative_url }}">Checking collision metrics against the logged trajectory</a><br>Experiment note · Missing ground labels, body-height bands, and stray labels inside the ego box.</li>
    </ul>
    <p><a href="{{ '/publications/' | relative_url }}">Reports &amp; documentation</a> — course reports, technical write-ups, and validation records, labeled by type.</p>
  </section>
</div>
