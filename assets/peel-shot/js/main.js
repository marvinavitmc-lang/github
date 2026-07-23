gsap.registerPlugin(ScrollTrigger);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach((el) => { el.style.opacity = 1; });
  document.querySelectorAll('.bar-fill').forEach((el) => { el.style.transform = 'scaleX(1)'; });
  document.querySelectorAll('.stat-num').forEach((el) => { el.textContent = el.dataset.target; });
} else {
  // Hero entrance
  gsap.fromTo('#produit .reveal',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power1.out' }
  );

  // Generic scroll reveal for everything below the fold
  gsap.utils.toArray('section .reveal').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
    });
  });

  // Stat bars: fill + count up when the section enters view
  document.querySelectorAll('.stat-row').forEach((row) => {
    const fill = row.querySelector('.bar-fill');
    const num = row.querySelector('.stat-num');
    const target = parseFloat(num.dataset.target);
    ScrollTrigger.create({
      trigger: row,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(fill, { scaleX: target / 100, duration: 1.1, ease: 'expo.out' });
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target, duration: 1.1, ease: 'expo.out',
          onUpdate: () => { num.textContent = counter.val.toFixed(2); },
        });
      },
    });
  });
}

// Sticky mobile add-to-cart bar: show once the hero CTA scrolls out of view
const stickyBar = document.getElementById('sticky-bar');
const heroCta = document.querySelector('#produit a[href="#acheter"]');
if (stickyBar && heroCta) {
  const io = new IntersectionObserver(
    ([entry]) => {
      stickyBar.classList.toggle('translate-y-full', entry.isIntersecting);
    },
    { threshold: 0 }
  );
  io.observe(heroCta);
}

// Add-to-cart feedback: brief toast confirmation on the terminal purchase buttons
const toast = document.getElementById('toast');
let toastTimer = null;
function showToast() {
  if (!toast) return;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
['final-cta', 'sticky-cta'].forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', showToast);
});
