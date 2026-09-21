# Website Portofolio Interaktif - UTS Pemrograman Web
> Proyek Tugas Ujian Tengah Semester (UTS) Mata Kuliah **Pemrograman Web**  
> Program Studi **Sarjana Terapan (D4) Manajemen Informatika**, Fakultas Vokasi, Universitas Negeri Surabaya (UNESA)

---

## 📌 Identitas Mahasiswa & Tugas

| Data Mahasiswa | Keterangan |
| :--- | :--- |
| **Nama Lengkap** | **Andrasena Nugraha** |
| **NIM** | **25091397129** |
| **Kelas** | **2025I** |
| **Program Studi** | D4 Manajemen Informatika |
| **Fakultas / Kampus** | Fakultas Vokasi, Universitas Negeri Surabaya |
| **Mata Kuliah** | Pemrograman Web (4 SKS) |
| **Dosen Pengampu** | 1. Ari Kurniawan, S.Kom., M.T.<br>2. Faris Abdi El Hakim, S.Kom., M.Tr.Kom. |
| **Akun GitHub** | [@anessaja27](https://github.com/anessaja27) |
| **Profil LinkedIn** | [Andrasena Nugraha](https://id.linkedin.com/in/andrasena-nugraha-0a5a30376) |

---

## 🌐 Alamat Domain & Live Demo (GitHub Pages)

Situs web ini dihosting langsung menggunakan **GitHub Pages**:
- **Alamat Domain / Live Demo**:  
  👉 **[https://anessaja27.github.io/PemWeb_UTS/](https://anessaja27.github.io/PemWeb_UTS/)**
- **Tautan Repositori GitHub**:  
  👉 **[https://github.com/anessaja27/PemWeb_UTS](https://github.com/anessaja27/PemWeb_UTS)**

---

## 🚀 Panduan Menjalankan Proyek

### 1. Membuka Melalui Browser Langsung (Offline / Lokal)
1. Unduh (download) atau clone repositori ini ke komputer Anda:
   ```bash
   git clone https://github.com/anessaja27/PemWeb_UTS.git
   ```
2. Buka folder proyek `PemWeb_UTS`.
3. Klik dua kali pada berkas `index.html` atau klik kanan lalu pilih **Open with Google Chrome / Firefox / Edge**.
4. Website siap dijelajahi secara penuh (didukung data lokal fallback jika tidak ada koneksi internet).

### 2. Membuka Menggunakan Local Server (VS Code Live Server)
1. Buka folder proyek di **Visual Studio Code**.
2. Pasang ekstensi **Live Server** (oleh Ritwick Dey).
3. Klik kanan pada berkas `index.html` dan pilih **Open with Live Server**.
4. Website akan terbuka di `http://127.0.0.1:5500`.

### 3. Cara Mengaktifkan GitHub Pages (Hosting)
1. Masuk ke halaman repositori di GitHub: `https://github.com/anessaja27/PemWeb_UTS`.
2. Klik menu **Settings** (Pengaturan repositori).
3. Pada sidebar kiri di bagian *Code and automation*, pilih **Pages**.
4. Di bagian **Build and deployment > Source**, pilih **Deploy from a branch**.
5. Di bagian **Branch**, pilih cabang `main` dan folder `/(root)`, kemudian klik tombol **Save**.
6. Tunggu proses deployment sekitar 1-2 menit. URL publik akan tampil di bagian atas: `https://anessaja27.github.io/PemWeb_UTS/`.

---

## 📂 Struktur Direktori Proyek

```
PemWeb_UTS/
├── index.html            # Halaman utama dengan struktur HTML5 semantik
├── css/
│   └── style.css         # Styling modern, design tokens, subtle glassmorphism & responsivitas
├── js/
│   ├── app.js            # Navigasi, theme switcher (Dark/Light), scroll animations
│   ├── github-api.js     # AJAX / Fetch API ke GitHub REST API + kartu proyek dinamis
│   └── validation.js     # Validasi formulir interaktif client-side & notifikasi toast
├── SRS.md                # Dokumen Software Requirements Specification (30 Poin)
└── README.md             # Dokumentasi penjelasan kodingan & panduan evaluasi
```

---

## 📋 Penjelasan Pemenuhan Rubrik Penilaian UTS

### 1. Struktur HTML (Bobot: 20 Poin)
Struktur dokumen dirancang mengikuti kaidah **HTML5 Semantics** dan prinsip aksesibilitas (W3C Web Standards):
- **`<header>` & `<nav>`**: Menyediakan navigasi utama yang jelas dengan menu *Beranda*, *Tentang Saya*, *Pendidikan*, *Keahlian*, *Proyek GitHub*, dan *Kontak*, serta tombol pengganti tema dan tombol toggle mobile drawer.
- **`<main>`**: Menampung konten inti halaman yang terbagi dalam seksi-seksi mandiri:
  - `<section id="hero">`: Area perkenalan utama, status mahasiswa UNESA, identitas akademik, CTA button, dan tautan sosial resmi.
  - `<section id="about">`: Seksi biografi personal, riwayat asal sekolah (SMAN 2 Probolinggo), dan metadata akademik perkuliahan.
  - `<section id="education">`: Timeline riwayat pendidikan (D4 Manajemen Informatika UNESA, SMAN 2 Probolinggo, dan SMPN 4 Probolinggo).
  - `<section id="skills">`: Pengelompokan keahlian teknis (Frontend, Mobile/Software, Tools).
  - `<section id="projects">`: Kontainer repositori dinamis berbasis `<article>` yang diinjeksi via JavaScript.
  - `<section id="contact">`: Seksi formulir interaktif lengkap dengan penanda `<label for="...">`, kontainer input, dan penampung pesan error semantik (`aria-live="polite"`).
- **`<footer>`**: Menampilkan ringkasan identitas mahasiswa, mata kuliah, dosen pengampu, tautan navigasi, dan tombol *Back to Top*.
- **Aksesibilitas (a11y)**: Menggunakan atribut standar seperti `aria-label`, `aria-expanded`, `aria-controls`, `role="alert"`, dan struktur heading berjenjang (`h1`, `h2`, `h3`).

### 2. Desain CSS & Estetika (Bobot: 30 Poin)
Gaya visual dirancang dengan konsep modern, elegan, dan proporsional (**subtle glassmorphism** yang tidak berlebihan/lebay):
- **CSS Custom Properties (Variables)**: Mengatur warna dasar, permukaan, teks, dan aksen secara terpusat untuk mempermudah transisi tema (Dark Mode dan Light Mode).
- **Subtle Glassmorphism**:
  - `backdrop-filter: blur(14px)` dan `-webkit-backdrop-filter: blur(14px)`.
  - Latar belakang semi-transparan (`rgba(17, 23, 38, 0.65)` pada dark mode dan `rgba(255, 255, 255, 0.75)` pada light mode).
  - Garis batas halus (`1px solid var(--glass-border)`) dengan efek hover yang lembut.
  - Ornamen *ambient glow orbs* di latar belakang untuk memberikan kedalaman visual yang estetik.
- **Tipografi Terkurasi**: Menggunakan font **Plus Jakarta Sans** dari Google Fonts yang bersih, modern, dan mudah dibaca.
- **Layout Fleksibel & Responsif**:
  - Menggabungkan **CSS Grid** untuk susunan kartu profil, keahlian, proyek, dan formulir.
  - Menggunakan **Flexbox** untuk tata letak navigasi, baris tombol, dan kartu metadata.
  - *Media Queries* lengkap untuk memastikan tampilan presisi di layar ponsel (320px+), tablet, hingga monitor desktop beresolusi tinggi.

### 3. Kreativitas dan Desain (Bobot: 20 Poin)
- **Karakter Personal Mahasiswa**: Mengangkat identitas nyata Andrasena Nugraha, memadukan portofolio tugas akhir SMA (SmadaPay di SMAN 2 Probolinggo), proyek perkuliahan UNESA (Wheel Spin Inter'25 untuk kelas 2025I), hingga praktikum matematika komputasi dan tugas game.
- **Micro-Interactions**: Hover effect halus pada kartu, tombol interaktif dengan bayangan dinamis, animasi berdenyut (*pulse*) pada status sinkronisasi API, dan transisi mulus saat berpindah mode tema.
- **Feedback Langsung**: Penghitung jumlah karakter pesan pada form yang berubah warna saat mendekati batas limit, serta notifikasi toast yang meluncur mulus.

### 4. Dokumentasi dan SRS (Bobot: 30 Poin)
- Tersedia berkas **[`SRS.md`](SRS.md)** formal berskala standar rekayasa perangkat lunak yang merinci tujuan, ruang lingkup, kebutuhan fungsional (FR-01 s.d. FR-09), kebutuhan non-fungsional (performa, antarmuka, aksesibilitas), serta matriks keterlacakan.
- Dokumentasi pada `README.md` ini menyajikan instruksi penggunaan yang mudah dipahami oleh dosen penilai maupun pengguna umum.

### 5. Fungsionalitas JavaScript (Bobot: 20 Poin)
Seluruh 5 (lima) instruksi interaksi JavaScript diimplementasikan secara komprehensif:

#### A. Event Handling (`js/app.js`, `js/validation.js`, `js/github-api.js`)
- **Click Event**: Tombol pengubah tema (*Dark/Light toggle*), tombol filter kategori proyek, tombol navigasi hamburger mobile, tombol tutup toast notifikasi, dan tombol kembali ke atas.
- **Scroll Event**: Pendeteksian posisi gulir layar untuk menambahkan bayangan pada sticky header dan mengaktifkan indikator menu aktif (*active link tracking*).
- **Input & Blur Event**: Pendeteksian perubahan teks pada kolom formulir kontak secara real-time.
- **Submit Event**: Intersepsi pengiriman formulir dengan `e.preventDefault()` untuk validasi terarah.

#### B. DOM Manipulation (`js/github-api.js`, `js/app.js`, `js/validation.js`)
- **Injeksi Kartu Proyek Dinamis**: Mengonversi array objek data repositori menjadi elemen kartu HTML (`<article>`) secara dinamis menggunakan manipulasi properti `innerHTML`.
- **Manipulasi Atribut Tema**: Mengubah atribut `data-theme` pada tag `<html>` (`rootElement.setAttribute('data-theme', ...)`).
- **Pembaruan Statistik Real-Time**: Memperbarui angka repositori publik, followers, dan following di halaman web secara langsung.
- **Feedback Validasi**: Menambahkan dan mencopot kelas visual `.is-invalid` / `.is-valid` serta menyisipkan pesan teks kesalahan ke dalam elemen `<span>` error.
- **Penghitung Karakter Dinamis**: Mengubah teks pada elemen `#char-counter` saat pengguna mengetik pesan.

#### C. Style & Animation (`css/style.css`, `js/app.js`)
- **IntersectionObserver API**: Menganimasikan elemen dengan kelas `.animate-on-scroll` menjadi muncul (*fade-in slide-up*) ketika elemen tersebut masuk ke dalam area pandang layar pengguna.
- **Transisi Tema CSS**: Perpindahan warna antara gelap dan terang dilakukan melalui transisi variabel CSS tanpa kedipan layar (*flicker*).
- **Animasi Notifikasi Toast**: Animasi pergeseran vertikal (*slide-in / slide-out*) yang dikendalikan melalui manipulasi kelas CSS `.show`.
- **Animasi Loading Spinner**: Mengindikasikan proses penarikan data repositori secara asinkron.

#### D. Form Validation (`js/validation.js`)
- **Validasi Nama**: Wajib diisi, minimal 3 karakter, dan hanya memperbolehkan huruf serta spasi (mencegah karakter khusus atau script).
- **Validasi Email**: Pengujian format alamat email menggunakan ekspresi reguler (Regex) standar RFC (`/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`).
- **Validasi Subjek**: Wajib diisi dengan panjang minimal 4 karakter.
- **Validasi Pesan**: Wajib diisi, minimal 10 karakter, dan maksimal 500 karakter dengan penghitung langsung.
- **Alur Feedback Pengguna**: Jika ada input yang keliru, kolom tersebut diberi batas merah dengan pesan informatif, dan kursor otomatis diarahkan (*focus*) ke kolom yang keliru tersebut. Jika valid, formulir direset dan notifikasi sukses ditampilkan.

#### E. AJAX / Asynchronous API (`js/github-api.js`)
- **Fetch API ke GitHub REST API**:
  - Permintaan HTTP GET ke `https://api.github.com/users/anessaja27` untuk mengambil metadata profil dan jumlah repositori publik.
  - Permintaan HTTP GET ke `https://api.github.com/users/anessaja27/repos?sort=updated&per_page=12` untuk mengambil daftar repositori riil.
- **Penanganan Status Asinkron**: Menggunakan sintaks modern `async/await` dengan blok pengaman `try...catch`.
- **Fitur Penyaring Kategori (Category Filtering)**: Data hasil fetch dapat difilter secara instan berdasarkan kategori *Web*, *Mobile*, atau *Software/Game*.
- **Mekanisme Graceful Fallback**: Apabila batasan kuota permintaan GitHub API tercapai (*Rate Limit 403*) atau koneksi terputus, sistem secara otomatis beralih menggunakan dataset cadangan lokal riil dari akun GitHub Andrasena Nugraha, sehingga halaman web tidak akan pernah rusak (*blank*) saat dievaluasi oleh dosen.

---

## 💻 Cuplikan Repositori Nyata yang Ditampilkan

1. **Wheel-Spin-Inter-25** (Dart / Flutter)  
   Aplikasi gacha kelompok kelas 2025I D4 Manajemen Informatika UNESA untuk penugasan akhir IDCamp 2025.
2. **SmadaPay** (C++)  
   Aplikasi e-wallet tugas akhir kelas 12 di SMAN 2 Probolinggo untuk memfasilitasi transaksi lingkungan sekolah.
3. **diet_in** (Dart / Flutter)  
   Aplikasi mobile pelacak status indeks massa tubuh (BMI) dan pola diet sehat.
4. **harmoni-baking-hub** (TypeScript)  
   Platform web interaktif resep dan panduan baking terstruktur.
5. **a-farmer-s-tale** (GDScript / Godot Engine)  
   Tugas rekayasa game simulasi pertanian 2D berbasis Godot Engine.
6. **Praktikum-Matematika-Komputasi-Week-4** (Python)  
   Implementasi 15 modul algoritma komputasi untuk mata kuliah Matematika Komputasi di UNESA.

---

## 🛡️ Pernyataan Integritas Akademik

> *Penting: Seluruh kode HTML, CSS, dan JavaScript dalam proyek portofolio ini dirancang dan disusun secara orisinal oleh Andrasena Nugraha untuk keperluan pemenuhan Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web, Sarjana Terapan Manajemen Informatika, Fakultas Vokasi, Universitas Negeri Surabaya.*
