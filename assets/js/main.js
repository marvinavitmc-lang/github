gsap.registerPlugin(ScrollTrigger);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Split headline words into per-letter spans for a chars-in reveal (no paid SplitText needed)
document.querySelectorAll('.hero-headline .word').forEach((word) => {
  const text = word.textContent;
  word.textContent = '';
  [...text].forEach((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    word.appendChild(span);
  });
});

if (reduceMotion) {
  gsap.set(['.hero-badge', '.hero-sub', '.hero-cta', '.hero-stats', '.scroll-cue', '.hero-headline .word > span'], { opacity: 1, y: 0, rotateX: 0 });
} else {
  // ---- Opening "wow" timeline ----
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  gsap.set('.hero-sub, .hero-cta, .hero-stats', { y: 16 });

  tl.set('.hero-headline .word > span', { opacity: 0, yPercent: 120, rotateX: -60 })
    .to('[data-blob]', { opacity: 0.55, scale: 1, duration: 1.4, ease: 'power2.out', stagger: 0.1 }, 0)
    .to('.hero-badge', { opacity: 1, y: 0, duration: 0.6 }, 0.1)
    .to('.hero-headline .word > span', { opacity: 1, yPercent: 0, rotateX: 0, duration: 0.9, stagger: 0.018 }, 0.15)
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.45')
    .to('.hero-stats', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .to('.scroll-cue', { opacity: 1, duration: 0.6 }, '-=0.3')
    .call(() => animateCounters());

  // Ambient floating blobs
  gsap.to('[data-blob="1"]', { x: 40, y: 30, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('[data-blob="2"]', { x: -50, y: 20, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('[data-blob="3"]', { x: 30, y: -30, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('[data-blob="4"]', { x: 20, y: 20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  // Scroll reveals
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 24, duration: 0.6, ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
    });
  });

  // Parallax layers in showcase
  gsap.utils.toArray('.parallax-layer').forEach((layer, i) => {
    gsap.to(layer, {
      yPercent: (i + 1) * -6, ease: 'none',
      scrollTrigger: { trigger: layer.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });
  });
}

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const counter = { val: 0 };
    gsap.to(counter, {
      val: target, duration: 1.6, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(counter.val); },
    });
  });
}
if (reduceMotion) {
  document.querySelectorAll('[data-count]').forEach((el) => { el.textContent = el.dataset.count; });
}

// Magnetic buttons
if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.btn-magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.35, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1,0.4)' }));
  });

  // 3D tilt on cards
  document.querySelectorAll('.card-tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: px * 8, rotateX: -py * 8, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    });
    card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' }));
  });
}
