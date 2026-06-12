// ===========================
// NAV SCROLL EFFECT
// ===========================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = mobileMenu.classList.contains('open');
  spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

// ===========================
// SCROLL FADE-IN ANIMATION
// ===========================
const fadeEls = document.querySelectorAll(
  '.section-title, .section-label, .about-text, .about-education, ' +
  '.skill-group, .project-card, .cert-card, .achievement-item, ' +
  '.contact-card, .edu-card, .hero-text, .hero-photo-wrap'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60 * (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

// stagger siblings
document.querySelectorAll(
  '.skills-grid, .projects-grid, .cert-grid, .contact-grid, .achievements-list'
).forEach(container => {
  Array.from(container.children).forEach((child, i) => {
    child.dataset.delay = i;
  });
});

fadeEls.forEach(el => observer.observe(el));

// ===========================
// ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--clr-text)';
          }
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach(s => sectionObserver.observe(s));

// ===========================
// HERO STATS COUNTER ANIMATION
// ===========================
function animateCount(el, target, decimals = 0, suffix = '') {
  const duration = 1600;
  const start = performance.now();
  const step = ts => {
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = (target * ease).toFixed(decimals);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = document.querySelectorAll('.stat-num');
      const targets = [8.44, 3, 4];
      const decimals = [2, 0, 0];
      const suffixes = ['', '+', '+'];
      nums.forEach((el, i) => animateCount(el, targets[i], decimals[i], suffixes[i]));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
