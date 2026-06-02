/* ======================
   FUTURE_FS_01 — script.js
   ====================== */

// --- Typed text animation ---
const typedEl = document.getElementById('typed');
const phrases = [
  'scale infinitely.',
  'matter.',
  'think.',
  'outlast trends.',
  'change the world.',
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIdx];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIdx--)
    : current.substring(0, charIdx++);

  let delay = isDeleting ? 60 : 90;

  if (!isDeleting && charIdx === current.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
setTimeout(typeLoop, 1200);


// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav);


// --- Reveal on scroll ---
const reveals = document.querySelectorAll('.section > .container, .hero-content');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 100);
      });
    }
  });
}, { threshold: 0.1 });

// Add reveal class to children
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .interest-card, .about-stats .stat').forEach(el => {
  el.classList.add('reveal');
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
      });
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.section').forEach(s => sectionObserver.observe(s));


// --- Skill bar animation ---
const skillBars = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);


// --- Counter animation ---
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.4 });
const aboutSection = document.getElementById('about');
if (aboutSection) counterObserver.observe(aboutSection);


// --- Contact form ---
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate submission (replace with your backend/Formspree/EmailJS)
    await new Promise(r => setTimeout(r, 1200));

    statusEl.textContent = '✓ Message sent! I\'ll get back to you soon.';
    form.reset();
    submitBtn.textContent = 'Send Message →';
    submitBtn.disabled = false;

    setTimeout(() => { statusEl.textContent = ''; }, 5000);
  });
}


// --- Smooth scroll for all anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});