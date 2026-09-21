# Software Requirements Specification (SRS)
## Proyek: Website Portofolio Interaktif Mahasiswa
### Mata Kuliah: Pemrograman Web (4 SKS)

---

### Informasi Mahasiswa & Proyek
- **Nama Mahasiswa**: Andrasena Nugraha
- **NIM**: 25091397129
- **Kelas**: 2025I
- **Program Studi**: Sarjana Terapan (D4) Manajemen Informatika
- **Fakultas / Kampus**: Fakultas Vokasi, Universitas Negeri Surabaya (UNESA)
- **Dosen Pengampu**:
  1. Ari Kurniawan, S.Kom., M.T.
  2. Faris Abdi El Hakim, S.Kom., M.Tr.Kom.
- **Tahun Akademik**: 2025/2026
- **Dokumen Versi**: 1.0.0
- **Tanggal Rilis**: 21 September 2026

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen
Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SRS) ini disusun sebagai dokumentasi teknis formal untuk memenuhi kriteria penilaian Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web dengan bobot penilaian 30 poin. Dokumen ini mendefinisikan kebutuhan fungsional, kebutuhan antarmuka, kebutuhan non-fungsional, serta arsitektur teknis dari Website Portofolio Personal Andrasena Nugraha.

### 1.2 Ruang Lingkup Produk
Sistem yang dikembangkan adalah situs web portofolio personal berbasis *single-page application* (SPA) interaktif dengan arsitektur murni HTML5, CSS3, dan Vanilla JavaScript (ES6+). Website ini mengintegrasikan data riil dari akun GitHub (@anessaja27) dan LinkedIn Andrasena Nugraha untuk menyajikan informasi akademik, rekam jejak proyek perangkat lunak, keahlian teknis, dan kanal komunikasi interaktif.

### 1.3 Definisi, Akronim, dan Singkatan
- **DOM (Document Object Model)**: Representasi struktural dokumen web yang dapat dimanipulasi melalui JavaScript.
- **AJAX (Asynchronous JavaScript and XML)**: Teknik komunikasi data asinkron antara antarmuka web dan server latar belakang tanpa perlu memuat ulang (reload) halaman secara menyeluruh.
- **REST API**: Arsitektur antarmuka pemrograman aplikasi berbasis protokol HTTP untuk transfer representasi data JSON.
- **Glassmorphism**: Gaya visual desain antarmuka modern yang memanfaatkan efek latar belakang buram (*backdrop-filter blur*), transparansi semi-transparan, serta garis batas halus menyerupai kaca.
- **SRS**: Software Requirements Specification (Spesifikasi Kebutuhan Perangkat Lunak).
- **SPA**: Single Page Application.
- **W3C**: World Wide Web Consortium (badan standar internasional untuk World Wide Web).

### 1.4 Referensi Dokumen
- Panduan Penugasan UTS Pemrograman Web - Sarjana Terapan Manajemen Informatika UNESA.
- Standar W3C HTML5 dan CSS3 Specification.
- Dokumentasi Resmi GitHub REST API v3 (`https://docs.github.com/en/rest`).

---

## 2. Deskripsi Umum Sistem (Overall Description)

### 2.1 Perspektif Produk
Website ini bertindak sebagai media representasi kompetensi digital dan akademik mahasiswa. Sistem beroperasi secara independen di sisi klien (*client-side execution*) dan dihosting pada layanan server publik GitHub Pages.

```
+-------------------------------------------------------------+
|                      User / Web Browser                     |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|              Client Layer: HTML5 + CSS3 + JS               |
|  - Semantic Structure (index.html)                          |
|  - Design System & Glassmorphism (css/style.css)            |
|  - Theme Controller & Navigation (js/app.js)                |
|  - Form Validator & Realtime Feedback (js/validation.js)    |
|  - Dynamic GitHub Showcase & Fallback (js/github-api.js)    |
+------------------------------+------------------------------+
                               |
                               | (Asynchronous Fetch / AJAX)
                               v
+-------------------------------------------------------------+
|                   External Services Layer                   |
|  - GitHub REST API: api.github.com/users/anessaja27/repos   |
|  - GitHub REST API: api.github.com/users/anessaja27         |
|  - Google Fonts CDN (Plus Jakarta Sans)                     |
+-------------------------------------------------------------+
```

### 2.2 Karakteristik Pengguna
1. **Dosen Evaluator / Pengajar**: Memeriksa kelengkapan kode, struktur semantik HTML5, arsitektur CSS3, penerapan seluruh kriteria JavaScript, dan kebenaran dokumentasi.
2. **Rekruter / Mitra Kolaborasi**: Meninjau portofolio proyek perangkat lunak, keahlian teknis (Dart/Flutter, TypeScript, C++, Python), dan menghubungi mahasiswa.
3. **Pengunjung Umum**: Menelusuri informasi pendidikan dan biografi mahasiswa secara nyaman di berbagai ukuran layar perangkat.

### 2.3 Batasan Lingkungan & Teknologi (Constraints)
- **Teknologi Inti**: Wajib menggunakan Vanilla HTML5, Vanilla CSS3, dan Vanilla JavaScript (ES6+) tanpa ketergantungan framework berat seperti React, Vue, Angular, atau CSS Framework pra-buat (Bootstrap/Tailwind) agar murni menguji kompetensi dasar pemrograman web.
- **Hosting**: Dihosting langsung pada GitHub Pages via repositori GitHub mahasiswa (`anessaja27/PemWeb_UTS`).
- **Penyimpanan Lokal**: Menggunakan `localStorage` peramban untuk persistensi status preferensi tema pengguna (Dark Mode / Light Mode).

---

## 3. Kebutuhan Fungsional (Functional Requirements)

| Kode Kebutuhan | Nama Fitur | Deskripsi Kebutuhan | Kriteria Keberhasilan |
| :--- | :--- | :--- | :--- |
| **FR-01** | Navigasi Halaman Semantik | Sistem menyediakan header lengket (*sticky navbar*) dengan tautan menuju seksi Beranda, Tentang Saya, Pendidikan, Keahlian, Proyek, dan Kontak. | Pengguna dapat berpindah seksi dengan *smooth scroll* dan tautan aktif otomatis terdeteksi saat bergulir. |
| **FR-02** | Theme Switcher (Dark/Light) | Sistem mendukung mode visual ganda (Dark Mode default dan Light Mode) yang dapat diubah melalui tombol toggle interaktif. | Klik tombol mengubah atribut `data-theme` pada elemen root, ikon bertransisi secara dinamis, dan preferensi tersimpan di `localStorage`. |
| **FR-03** | Showcase Proyek Dinamis (AJAX) | Sistem memuat data repositori publik secara asinkron dari GitHub REST API tanpa memuat ulang halaman. | Permintaan HTTP GET dieksekusi via `fetch()`, status koneksi diperbarui, dan kartu proyek digenerate secara dinamis di DOM. |
| **FR-04** | Mekanisme Fallback Data | Sistem menyediakan data cadangan terstruktur jika terjadi gangguan jaringan atau pembatasan kuota (*rate limit*) API GitHub. | Portofolio tetap menampilkan 6 repositori riil mahasiswa beserta tag bahasa, deskripsi, dan tautan tanpa error tampilan. |
| **FR-05** | Filter Kategori Proyek | Pengguna dapat menyaring proyek berdasarkan kategori: *Semua*, *Web*, *Mobile*, dan *Software & Game*. | Menekan tombol filter memperbarui tampilan kartu DOM secara instan tanpa reload halaman. |
| **FR-06** | Validasi Formulir Real-Time | Sistem melakukan validasi interaktif pada input formulir kontak (Nama, Email, Subjek, Isi Pesan). | Feedback visual (warna batas merah/hijau dan pesan error) muncul secara instan saat pengetikan atau saat kehilangan fokus. |
| **FR-07** | Penghitung Karakter Pesan | Formulir menyediakan penghitung karakter live pada bidang input pesan dengan batas maksimal 500 karakter. | Teks penghitung berubah secara dinamis (contoh: `45 / 500`) dan memberikan peringatan visual jika mendekati batas. |
| **FR-08** | Notifikasi Dialog Interaktif | Sistem memunculkan notifikasi *toast* mengambang saat formulir berhasil disubmit secara valid. | Toast muncul dari bawah dengan animasi *slide-in*, menampilkan nama pengirim, dan otomatis tertutup setelah beberapa detik atau saat tombol tutup diklik. |
| **FR-09** | Navigasi Mobile Responsif | Sistem menyediakan menu *drawer* hamburger pada resolusi layar ponsel (&le; 768px). | Menekan ikon hamburger membuka dan menutup menu navigasi secara halus. |

---

## 4. Kebutuhan Non-Fungsional (Non-Functional Requirements)

### 4.1 NFR-01: Performa (Performance)
- Waktu render halaman pertama (*First Contentful Paint*) di bawah 1.2 detik pada koneksi internet standar.
- Aset gambar profil diatur dengan atribut `loading="lazy"` untuk efisiensi bandwidth.
- Ukuran total payload aset inti (HTML, CSS, JS) di bawah 100 KB (sangat ringan).

### 4.2 NFR-02: Antarmuka & Estetika (Usability & Aesthetics)
- Menggunakan pendekatan **subtle glassmorphism** dengan `backdrop-filter: blur(14px)` dan kontras warna yang proporsional serta tidak berlebihan ("cukup-cukup aja", profesional dan modern).
- Tipografi menggunakan font terkurasi Google Font **Plus Jakarta Sans** dengan bobot 300, 400, 500, 600, 700, dan 800.
- Mikro-animasi menggunakan `IntersectionObserver` untuk efek transisi masuk elemen (*fade-in slide-up*) saat digulirkan.

### 4.3 NFR-03: Kompatibilitas & Responsivitas (Compatibility & Responsiveness)
- Berfungsi sempurna pada peramban modern utama: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, dan Opera.
- Tata letak responsif penuh di berbagai ukuran layar:
  - *Mobile Devices*: 320px &ndash; 767px
  - *Tablet Devices*: 768px &ndash; 991px
  - *Desktop / Large Displays*: 992px &ndash; 1920px+

### 4.4 NFR-04: Aksesibilitas (Accessibility / a11y)
- Struktur semantik lengkap: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Setiap tombol interaktif dan ikon memiliki atribut deskriptif seperti `aria-label`, `aria-expanded`, `aria-controls`, dan `title`.
- Form controls memiliki label terkait (`<label for="...">`) serta elemen pengumuman error berkategori `aria-live="polite"`.

---

## 5. Pemetaan Modul Kode Terhadap 5 Kriteria Penilaian JavaScript

| Kriteria JS (Modul UTS) | Berkas Implementasi | Fungsi / Bagian Kode Terkait |
| :--- | :--- | :--- |
| **1. Event Handling** | `js/app.js`, `js/validation.js`, `js/github-api.js` | - `themeToggleBtn.addEventListener('click', ...)`<br>- `mobileToggleBtn.addEventListener('click', ...)`<br>- `window.addEventListener('scroll', ...)`<br>- `filterBtn.addEventListener('click', ...)`<br>- `input.addEventListener('input', ...)`<br>- `form.addEventListener('submit', ...)` |
| **2. DOM Manipulation** | `js/github-api.js`, `js/app.js`, `js/validation.js` | - Injeksi dinamis kartu proyek melalui `container.innerHTML = htmlContent`<br>- Manipulasi atribut tema: `rootElement.setAttribute('data-theme', ...)`<br>- Pembaruan statistik profil GitHub di DOM (`textContent`)<br>- Manipulasi kelas error `.is-invalid` dan `.is-valid`<br>- Generasi pesan notifikasi toast secara dinamis |
| **3. Style & Animation** | `css/style.css`, `js/app.js` | - Animasi masuk scroll menggunakan `IntersectionObserver`<br>- Transisi CSS variabel antarmuka gelap/terang (`transition: all 0.3s`)<br>- Efek hover elevasi kartu dan pembesaran halus ikon<br>- Animasi denyut status indikator API (`@keyframes pulse`)<br>- Animasi putaran loading (*spinner*) AJAX |
| **4. Form Validation** | `js/validation.js` | - `validateName()`: Verifikasi minimal 3 huruf alfabet<br>- `validateEmail()`: Pengujian pola ekspresi reguler RFC email<br>- `validateSubject()`: Verifikasi teks subjek minimal 4 karakter<br>- `validateMessage()`: Verifikasi batas bawah 10 karakter & counter 500 karakter<br>- Pencegahan submit default (`e.preventDefault()`) bila tidak valid |
| **5. AJAX / Asynchronous API** | `js/github-api.js` | - `fetch('https://api.github.com/users/anessaja27')` untuk live statistik<br>- `fetch('https://api.github.com/users/anessaja27/repos')` untuk live repositori<br>- Penanganan Promise berbasis `async/await` dan blok `try...catch`<br>- Fallback gracefully ke dataset cadangan lokal jika kuota API habis |

---

## 6. Kesimpulan
Dokumen SRS ini menjamin bahwa implementasi kode portofolio memenuhi seluruh objektif instruksi tugas UTS Pemrograman Web, mencakup standar semantik HTML5, fleksibilitas CSS3 modern dengan estetika subtle glassmorphism, serta integrasi lengkap 5 aspek interaktivitas JavaScript.
