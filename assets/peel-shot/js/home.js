gsap.registerPlugin(ScrollTrigger);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Split hero headline words into per-letter spans for a stagger reveal
document.querySelectorAll('.hero-headline .word').forEach((word) => {
  const text = word.textContent;
  word.textContent = '';
  [...text].forEach((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    word.appendChild(span);
  });
});

const heroSection = document.querySelector('main > section:first-of-type');
const heroReveals = heroSection ? [...heroSection.querySelectorAll('.reveal')] : [];

if (reduceMotion) {
  document.querySelectorAll('.reveal, .hero-headline .word > span').forEach((el) => { el.style.opacity = 1; });
  document.querySelectorAll('.stat-num').forEach((el) => { el.textContent = el.dataset.target; });
} else {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.fromTo('[data-blob]', { scale: 0.85 }, { scale: 1, duration: 1.2, ease: 'power2.out', stagger: 0.08 }, 0)
    .fromTo(heroReveals, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.1)
    .fromTo('.hero-headline .word > span', { opacity: 0, yPercent: 120 }, { opacity: 1, yPercent: 0, duration: 0.8, stagger: 0.015 }, 0.15);

  gsap.to('[data-blob="1"]', { x: 30, y: 20, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('[data-blob="2"]', { x: -30, y: 15, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('[data-blob="3"]', { x: 20, y: -20, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  gsap.utils.toArray('section .reveal').forEach((el) => {
    if (heroReveals.includes(el)) return; // already handled by the hero timeline above
    gsap.fromTo(el, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
    });
  });

  document.querySelectorAll('.stat-num').forEach((num) => {
    ScrollTrigger.create({
      trigger: num,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const target = parseFloat(num.dataset.target);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target, duration: 1.2, ease: 'expo.out',
          onUpdate: () => { num.textContent = counter.val.toFixed(2); },
        });
      },
    });
  });
}

// Newsletter form: demo confirmation (no backend wired up yet)
const toast = document.getElementById('toast');
let toastTimer = null;
function showToast() {
  if (!toast) return;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast();
    newsletterForm.reset();
  });
}
