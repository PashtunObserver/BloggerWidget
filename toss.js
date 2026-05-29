/**
 * RASHID TOC - PROTECTED TABLE OF CONTENTS ENGINE
 * Prefix: rashid_
 * Version: 5.1 - Fixed validation timing
 */

(function() {
  'use strict';

  // ========================================================================
  // CORE CONFIGURATION
  // ========================================================================
  var rashid_cfg = {
    headingText: 'Table of Contents',
    minHeadings: 2,
    headingSelectors: 'h2, h3, h4',
    scrollOffset: 90,
    backlinkUrl: 'https://www.pashtomedium.com/',
    backlinkText: 'Pashto Medium - Latest News & Updates',
    backlinkDomain: 'pashtomedium.com'
  };

  // ========================================================================
  // BACKUP CONFIGURATIONS (Hidden layers)
  // ========================================================================
  var _rshd_bkp_1 = { url: 'https://www.pashtomedium.com/', text: 'Pashto Medium', domain: 'pashtomedium.com' };
  var _rshd_bkp_2 = { url: 'https://www.pashtomedium.com/', text: 'Pashto Medium', domain: 'pashtomedium.com' };
  var _rshd_bkp_3 = { url: 'https://www.pashtomedium.com/', text: 'Pashto Medium', domain: 'pashtomedium.com' };

  // ========================================================================
  // STATE
  // ========================================================================
  var rashid_headings = [];
  var rashid_container = null;
  var _rshd_monitor = null;
  var _rshd_violated = false;

  // ========================================================================
  // POPUP WARNING
  // ========================================================================
  function _rshd_show_popup() {
    if (_rshd_violated) return;
    _rshd_violated = true;

    if (_rshd_monitor) clearInterval(_rshd_monitor);

    var existing = document.querySelector('.rashid-toc-popup-overlay');
    if (existing) return;

    var overlay = document.createElement('div');
    overlay.className = 'rashid-toc-popup-overlay';
    overlay.innerHTML = 
      '<div class="rashid-toc-popup-box">' +
        '<div class="rashid-toc-popup-icon">⚠️</div>' +
        '<div class="rashid-toc-popup-title">License Violation Detected</div>' +
        '<div class="rashid-toc-popup-text">' +
          'The backlink to <strong>Pashto Medium</strong> has been removed or modified. ' +
          'Please restore the backlink to <strong>https://www.pashtomedium.com/</strong>.' +
        '</div>' +
        '<button class="rashid-toc-popup-btn" onclick="this.closest(\'.rashid-toc-popup-overlay\').remove()">I Understand</button>' +
      '</div>';

    document.body.appendChild(overlay);

    var toc = document.querySelector('.rashid-toc');
    if (toc) {
      toc.style.opacity = '0.3';
      toc.style.pointerEvents = 'none';
    }
  }

  // ========================================================================
  // VALIDATION - Checks if backlink exists in DOM
  // ========================================================================
  function _rshd_check_backlink() {
    // Check 1: Main config intact
    if (rashid_cfg.backlinkUrl !== 'https://www.pashtomedium.com/') return false;
    if (rashid_cfg.backlinkDomain !== 'pashtomedium.com') return false;

    // Check 2: Backup configs intact
    if (_rshd_bkp_1.url !== 'https://www.pashtomedium.com/') return false;
    if (_rshd_bkp_2.url !== 'https://www.pashtomedium.com/') return false;
    if (_rshd_bkp_3.url !== 'https://www.pashtomedium.com/') return false;

    // Check 3: DOM contains backlink links
    var links = document.querySelectorAll('a[href*="pashtomedium.com"]');
    if (links.length < 1) return false;

    // Check 4: At least one link has correct full URL
    var foundCorrect = false;
    for (var i = 0; i < links.length; i++) {
      if (links[i].href === 'https://www.pashtomedium.com/' || 
          links[i].getAttribute('href') === 'https://www.pashtomedium.com/') {
        foundCorrect = true;
        break;
      }
    }
    if (!foundCorrect) return false;

    return true;
  }

  // ========================================================================
  // MONITORING - Runs AFTER render, every 10 seconds
  // ========================================================================
  function _rshd_start_monitor() {
    // Don't start if already violated
    if (_rshd_violated) return;

    // Immediate check after short delay (allow render to complete)
    setTimeout(function() {
      if (!_rshd_check_backlink()) {
        _rshd_show_popup();
        return;
      }

      // Periodic check every 10 seconds
      _rshd_monitor = setInterval(function() {
        if (!_rshd_check_backlink()) {
          _rshd_show_popup();
        }
      }, 10000);

    }, 2000);
  }

  // ========================================================================
  // CORE WIDGET FUNCTIONS
  // ========================================================================
  function rashid_slug(text, index) {
    return 'rashid-' + text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 35) + '-' + index;
  }

  function rashid_scrollTo(el) {
    var top = window.pageYOffset + el.getBoundingClientRect().top - rashid_cfg.scrollOffset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function rashid_findPostBody() {
    var selectors = ['.post-body', '.entry-content', 'article .post-content', '.post-inner', '.post-entry', '.entry-body', '#post-body'];
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (el) return el;
    }
    var articles = document.querySelectorAll('article');
    for (var j = 0; j < articles.length; j++) {
      if (articles[j].querySelector('p')) return articles[j];
    }
    return null;
  }

  function rashid_findFirstParagraph(postBody) {
    var paragraphs = postBody.querySelectorAll('p');
    for (var i = 0; i < paragraphs.length; i++) {
      var p = paragraphs[i];
      var text = p.textContent.trim();
      if (text.length > 20 && !p.closest('.rashid-toc')) {
        return p;
      }
    }
    return paragraphs[0] || null;
  }

  function rashid_build() {
    var postBody = rashid_findPostBody();
    if (!postBody) return false;

    var firstPara = rashid_findFirstParagraph(postBody);
    if (!firstPara) return false;

    rashid_container = document.createElement('div');
    rashid_container.id = 'rashid-toc-root';

    var all = postBody.querySelectorAll(rashid_cfg.headingSelectors);
    rashid_headings = [];

    for (var i = 0; i < all.length; i++) {
      if (!all[i].closest('#rashid-toc-root')) {
        rashid_headings.push(all[i]);
      }
    }

    if (rashid_headings.length < rashid_cfg.minHeadings) {
      return false;
    }

    for (var j = 0; j < rashid_headings.length; j++) {
      if (!rashid_headings[j].id) {
        rashid_headings[j].id = rashid_slug(rashid_headings[j].textContent, j);
      }
    }

    if (firstPara.nextSibling) {
      firstPara.parentNode.insertBefore(rashid_container, firstPara.nextSibling);
    } else {
      firstPara.parentNode.appendChild(rashid_container);
    }

    return true;
  }

  function rashid_render_backlinks() {
    var url = rashid_cfg.backlinkUrl;
    var text = rashid_cfg.backlinkText;

    var bk1 = '<a href="' + url + '" class="rashid-toc-backlink-1" rel="noopener" target="_blank" aria-hidden="true" tabindex="-1">' + text + '</a>';
    var bk2 = '<a href="' + _rshd_bkp_1.url + '" class="rashid-toc-backlink-2" rel="noopener" target="_blank" aria-hidden="true" tabindex="-1">' + _rshd_bkp_1.text + '</a>';
    var bk3 = '<a href="' + _rshd_bkp_2.url + '" class="rashid-toc-backlink-3" rel="noopener" target="_blank" aria-hidden="true" tabindex="-1">' + _rshd_bkp_2.text + '</a>';

    var dec1 = '<span class="rashid-toc-decoy-1" data-rashid-ref="pashtomedium"></span>';
    var dec2 = '<span class="rashid-toc-decoy-2" data-rashid-domain="www.pashtomedium.com"></span>';
    var dec3 = '<span class="rashid-toc-decoy-3" data-rashid-verify="https://www.pashtomedium.com/"></span>';

    var int1 = '<span class="rashid-toc-integrity-1">pashtomedium</span>';
    var int2 = '<span class="rashid-toc-integrity-2">pashtomedium-com</span>';
    var int3 = '<span class="rashid-toc-integrity-3">https-www-pashtomedium-com</span>';

    return bk1 + bk2 + bk3 + dec1 + dec2 + dec3 + int1 + int2 + int3;
  }

  function rashid_render() {
    var title = rashid_cfg.headingText;
    var html = '';

    for (var i = 0; i < rashid_headings.length; i++) {
      var h = rashid_headings[i];
      var tag = h.tagName.toLowerCase();
      html += '<li class="rashid-toc-item rashid-toc-item-' + tag + '">' +
        '<a href="#' + h.id + '" class="rashid-toc-link" data-rashid-target="' + h.id + '">' +
        h.textContent.trim() + '</a></li>';
    }

    var backlinks = rashid_render_backlinks();

    rashid_container.innerHTML =
      '<div class="rashid-toc" data-rashid-verify="pashtomedium-com">' +
        '<div class="rashid-toc-header">' +
          '<span class="rashid-toc-icon">☰</span>' +
          '<span class="rashid-toc-title">' + title + '</span>' +
          '<span class="rashid-toc-badge">' + rashid_headings.length + '</span>' +
        '</div>' +
        '<div class="rashid-toc-body">' +
          '<ul class="rashid-toc-list">' + html + '</ul>' +
        '</div>' +
        backlinks +
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

  // ========================================================================
  // INITIALIZATION
  // ========================================================================
  function rashid_init() {
    if (!rashid_build()) return;
    rashid_render();

    // Start monitoring AFTER render completes
    _rshd_start_monitor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rashid_init);
  } else {
    rashid_init();
  }

})();