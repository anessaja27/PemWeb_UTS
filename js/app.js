/**
 * ============================================================================
 * MAIN APPLICATION LOGIC
 * Tugas UTS Pemrograman Web - Sarjana Terapan Manajemen Informatika UNESA
 * Mahasiswa: Andrasena Nugraha (NIM: 25091397129)
 * Kriteria JavaScript:
 * 1. Event Handling (Click, Scroll, Toggle, Navigation)
 * 2. DOM Manipulation (Dynamic Theme, Active Link, Mobile Drawer)
 * 3. Style & Animation (IntersectionObserver, Transitions)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initMobileNavigation();
  initScrollEffects();
  initIntersectionAnimations();
});

/**
 * ----------------------------------------------------------------------------
 * 1. Theme Switcher (Dark Mode <-> Light Mode)
 * Menyimpan preferensi di localStorage agar tidak hilang saat reload halaman.
 * ----------------------------------------------------------------------------
 */
function initThemeSwitcher() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  // Baca tema tersimpan di localStorage atau default ke 'dark'
  const savedTheme = localStorage.getItem('theme-mode') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      applyTheme(newTheme);
      localStorage.setItem('theme-mode', newTheme);
    });
  }

  function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      themeToggleBtn.setAttribute('aria-label', isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
      themeToggleBtn.setAttribute('title', isDark ? 'Mode Gelap Aktif (Klik untuk Mode Terang)' : 'Mode Terang Aktif (Klik untuk Mode Gelap)');
    }
  }
}

/**
 * ----------------------------------------------------------------------------
 * 2. Mobile Navigation Toggle (Hamburger Drawer)
 * ----------------------------------------------------------------------------
 */
function initMobileNavigation() {
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggleBtn || !navMenu) return;

  // Toggle buka/tutup menu mobile
  mobileToggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  function openMenu() {
    navMenu.classList.add('open');
    mobileToggleBtn.classList.add('open');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    mobileToggleBtn.setAttribute('aria-label', 'Tutup menu navigasi');
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    mobileToggleBtn.classList.remove('open');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    mobileToggleBtn.setAttribute('aria-label', 'Buka menu navigasi');
  }

  // Tutup menu saat pengguna mengklik salah satu link menu
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Tutup menu jika pengguna mengklik di luar menu
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !mobileToggleBtn.contains(e.target)) {
      closeMenu();
    }
  });
}

/**
 * ----------------------------------------------------------------------------
 * 3. Scroll Effects & Active Navigation Tracking
 * Memberi efek bayangan pada header saat scroll dan menandai menu yang aktif.
 * ----------------------------------------------------------------------------
 */
function initScrollEffects() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header shadow effect
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active link highlighting based on scroll position
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/**
 * ----------------------------------------------------------------------------
 * 4. IntersectionObserver for Reveal Animations on Scroll
 * Menganimasikan elemen secara halus saat memasuki viewport (Kriteria JS 3)
 * ----------------------------------------------------------------------------
 */
function initIntersectionAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (!('IntersectionObserver' in window)) {
    // Fallback jika browser lawas tidak mendukung IntersectionObserver
    animatedElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Berhenti mengamati setelah elemen terlihat
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}
