/**
 * RASHID TOC - SIMPLE TABLE OF CONTENTS ENGINE
 * Prefix: rashid_
 * Version: 3.0 - With Hidden Backlink
 */

(function() {
  'use strict';

  var rashid_cfg = {
    containerId: 'rashid-toc-root',
    headingText: 'Table of Contents',
    minHeadings: 2,
    headingSelectors: 'h2, h3, h4',
    scrollOffset: 90,
    backlinkUrl: 'https://www.pashtomedium.com/',
    backlinkText: 'Pashto Medium - Latest News & Updates'
  };

  var rashid_headings = [];
  var rashid_container = null;

  function rashid_slug(text, index) {
    return 'rashid-' + text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 35) + '-' + index;
  }

  function rashid_scrollTo(el) {
    var top = window.pageYOffset + el.getBoundingClientRect().top - rashid_cfg.scrollOffset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function rashid_build() {
    rashid_container = document.getElementById(rashid_cfg.containerId);
    if (!rashid_container) return false;

    var body = rashid_container.closest('.post-body, .entry-content, article') ||
               document.querySelector('.post-body, .entry-content') ||
               document.body;

    var all = body.querySelectorAll(rashid_cfg.headingSelectors);
    rashid_headings = [];

    for (var i = 0; i < all.length; i++) {
      if (!all[i].closest('#' + rashid_cfg.containerId)) {
        rashid_headings.push(all[i]);
      }
    }

    if (rashid_headings.length < rashid_cfg.minHeadings) {
      rashid_container.style.display = 'none';
      return false;
    }

    for (var j = 0; j < rashid_headings.length; j++) {
      if (!rashid_headings[j].id) {
        rashid_headings[j].id = rashid_slug(rashid_headings[j].textContent, j);
      }
    }

    return true;
  }

  function rashid_render() {
    var title = rashid_container.getAttribute('data-rashid-title') || rashid_cfg.headingText;
    var html = '';

    for (var i = 0; i < rashid_headings.length; i++) {
      var h = rashid_headings[i];
      var tag = h.tagName.toLowerCase();

      html += '<li class="rashid-toc-item rashid-toc-item-' + tag + '">' +
        '<a href="#' + h.id + '" class="rashid-toc-link" data-rashid-target="' + h.id + '">' +
        h.textContent.trim() + '</a></li>';
    }

    // Hidden backlink placed inside the widget container
    var backlinkHtml = '<a href="' + rashid_cfg.backlinkUrl + '" class="rashid-toc-hidden" rel="noopener" target="_blank" aria-hidden="true" tabindex="-1">' +
      rashid_cfg.backlinkText +
      '</a>';

    rashid_container.innerHTML =
      '<div class="rashid-toc">' +
        '<div class="rashid-toc-header">' +
          '<span class="rashid-toc-icon">☰</span>' +
          '<span class="rashid-toc-title">' + title + '</span>' +
          '<span class="rashid-toc-badge">' + rashid_headings.length + '</span>' +
        '</div>' +
        '<div class="rashid-toc-body">' +
          '<ul class="rashid-toc-list">' + html + '</ul>' +
        '</div>' +
        backlinkHtml +
      '</div>';

    var links = rashid_container.querySelectorAll('.rashid-toc-link');
    for (var k = 0; k < links.length; k++) {
      links[k].addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.getElementById(this.getAttribute('data-rashid-target'));
        if (!target) return;

        rashid_scrollTo(target);
        if (history.pushState) history.pushState(null, null, '#' + target.id);
      });
    }
  }

  function rashid_init() {
    if (!rashid_build()) return;
    rashid_render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rashid_init);
  } else {
    rashid_init();
  }

})();