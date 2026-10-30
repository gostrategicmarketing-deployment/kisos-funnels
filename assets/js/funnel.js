/* KIS OS funnels: shared behavior. No data leaves the browser in this spec build.
   In production, swap the stubs marked GHL for the real GHL form/calendar embeds. */
(function () {
  "use strict";

  var KIS = (window.KIS = window.KIS || {});

  // ICP floor in USD/month collected ($30K+, set 2026-10-30).
  // Change this one number to move the qualify / not-yet line on both funnels.
  KIS.ICP_FLOOR = 30000;

  var TRACK_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];
  var STORE = "kis_funnel";

  function read() {
    try { return JSON.parse(sessionStorage.getItem(STORE)) || {}; } catch (e) { return {}; }
  }
  function write(obj) {
    try { sessionStorage.setItem(STORE, JSON.stringify(obj)); } catch (e) { /* private mode: page still works */ }
  }
  KIS.get = function (k) { return read()[k]; };
  KIS.set = function (patch) {
    var s = read();
    for (var k in patch) s[k] = patch[k];
    write(s);
  };

  // Keep first-touch ad params so they reach the GHL form/calendar on later pages.
  var params = new URLSearchParams(location.search);
  var tracking = KIS.get("tracking") || {};
  var changed = false;
  TRACK_KEYS.forEach(function (k) {
    if (params.get(k) && !tracking[k]) { tracking[k] = params.get(k); changed = true; }
  });
  if (changed) KIS.set({ tracking: tracking });

  function decorate(href) {
    var t = KIS.get("tracking") || {};
    var keys = Object.keys(t);
    if (!keys.length) return href;
    var u = new URL(href, location.href);
    if (u.origin !== location.origin) return href;
    keys.forEach(function (k) { if (!u.searchParams.has(k)) u.searchParams.set(k, t[k]); });
    return u.pathname + u.search + u.hash;
  }
  KIS.go = function (href) { location.href = decorate(href); };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("a[data-keep]").forEach(function (a) { a.href = decorate(a.getAttribute("href")); });

    // Personalize any [data-first-name] slot.
    var lead = KIS.get("lead") || {};
    document.querySelectorAll("[data-first-name]").forEach(function (el) {
      if (lead.first_name) el.textContent = lead.first_name;
    });

    // Sticky mobile CTA appears once the hero CTA scrolls out of view.
    var sticky = document.querySelector(".sticky");
    var anchor = document.querySelector("[data-sticky-anchor]");
    if (sticky && anchor && "IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { sticky.classList.toggle("show", !e.isIntersecting && e.boundingClientRect.top < 0); });
      }).observe(anchor);
    }
  });

  KIS.validEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };

  // GHL: replace with the real pixel/CAPI event call once the account is connected.
  KIS.track = function (name, data) {
    if (window.fbq) window.fbq("trackCustom", name, data || {});
    if (window.console) console.info("[KIS event]", name, data || {});
  };
})();
