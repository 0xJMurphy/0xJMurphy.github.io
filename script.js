// Theme toggle with localStorage persistence
(function() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const key = 'jm-theme';
  const saved = localStorage.getItem(key);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setIcon = () => {
    btn.querySelector('.icon').textContent = root.classList.contains('dark') ? '☀' : '☾';
  };

  if (saved === 'dark' || (!saved && prefersDark)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  setIcon();

  btn.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem(key, root.classList.contains('dark') ? 'dark' : 'light');
    setIcon();
  });
})();

// Smooth-scroll with offset for sticky nav (optional enhancement for browsers)
(function() {
  function offsetTop(el) {
    const rect = el.getBoundingClientRect();
    return rect.top + window.pageYOffset - 84; // scroll-margin-top mirrors CSS
  }
  document.querySelectorAll('.nav-link, .btn[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || !id.startsWith('#')) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: offsetTop(target), behavior: 'smooth' });
    });
  });
})();

// IntersectionObserver for scroll animations
(function() {
  const els = document.querySelectorAll('.fade-in-up');
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
})();

// Active section highlighting in nav
(function() {
  const sections = ['#welcome', '#about', '#projects'].map(id => document.querySelector(id)).filter(Boolean);
  const linkMap = {};
  document.querySelectorAll('.nav-link').forEach(link => {
    const tgt = link.getAttribute('href');
    if (tgt) linkMap[tgt] = link;
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        Object.values(linkMap).forEach(l => l.classList.remove('active'));
        if (linkMap[id]) linkMap[id].classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(sec => obs.observe(sec));
})();

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();
