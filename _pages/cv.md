---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<!-- Drop your PDF in the files/ folder and the link below will work. -->
[Download as PDF](/files/cv.pdf)

Education
======
* TODO Ph.D. in Astronomy, University, Year
* TODO M.S. in Astronomy, University, Year
* TODO B.S. in Astronomy, University, Year

Positions
======
* TODO Year–present: Postdoctoral Researcher
  * Korea Gemini Office, Korea Astronomy and Space Science Institute
  * TODO: one line on what you do there

Research interests
======
* TODO interest 1
* TODO interest 2

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>

Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Service and outreach
======
* TODO: referee work, committee membership, public talks, observatory duties
