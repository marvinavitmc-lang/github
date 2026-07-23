// Lightweight, dependency-free version of home.js (no GSAP) for embedding
// as a Shopify Custom Liquid section, where payload size matters.
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
    document.querySelectorAll('.bar-fill').forEach(function (el) { el.classList.add('filled'); });
    document.querySelectorAll('.stat-num').forEach(function (el) { el.textContent = el.dataset.target; });
  } else {
    var heroSection = document.querySelector('main > section:first-of-type');
    if (heroSection) {
      heroSection.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
    }

    var revealIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      if (!heroSection || !heroSection.contains(el)) revealIo.observe(el);
    });

    function animateCount(num) {
      var target = parseFloat(num.dataset.target);
      var start = null;
      var duration = 900;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        num.textContent = (target * p).toFixed(2);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var statIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        statIo.unobserve(entry.target);
        var row = entry.target;
        row.querySelectorAll('.bar-fill').forEach(function (fill) { fill.classList.add('filled'); });
        row.querySelectorAll('.stat-num').forEach(animateCount);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-stat-block]').forEach(function (el) { statIo.observe(el); });
  }

  var toast = document.getElementById('toast');
  var toastTimer = null;
  function showToast() {
    if (!toast) return;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2400);
  }
  var form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast();
      form.reset();
    });
  }
})();
