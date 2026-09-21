/**
 * ============================================================================
 * GITHUB API & AJAX SERVICE
 * Tugas UTS Pemrograman Web - Kriteria JavaScript 5: AJAX & DOM Manipulation
 * Mahasiswa: Andrasena Nugraha (NIM: 25091397129)
 * GitHub: https://github.com/anessaja27
 * ============================================================================
 */

// Dataset cadangan (fallback data) riil dari akun GitHub anessaja27
// Digunakan bila terjadi GitHub API Rate Limit (HTTP 403) atau koneksi terbatas
const FALLBACK_PROJECTS = [
  {
    name: "Wheel-Spin-Inter-25",
    description: "Aplikasi wheel spin untuk menentukan anggota kelompok secara gacha/random untuk kelas 2025I Prodi D4 Manajemen Informatika UNESA (Proyek Akhir IDCamp 2025).",
    language: "Dart",
    languageColor: "#00B4AB",
    stars: 0,
    forks: 0,
    category: "mobile",
    html_url: "https://github.com/anessaja27/Wheel-Spin-Inter-25",
    homepage: ""
  },
  {
    name: "SmadaPay",
    description: "Aplikasi e-wallet tugas akhir Kelas 12 SMAN 2 Probolinggo untuk memfasilitasi berbagai transaksi digital di area sekolah berbasis C++.",
    language: "C++",
    languageColor: "#f34b7d",
    stars: 0,
    forks: 0,
    category: "apps",
    html_url: "https://github.com/anessaja27/SmadaPay",
    homepage: ""
  },
  {
    name: "diet_in",
    description: "Aplikasi mobile penghitung berat badan ideal (BMI) dan pelacak kebutuhan gizi harian berbasis Dart & Flutter.",
    language: "Dart",
    languageColor: "#00B4AB",
    stars: 0,
    forks: 0,
    category: "mobile",
    html_url: "https://github.com/anessaja27/diet_in",
    homepage: ""
  },
  {
    name: "harmoni-baking-hub",
    description: "Platform web interaktif resep dan komunitas baking terstruktur menggunakan modern TypeScript dan komponen modular.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    category: "web",
    html_url: "https://github.com/anessaja27/harmoni-baking-hub",
    homepage: ""
  },
  {
    name: "a-farmer-s-tale",
    description: "Tugas proyek pemrograman game interaktif dengan mekanik simulasi pertanian menggunakan Godot Engine dan GDScript.",
    language: "GDScript",
    languageColor: "#355570",
    stars: 0,
    forks: 1,
    category: "apps",
    html_url: "https://github.com/anessaja27/a-farmer-s-tale",
    homepage: ""
  },
  {
    name: "Praktikum-Matematika-Komputasi-Week-4",
    description: "Praktikum untuk mata kuliah Matematika Komputasi dengan 15 modul algoritma komputasi berbasis Python di UNESA.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    forks: 0,
    category: "apps",
    html_url: "https://github.com/anessaja27/Praktikum-Matematika-Komputasi-Week-4",
    homepage: ""
  }
];

// Mapping warna bahasa pemrograman
const LANGUAGE_COLORS = {
  "Dart": "#00B4AB",
  "TypeScript": "#3178c6",
  "JavaScript": "#f1e05a",
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  "C++": "#f34b7d",
  "Python": "#3572A5",
  "GDScript": "#355570"
};

// State global untuk data proyek
let currentProjectsList = [];
let activeFilter = 'all';

/**
 * Mengidentifikasi kategori proyek berdasarkan bahasa atau deskripsi
 */
function classifyCategory(repo) {
  const lang = (repo.language || '').toLowerCase();
  const name = (repo.name || '').toLowerCase();
  const desc = (repo.description || '').toLowerCase();

  if (lang === 'typescript' || lang === 'javascript' || lang === 'html' || lang === 'css' || name.includes('hub') || name.includes('web')) {
    return 'web';
  } else if (lang === 'dart' || desc.includes('flutter') || name.includes('diet') || name.includes('spin')) {
    return 'mobile';
  } else {
    return 'apps';
  }
}

/**
 * Mengambil data profil dan statistik GitHub menggunakan AJAX / Fetch API
 */
async function fetchGitHubStats() {
  const username = 'anessaja27';
  const statusBadge = document.getElementById('api-status-badge');
  const statusText = document.getElementById('api-status-text');

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }

    const userData = await response.json();

    // Update DOM dengan statistik profil nyata
    const reposEl = document.getElementById('stat-repos');
    const followersEl = document.getElementById('stat-followers');
    const followingEl = document.getElementById('stat-following');
    const avatarImg = document.getElementById('github-avatar');

    if (reposEl) reposEl.textContent = userData.public_repos ?? 6;
    if (followersEl) followersEl.textContent = userData.followers ?? 2;
    if (followingEl) followingEl.textContent = userData.following ?? 1;
    if (avatarImg && userData.avatar_url) avatarImg.src = userData.avatar_url;

    if (statusBadge && statusText) {
      statusBadge.className = 'api-status-badge badge-success';
      statusText.textContent = 'GitHub Live API';
    }
  } catch (error) {
    console.warn('Menggunakan data cache lokal statistik GitHub:', error.message);
    if (statusBadge && statusText) {
      statusBadge.className = 'api-status-badge badge-warning';
      statusText.textContent = 'Offline / Cache Mode';
    }
  }
}

/**
 * Mengambil daftar repositori GitHub secara asinkron (AJAX)
 */
async function fetchGitHubRepositories() {
  const username = 'anessaja27';
  const container = document.getElementById('projects-grid');

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!response.ok) {
      throw new Error(`Status ${response.status}: API rate limit atau unreachable.`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      throw new Error("Data repositori kosong");
    }

    // Transformasi data API ke format terstandarisasi
    currentProjectsList = repos.map(repo => ({
      name: repo.name,
      description: repo.description || 'Proyek open-source dari mahasiswa D4 Manajemen Informatika UNESA.',
      language: repo.language || 'Code',
      languageColor: LANGUAGE_COLORS[repo.language] || '#3b82f6',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      category: classifyCategory(repo),
      html_url: repo.html_url,
      homepage: repo.homepage || ''
    }));

    renderProjects(currentProjectsList, activeFilter);

  } catch (error) {
    console.info('Pemberitahuan AJAX: Mengaktifkan cadangan data portofolio:', error.message);
    // Menggunakan data cadangan riil yang aman tanpa error tampilan
    currentProjectsList = FALLBACK_PROJECTS;
    renderProjects(currentProjectsList, activeFilter);
  }
}

/**
 * Render kartu proyek ke DOM secara dinamis (Kriteria JS 2: DOM Manipulation)
 */
function renderProjects(projects, filter = 'all') {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  // Filter data sesuai kategori yang dipilih
  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="loading-state">
        <p>Belum ada proyek pada kategori ini.</p>
      </div>
    `;
    return;
  }

  // Bangun elemen kartu HTML secara dinamis
  const htmlContent = filtered.map(project => `
    <article class="project-card glass-card animate-on-scroll is-visible" data-category="${project.category}">
      <div class="project-top">
        <div class="project-header-row">
          <div class="project-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </div>
          <div class="project-links">
            <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="icon-btn-link" title="Buka di GitHub" aria-label="Buka kode di GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>

        <h3 class="project-name">${escapeHTML(project.name)}</h3>
        <p class="project-desc">${escapeHTML(project.description)}</p>
      </div>

      <div class="project-bottom">
        <div class="project-lang">
          <span class="lang-dot" style="background-color: ${project.languageColor};"></span>
          <span>${escapeHTML(project.language)}</span>
        </div>

        <div class="project-stats">
          <span class="stat-unit" title="Bintang GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${project.stars}</span>
          </span>
          <span class="stat-unit" title="Fork Repositori">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></svg>
            <span>${project.forks}</span>
          </span>
        </div>
      </div>
    </article>
  `).join('');

  container.innerHTML = htmlContent;
}

/**
 * Sanitasi string untuk mencegah celah XSS
 */
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Inisialisasi event listener tombol filter kategori
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Perbarui kelas tombol aktif
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Ambil filter yang dipilih
      activeFilter = button.getAttribute('data-filter') || 'all';
      renderProjects(currentProjectsList, activeFilter);
    });
  });
}

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  fetchGitHubStats();
  fetchGitHubRepositories();
});
