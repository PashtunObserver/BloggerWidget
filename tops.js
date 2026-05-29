/**
 * ============================================================
 * RASHID TOC WIDGET - ALL-IN-ONE TABLE OF CONTENTS
 * Version: 8.0 - Single File (CSS + JS Combined)
 * ============================================================
 */

(function() {
  'use strict';

  // ========================================================================
  // INJECT CSS DYNAMICALLY
  // ========================================================================
  var rashid_css = `
/* ============================================
   RASHID TOC - TABLE OF CONTENTS STYLES
   Version: 8.0 - Embedded in JS
   ============================================ */

.rashid-toc * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.rashid-toc {
  width: 100%;
  margin: 20px 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.rashid-toc-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #1e1b4b;
  border-radius: 10px 10px 0 0;
}

.rashid-toc-icon {
  font-size: 16px;
}

.rashid-toc-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rashid-toc-badge {
  margin-left: auto;
  background: rgba(255,255,255,0.2);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
}

.rashid-toc-body {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 10px 10px;
  padding: 8px 0;
  max-height: 400px;
  overflow-y: auto;
}

.rashid-toc-list {
  list-style: none;
}

.rashid-toc-item {
  border-bottom: 1px solid #f1f5f9;
}

.rashid-toc-item:last-child {
  border-bottom: none;
}

.rashid-toc-link {
  display: block;
  padding: 10px 18px;
  text-decoration: none;
  color: #475569;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  transition: all 0.2s ease;
}

.rashid-toc-link:hover {
  color: #4f46e5;
  background: #f8fafc;
  padding-left: 22px;
}

.rashid-toc-item-h3 .rashid-toc-link {
  padding-left: 32px;
  font-size: 12px;
  color: #64748b;
}

.rashid-toc-item-h3 .rashid-toc-link:hover {
  padding-left: 36px;
}

.rashid-toc-item-h4 .rashid-toc-link {
  padding-left: 48px;
  font-size: 11px;
  color: #94a3b8;
}

.rashid-toc-item-h4 .rashid-toc-link:hover {
  padding-left: 52px;
}

/* Natural invisible backlink */
.rashid-toc-nlink,
.rashid-toc-nlink * {
  color: inherit !important;
  text-decoration: none !important;
  border-bottom: none !important;
  background: transparent !important;
  font-weight: inherit !important;
  font-style: inherit !important;
  font-size: inherit !important;
  font-family: inherit !important;
  line-height: inherit !important;
  letter-spacing: inherit !important;
  text-transform: inherit !important;
  box-shadow: none !important;
  outline: none !important;
  cursor: text !important;
}

.rashid-toc-nlink:hover,
.rashid-toc-nlink:active,
.rashid-toc-nlink:visited,
.rashid-toc-nlink:focus {
  color: inherit !important;
  text-decoration: none !important;
  border-bottom: none !important;
  background: transparent !important;
  outline: none !important;
  box-shadow: none !important;
}

.rashid-toc-imglink {
  display: inline;
  color: inherit !important;
  text-decoration: none !important;
}

/* Popup */
.rashid-toc-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rashid-toc-popup-box {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  animation: rashid-popup-slide 0.4s ease;
}

@keyframes rashid-popup-slide {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.rashid-toc-popup-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.rashid-toc-popup-title {
  font-size: 20px;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 12px;
}

.rashid-toc-popup-text {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 20px;
}

.rashid-toc-popup-btn {
  background: #dc2626;
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.rashid-toc-popup-btn:hover {
  background: #b91c1c;
}

@media (max-width: 480px) {
  .rashid-toc-header {
    padding: 10px 14px;
  }
  .rashid-toc-title {
    font-size: 13px;
  }
  .rashid-toc-link {
    padding: 9px 14px;
    font-size: 12px;
  }
  .rashid-toc-link:hover {
    padding-left: 18px;
  }
  .rashid-toc-item-h3 .rashid-toc-link {
    padding-left: 26px;
  }
  .rashid-toc-item-h3 .rashid-toc-link:hover {
    padding-left: 30px;
  }
  .rashid-toc-item-h4 .rashid-toc-link {
    padding-left: 38px;
  }
  .rashid-toc-item-h4 .rashid-toc-link:hover {
    padding-left: 42px;
  }
}
`;

  // Inject CSS into head
  var styleEl = document.createElement('style');
  styleEl.textContent = rashid_css;
  document.head.appendChild(styleEl);

  // ========================================================================
  // CORE CONFIGURATION
  // ========================================================================
  var rashid_cfg = {
    headingText: 'Table of Contents',
    minHeadings: 2,
    headingSelectors: 'h2, h3, h4',
    scrollOffset: 90,
    backlinkUrl: 'https://www.pashtomedium.com/',
    backlinkText: 'Pashto Medium',
    backlinkAlt: 'Pashto Medium - Latest News and Updates',
    backlinkDomain: 'pashtomedium.com'
  };

  // ========================================================================
  // BACKUP CONFIGURATIONS
  // ========================================================================
  var _rshd_bkp_1 = { url: 'https://www.pashtomedium.com/', text: 'Pashto Medium', alt: 'Pashto Medium - Latest News and Updates', domain: 'pashtomedium.com' };
  var _rshd_bkp_2 = { url: 'https://www.pashtomedium.com/', text: 'Pashto Medium', alt: 'Pashto Medium - Latest News and Updates', domain: 'pashtomedium.com' };
  var _rshd_bkp_3 = { url: 'https://www.pashtomedium.com/', text: 'Pashto Medium', alt: 'Pashto Medium - Latest News and Updates', domain: 'pashtomedium.com' };

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
  // VALIDATION
  // ========================================================================
  function _rshd_check_backlink() {
    if (rashid_cfg.backlinkUrl !== 'https://www.pashtomedium.com/') return false;
    if (rashid_cfg.backlinkDomain !== 'pashtomedium.com') return false;
    if (_rshd_bkp_1.url !== 'https://www.pashtomedium.com/') return false;
    if (_rshd_bkp_2.url !== 'https://www.pashtomedium.com/') return false;
    if (_rshd_bkp_3.url !== 'https://www.pashtomedium.com/') return false;

    var links = document.querySelectorAll('a[href*="pashtomedium.com"]');
    if (links.length < 1) return false;

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
  // MONITORING
  // ========================================================================
  function _rshd_start_monitor() {
    if (_rshd_violated) return;

    setTimeout(function() {
      if (!_rshd_check_backlink()) {
        _rshd_show_popup();
        return;
      }

      _rshd_monitor = setInterval(function() {
        if (!_rshd_check_backlink()) {
          _rshd_show_popup();
        }
      }, 10000);

    }, 2000);
  }

  // ========================================================================
  // CORE FUNCTIONS
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
      if (text.length > 20 && !p.closest('.rashid-toc') && !p.closest('#rashid-toc-root')) {
        return p;
      }
    }
    return paragraphs[0] || null;
  }

  // ========================================================================
  // SMART BACKLINK INJECTION
  // ========================================================================
  function rashid_injectBacklink(postBody) {
    var url = rashid_cfg.backlinkUrl;
    var alt = rashid_cfg.backlinkAlt;

    // PRIORITY 1: Full stop (.) in last paragraph
    var lastPara = rashid_getLastParagraph(postBody);
    if (lastPara) {
      var html = lastPara.innerHTML;
      var lastDot = html.lastIndexOf('.');
      if (lastDot !== -1 && lastDot > html.length - 50) {
        var before = html.substring(0, lastDot);
        var after = html.substring(lastDot);
        lastPara.innerHTML = before + '<a href="' + url + '" class="rashid-toc-nlink" target="_blank" title="' + alt + '">.</a>' + after.substring(1);
        return true;
      }
    }

    // PRIORITY 2: Comma (,) in last paragraph
    if (lastPara) {
      var html2 = lastPara.innerHTML;
      var lastComma = html2.lastIndexOf(',');
      if (lastComma !== -1 && lastComma > html2.length - 60) {
        var before2 = html2.substring(0, lastComma);
        var after2 = html2.substring(lastComma);
        lastPara.innerHTML = before2 + '<a href="' + url + '" class="rashid-toc-nlink" target="_blank" title="' + alt + '">,</a>' + after2.substring(1);
        return true;
      }
    }

    // PRIORITY 3: Any comma in any paragraph
    var allParas = postBody.querySelectorAll('p');
    for (var p = allParas.length - 1; p >= 0; p--) {
      var para = allParas[p];
      if (para.closest('.rashid-toc') || para.closest('#rashid-toc-root')) continue;
      var pHtml = para.innerHTML;
      var anyComma = pHtml.lastIndexOf(',');
      if (anyComma !== -1) {
        var b3 = pHtml.substring(0, anyComma);
        var a3 = pHtml.substring(anyComma);
        para.innerHTML = b3 + '<a href="' + url + '" class="rashid-toc-nlink" target="_blank" title="' + alt + '">,</a>' + a3.substring(1);
        return true;
      }
    }

    // PRIORITY 4: Image in post
    var images = postBody.querySelectorAll('img');
    for (var imgIdx = 0; imgIdx < images.length; imgIdx++) {
      var img = images[imgIdx];
      if (img.closest('.rashid-toc') || img.closest('#rashid-toc-root')) continue;
      var parent = img.parentNode;
      var wrapper = document.createElement('a');
      wrapper.href = url;
      wrapper.className = 'rashid-toc-imglink';
      wrapper.target = '_blank';
      wrapper.title = alt;
      parent.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      return true;
    }

    // PRIORITY 5: Last header (H2/H3/H4)
    if (rashid_headings.length > 0) {
      var lastHeader = rashid_headings[rashid_headings.length - 1];
      var hHtml = lastHeader.innerHTML;
      lastHeader.innerHTML = '<a href="' + url + '" class="rashid-toc-nlink" target="_blank" title="' + alt + '">' + hHtml + '</a>';
      return true;
    }

    return false;
  }

  function rashid_getLastParagraph(postBody) {
    var paragraphs = postBody.querySelectorAll('p');
    for (var i = paragraphs.length - 1; i >= 0; i--) {
      var p = paragraphs[i];
      var text = p.textContent.trim();
      if (text.length > 20 && !p.closest('.rashid-toc') && !p.closest('#rashid-toc-root')) {
        return p;
      }
    }
    return null;
  }

  // ========================================================================
  // BUILD - NO HEADINGS = NO TOC
  // ========================================================================
  function rashid_build() {
    var postBody = rashid_findPostBody();
    if (!postBody) return false;

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

    var firstPara = rashid_findFirstParagraph(postBody);
    if (!firstPara) return false;

    rashid_container = document.createElement('div');
    rashid_container.id = 'rashid-toc-root';

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

    rashid_injectBacklink(postBody);

    return true;
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
    _rshd_start_monitor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rashid_init);
  } else {
    rashid_init();
  }

})();