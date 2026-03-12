document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar Logic
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Menu Logic
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconMoon = document.querySelector('.theme-icon-moon');
  const themeIconSun = document.querySelector('.theme-icon-sun');
  const htmlEl = document.documentElement;
  const mainLogo = document.querySelector('.logo img');

  // Initialize theme from storage (default to 'dark')
  const savedTheme = localStorage.getItem('idr-theme') || 'dark';

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('idr-theme', theme);
    
    if (theme === 'light') {
      if (themeIconMoon) themeIconMoon.style.display = 'block';
      if (themeIconSun) themeIconSun.style.display = 'none';
      if (mainLogo) mainLogo.src = 'assets/logo-full-light.svg';
    } else {
      if (themeIconMoon) themeIconMoon.style.display = 'none';
      if (themeIconSun) themeIconSun.style.display = 'block';
      if (mainLogo) mainLogo.src = 'assets/logo-full.svg';
    }
  }

  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Dynamic Glow Effect on Cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Smooth Scrolling for anchor links (fallback for browsers that don't support scroll-behavior)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
