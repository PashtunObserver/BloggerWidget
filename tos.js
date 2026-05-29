/**
 * RASHID TOC - PROTECTED TABLE OF CONTENTS ENGINE
 * Prefix: rashid_
 * Version: 5.0 - Multi-Layer Backlink Protection
 * 
 * CRITICAL: Do not modify, remove, or alter any backlink-related code.
 * This script contains multiple protection layers.
 */

(function() {
  'use strict';

  // ========================================================================
  // PROTECTION LAYER 1 - Core Configuration
  // ========================================================================
  var rashid_cfg = {
    headingText: 'Table of Contents',
    minHeadings: 2,
    headingSelectors: 'h2, h3, h4',
    scrollOffset: 90,
    backlinkUrl: 'https://www.pashtomedium.com/',
    backlinkText: 'Pashto Medium - Latest News & Updates',
    backlinkDomain: 'pashtomedium.com',
    backlinkProtocol: 'https://'
  };

  // ========================================================================
  // PROTECTION LAYER 2 - Backup Configuration (Hidden)
  // ========================================================================
  var _rshd_bkp_cfg_1 = {
    url: 'https://www.pashtomedium.com/',
    text: 'Pashto Medium - Latest News & Updates',
    domain: 'pashtomedium.com'
  };

  var _rshd_bkp_cfg_2 = {
    url: 'https://www.pashtomedium.com/',
    text: 'Pashto Medium - Latest News & Updates',
    domain: 'pashtomedium.com'
  };

  var _rshd_bkp_cfg_3 = {
    url: 'https://www.pashtomedium.com/',
    text: 'Pashto Medium - Latest News & Updates',
    domain: 'pashtomedium.com'
  };

  // ========================================================================
  // PROTECTION LAYER 3 - Integrity Check Functions
  // ========================================================================
  function _rshd_integrity_check_1() {
    return rashid_cfg.backlinkUrl === 'https://www.pashtomedium.com/' &&
           rashid_cfg.backlinkDomain === 'pashtomedium.com';
  }

  function _rshd_integrity_check_2() {
    return _rshd_bkp_cfg_1.url === 'https://www.pashtomedium.com/' &&
           _rshd_bkp_cfg_2.url === 'https://www.pashtomedium.com/' &&
           _rshd_bkp_cfg_3.url === 'https://www.pashtomedium.com/';
  }

  function _rshd_integrity_check_3() {
    var links = document.querySelectorAll('a[href*="pashtomedium.com"]');
    return links.length >= 1;
  }

  // ========================================================================
  // PROTECTION LAYER 4 - Popup Warning System
  // ========================================================================
  function _rshd_show_violation_popup() {
    var overlay = document.createElement('div');
    overlay.className = 'rashid-toc-popup-overlay';
    overlay.innerHTML = 
      '<div class="rashid-toc-popup-box">' +
        '<div class="rashid-toc-popup-icon">⚠️</div>' +
        '<div class="rashid-toc-popup-title">License Violation Detected</div>' +
        '<div class="rashid-toc-popup-text">' +
          'The backlink to <strong>Pashto Medium</strong> has been removed or modified. ' +
          'This widget requires the original backlink to function. ' +
          'Please restore the backlink to <strong>https://www.pashtomedium.com/</strong> ' +
          'or contact the developer for a licensed version.' +
        '</div>' +
        '<button class="rashid-toc-popup-btn" onclick="this.closest(\'.rashid-toc-popup-overlay\').remove()">' +
          'I Understand' +
        '</button>' +
      '</div>';
    
    document.body.appendChild(overlay);
    
    // Disable TOC functionality
    var toc = document.querySelector('.rashid-toc');
    if (toc) {
      toc.style.opacity = '0.3';
      toc.style.pointerEvents = 'none';
    }
  }

  // ========================================================================
  // PROTECTION LAYER 5 - Master Validation
  // ========================================================================
  function _rshd_validate_backlink() {
    var check1 = _rshd_integrity_check_1();
    var check2 = _rshd_integrity_check_2();
    var check3 = _rshd_integrity_check_3();
    
    if (!check1 || !check2 || !check3) {
      _rshd_show_violation_popup();
      return false;
    }
    return true;
  }

  // ========================================================================
  // PROTECTION LAYER 6 - Periodic Re-validation
  // ========================================================================
  function _rshd_start_monitoring() {
    setInterval(function() {
      _rshd_validate_backlink();
    }, 5000);
    
    // Also check on any DOM changes
    if (window.MutationObserver) {
      var observer = new MutationObserver(function() {
        _rshd_validate_backlink();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  // ========================================================================
  // CORE WIDGET FUNCTIONS
  // ========================================================================
  var rashid_headings = [];
  var rashid_container = null;

  function rashid_slug(text, index) {
    return 'rashid-' + text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 35) + '-' + index;
  }

  function rashid_scrollTo(el) {
    var top = window.pageYOffset + el.getBoundingClientRect().top - rashid_cfg.scrollOffset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function rashid_findPostBody() {
    var selectors = [
      '.post-body',
      '.entry-content',
      'article .post-content',
      '.post-inner',
      '.post-entry',
      '.post-body-container',
      '.entry-body',
      '#post-body'
    ];

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

  function rashid_createContainer() {
    var div = document.createElement('div');
    div.id = 'rashid-toc-root';
    return div;
  }

  function rashid_build() {
    var postBody = rashid_findPostBody();
    if (!postBody) return false;

    var firstPara = rashid_findFirstParagraph(postBody);
    if (!firstPara) return false;

    rashid_container = rashid_createContainer();

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

  // ========================================================================
  // BACKLINK RENDERING - MULTIPLE LAYERS
  // ========================================================================
  function rashid_render_backlinks() {
    var url = rashid_cfg.backlinkUrl;
    var text = rashid_cfg.backlinkText;
    
    // Layer 1 - Main hidden backlink
    var backlink1 = '<a href="' + url + '" class="rashid-toc-backlink-1" rel="noopener" target="_blank" aria-hidden="true" tabindex="-1">' + text + '</a>';
    
    // Layer 2 - Backup hidden backlink
    var backlink2 = '<a href="' + _rshd_bkp_cfg_1.url + '" class="rashid-toc-backlink-2" rel="noopener" target="_blank" aria-hidden="true" tabindex="-1">' + _rshd_bkp_cfg_1.text + '</a>';
    
    // Layer 3 - Secondary backup
    var backlink3 = '<a href="' + _rshd_bkp_cfg_2.url + '" class="rashid-toc-backlink-3" rel="noopener" target="_blank" aria-hidden="true" tabindex="-1">' + _rshd_bkp_cfg_2.text + '</a>';
    
    // Layer 4 - Decoy elements
    var decoy1 = '<span class="rashid-toc-decoy-1" data-rashid-ref="pashtomedium"></span>';
    var decoy2 = '<span class="rashid-toc-decoy-2" data-rashid-domain="www.pashtomedium.com"></span>';
    var decoy3 = '<span class="rashid-toc-decoy-3" data-rashid-verify="https://www.pashtomedium.com/"></span>';
    
    // Layer 5 - Integrity markers
    var integrity1 = '<span class="rashid-toc-integrity-1">pashtomedium</span>';
    var integrity2 = '<span class="rashid-toc-integrity-2">pashtomedium-com</span>';
    var integrity3 = '<span class="rashid-toc-integrity-3">https-www-pashtomedium-com</span>';
    
    return backlink1 + backlink2 + backlink3 + decoy1 + decoy2 + decoy3 + integrity1 + integrity2 + integrity3;
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
  // INITIALIZATION WITH PROTECTION
  // ========================================================================
  function rashid_init() {
    // Validate before building
    if (!_rshd_validate_backlink()) {
      return;
    }
    
    if (!rashid_build()) return;
    rashid_render();
    
    // Start monitoring after initialization
    _rshd_start_monitoring();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rashid_init);
  } else {
    rashid_init();
  }

  // ========================================================================
  // PROTECTION LAYER 7 - Expose validation globally
  // ========================================================================
  window._rshd_validate = _rshd_validate_backlink;
  window._rshd_popup = _rshd_show_violation_popup;

})();