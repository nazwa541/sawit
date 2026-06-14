# Product Requirements Document (PRD)
## SISTRA-SAWIT — Sistem Informasi Transparansi Hasil Panen Kelapa Sawit

**Versi:** 1.0  
**Tanggal:** 2024  
**Tujuan Dokumen:** Referensi lengkap untuk AI agent / developer dalam membangun sistem SISTRA-SAWIT dari nol.

---

## 1. KONTEKS & LATAR BELAKANG

### 1.1 Masalah yang Diselesaikan

SISTRA-SAWIT dibangun untuk mengatasi tiga masalah utama dalam rantai panen kelapa sawit:

| No | Masalah | Dampak |
|----|---------|--------|
| 1 | **Selisih Data** — Laporan berat dari pekerja kebun sering tidak sesuai dengan hasil timbangan aktual di RAM (pabrik pengolahan) | Pemilik kebun dirugikan secara finansial |
| 2 | **Manipulasi Nota** — Petugas RAM rentan diintervensi pihak lain untuk mengubah data nota fisik | Data tidak dapat dipercaya, potensi fraud |
| 3 | **Tidak Ada Bukti Dokumentasi** — Tidak ada sistem pencatatan digital yang andal | Pemilik tidak bisa memverifikasi kebenaran laporan |

### 1.2 Solusi

Platform web yang mengintegrasikan tiga alur utama dalam satu sistem:
1. Laporan keberangkatan dari pekerja kebun
2. Upload foto bukti nota dari petugas RAM
3. Dashboard monitoring real-time untuk pemilik kebun

---

## 2. GAMBARAN UMUM SISTEM

### 2.1 Tiga Pilar Utama

**Pilar 1 — Validasi & Komparasi Data**
- Sistem membandingkan berat (kg) yang diinput pekerja dengan estimasi kapasitas kendaraan dan data blok lahan
- Deteksi selisih dilakukan secara otomatis oleh sistem

**Pilar 2 — Dokumentasi Bukti Otentik**
- Petugas RAM mengunggah foto nota timbangan asli langsung dari kamera/galeri perangkat
- Foto dijadikan bukti fisik sah yang tidak dapat dimanipulasi setelah diupload

**Pilar 3 — Dashboard Real-Time**
- Pemilik kebun dapat memantau histori panen, status pengiriman, dan produktivitas per blok lahan
- Data ditampilkan secara real-time dari dashboard

---

## 3. AKTOR & PERSONA PENGGUNA

Sistem memiliki **3 tipe pengguna (role)**:

### 3.1 Pemilik Kebun (Role: `pemilik`)

- **Persona:** Ibu Irdawati, pemilik kebun sawit
- **Masalah:** Sering ada selisih antara laporan pekerja dan hasil timbangan RAM, tidak bisa memverifikasi secara mandiri
- **Kebutuhan:** Data panen yang transparan dan akurat secara real-time dari sumbernya
- **Fitur yang diakses:**
  - Dashboard Monitoring (rekapitulasi harian)
  - Filter Riwayat Panen (tanggal / blok / plat)
  - Kelola Data Mobil (CRUD)
  - Kelola Blok Lahan (CRUD)
  - Komparasi Data Visual (berat vs foto nota)

### 3.2 Pekerja Kebun (Role: `pekerja`)

- **Persona:** Pak Untung, pekerja lapangan
- **Masalah:** Sering dituduh curang jika ada selisih, padahal bisa karena kesalahan tulis manual
- **Kebutuhan:** Proses pelaporan simpel dan bisa membuktikan kejujuran lewat bukti digital
- **Fitur yang diakses:**
  - Input Laporan Keberangkatan (pilih mobil & blok lahan)
  - Input Berat Netto (kg) setelah timbang di RAM
  - Lihat Status Pengiriman

### 3.3 Petugas RAM (Role: `petugas_ram`)

- **Persona:** Dafi Afriza, petugas pabrik/timbangan RAM
- **Masalah:** Sering diintervensi pekerja untuk memanipulasi data nota fisik
- **Kebutuhan:** Bisa mengupload bukti langsung agar data tidak bisa diubah pihak lain
- **Fitur yang diakses:**
  - Cari Data Pengiriman by Nomor Plat Mobil
  - Upload Foto Nota Timbangan
  - Konfirmasi Selesai (menutup laporan pengiriman)

---

## 4. ALUR BISNIS (BUSINESS FLOW)

Berikut adalah alur kerja sistem dari awal hingga akhir secara berurutan:

```
STEP 1 — Pekerja
  Pilih mobil (by plat) + pilih blok lahan
  → Konfirmasi keberangkatan
  → Sistem catat timestamp otomatis
  → Status: "Dalam Perjalanan"

STEP 2 — Sistem (otomatis)
  Status berubah: "Dalam Perjalanan"
  Timestamp tercatat di database

STEP 3 — Pekerja (setelah timbang di RAM)
  Input berat netto (kg) hasil timbangan
  → Status berubah: "Menunggu Nota"

STEP 4 — Petugas RAM
  Cari data pengiriman berdasarkan plat nomor mobil
  Upload foto nota timbangan asli (jpg/png) dari kamera/galeri
  → Konfirmasi selesai

STEP 5 — Sistem (otomatis)
  Status berubah: "Selesai"
  Laporan terkunci, data final tersimpan
  Tidak bisa diubah lagi

STEP 6 — Pemilik (kapan saja)
  Buka dashboard
  Lihat rekapitulasi harian
  Bandingkan data pekerja vs foto nota (side-by-side)
  Filter berdasarkan tanggal / blok / plat
```

**Status Pengiriman (State Machine):**
```
perjalanan → menunggu_nota → selesai
```

---

## 5. KEBUTUHAN FUNGSIONAL

### 5.1 Must Have (Wajib Ada di v1.0)

#### AUTENTIKASI & AKSES
| ID | Fitur | Deskripsi |
|----|-------|-----------|
| F01 | Registrasi Akun | User mendaftar dengan email/no HP + password + pilih role (pemilik / pekerja / petugas_ram) |
| F02 | Login | Autentikasi menggunakan email/HP + password. Redirect ke halaman sesuai role setelah login berhasil |
| F03 | Role-Based Access | Setiap role hanya bisa mengakses fitur yang sesuai. Pemilik tidak bisa akses form pekerja, dan sebaliknya |
| F15 | Logout | Hapus session/token, redirect ke halaman login |

#### PROSES PENGIRIMAN
| ID | Fitur | Deskripsi |
|----|-------|-----------|
| F04 | Input Laporan Keberangkatan | Pekerja memilih mobil (dari daftar) + blok lahan (dari daftar), lalu konfirmasi keberangkatan |
| F05 | Tracking Status Pengiriman | Status berubah otomatis: `perjalanan` → `menunggu_nota` → `selesai` |
| F06 | Timestamp Otomatis | Waktu keberangkatan dan waktu penyelesaian tercatat otomatis oleh sistem (server-side) |
| F09 | Validasi Format Input | Validasi format data: angka untuk berat, format file jpg/png untuk foto |

#### DATA PANEN & NOTA
| ID | Fitur | Deskripsi |
|----|-------|-----------|
| F07 | Input Berat Netto | Pekerja menginput berat bersih (kg) hasil timbangan RAM ke dalam sistem |
| F08 | Upload Foto Nota | Petugas RAM mengunggah foto nota timbangan (format jpg/png) dari kamera atau galeri perangkat |
| F17 | Error Handling | Sistem menampilkan pesan error yang informatif saat: plat nomor tidak ditemukan, koneksi terputus saat upload, format file tidak valid |

#### MONITORING (KHUSUS PEMILIK)
| ID | Fitur | Deskripsi |
|----|-------|-----------|
| F10 | Dashboard Rekapitulasi Harian | Tampilan ringkasan laporan panen hari ini: jumlah pengiriman, total berat, dsb |
| F11 | Komparasi Data | Pemilik bisa membandingkan berat yang diinput pekerja vs berat yang tertera di foto nota RAM |
| F16 | Tampilan Side-by-Side | Angka berat dari pekerja ditampilkan berdampingan dengan foto nota dari RAM |
| F12 | Filter Riwayat Panen | Filter data berdasarkan: tanggal, blok lahan, atau plat nomor mobil |

### 5.2 Should Have (Penting tapi bukan blocker)

| ID | Fitur | Deskripsi |
|----|-------|-----------|
| F13 | CRUD Data Mobil | Pemilik bisa tambah, lihat, ubah, dan hapus data armada kendaraan |
| F14 | CRUD Blok Lahan | Pemilik bisa tambah, lihat, ubah, dan hapus data blok lahan |

### 5.3 Won't Have (Tidak ada di v1.0)

- API integrasi langsung ke sistem timbangan RAM (otomatis)
- Fitur offline (sistem membutuhkan koneksi internet)
- Fitur AI prediksi hasil panen

---

## 6. USE CASE DETAIL

| ID | Nama Use Case | Aktor | Prioritas | Deskripsi |
|----|---------------|-------|-----------|-----------|
| UC01 | Registrasi Akun | Semua role | High | User baru mendaftar akun, memilih role, verifikasi email/HP |
| UC02 | Login | Semua role | High | Autentikasi masuk ke sistem, redirect sesuai role |
| UC03 | Kelola Data Mobil | Pemilik | High | CRUD armada kendaraan: plat nomor & kapasitas kg |
| UC04 | Kelola Blok Lahan | Pemilik | High | CRUD blok lahan: nama/kode blok & luas (ha) |
| UC05 | Laporan Keberangkatan | Pekerja | High | Pilih mobil & lahan, konfirmasi berangkat, timestamp otomatis |
| UC06 | Input Berat Timbangan | Pekerja | High | Masukkan berat netto (kg) setelah timbang di RAM |
| UC07 | Upload Bukti Nota RAM | Petugas RAM | High | Foto nota asli diunggah, tutup laporan pengiriman |
| UC08 | Monitoring Laporan | Pemilik | High | Dashboard rekapitulasi, komparasi data, filter riwayat |
| UC09 | Logout | Semua role | High | Hapus sesi, kembali ke halaman login |

---

## 7. MANAJEMEN DATA MASTER

### 7.1 Data Mobil (dikelola oleh Pemilik — UC03)

- **Field:** Nomor Plat (unik/UNIQUE), Kapasitas (kg)
- **Operasi:** Tambah · Lihat · Edit · Hapus
- **Catatan penting:** Data ini muncul sebagai dropdown/pilihan saat Pekerja mengisi laporan keberangkatan

### 7.2 Data Blok Lahan (dikelola oleh Pemilik — UC04)

- **Field:** Nama/Kode Blok, Luas (ha)
- **Operasi:** Tambah · Lihat · Edit · Hapus
- **Catatan penting:** Data ini muncul sebagai dropdown/pilihan saat Pekerja mengisi laporan keberangkatan

---

## 8. ARSITEKTUR & STACK TEKNOLOGI

### 8.1 Arsitektur Sistem

```
CLIENT (Browser/Smartphone)
    ↕ Inertia.js (SSR-like, bukan REST terpisah)
SERVER (Laravel 12)
    ↕
DATABASE (MySQL)
```

Sistem menggunakan **Laravel 12 React Starter Kit** — stack resmi Laravel yang menggabungkan Laravel sebagai backend + React sebagai frontend melalui **Inertia.js**. Tidak ada REST API terpisah; Laravel langsung merender halaman React via Inertia.

- **Frontend:** React.js + TypeScript + Tailwind CSS
  - Dirender via Inertia.js (bukan SPA mandiri)
  - UI responsif, mobile-first
  - Akses via browser, tidak perlu instalasi terpisah
- **Backend:** Laravel 12
  - Routing, Controller, Model menggunakan konvensi Laravel
  - Autentikasi menggunakan Laravel Breeze (sudah include di starter kit)
  - File upload menggunakan Laravel Storage (`storage/app/public`)
  - Role-based access menggunakan Laravel Middleware
- **Bridge:** Inertia.js
  - Data dari Controller Laravel dikirim ke React component via `Inertia::render()` / `return Inertia::render('PageName', ['data' => $data])`
  - Form submission menggunakan Inertia `useForm` hook, bukan fetch/axios manual
- **Database:** MySQL (via Laravel Eloquent ORM + Migration)
- **Local Dev:** Laragon / Herd / `php artisan serve` + `npm run dev`

### 8.2 Konvensi Penting Laravel Starter Kit

| Aspek | Implementasi |
|-------|-------------|
| Routing | `routes/web.php` — semua route didefinisikan di sini |
| Controller | `app/Http/Controllers/` — satu controller per resource |
| Model | `app/Models/` — Eloquent ORM, relasi via `hasMany`/`belongsTo` |
| Migration | `database/migrations/` — struktur tabel didefinisikan di sini |
| React Pages | `resources/js/pages/` — setiap halaman adalah React component |
| React Components | `resources/js/components/` — komponen reusable |
| Inertia Render | `return Inertia::render('NamaPage', ['prop' => $nilai])` |
| Form | Gunakan `useForm` dari `@inertiajs/react`, bukan `useState` biasa |
| Auth | Sudah disediakan oleh Breeze — `Auth::user()`, middleware `auth` |
| File Upload | `$request->file('foto')->store('nota', 'public')` |
| Role Guard | Middleware custom: `app/Http/Middleware/RoleMiddleware.php` |

### 8.3 Tools Pengembangan

| Tool | Fungsi |
|------|--------|
| Visual Studio Code | Code editor |
| Laragon / Laravel Herd | Local server (PHP + MySQL) |
| Composer | PHP package manager |
| npm | JS package manager |
| Chrome / Firefox | Browser testing |

---

## 9. DATABASE SCHEMA (MySQL)

### Tabel: `users`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT, PK, AUTO_INCREMENT | Primary key |
| nama | VARCHAR | Nama lengkap pengguna |
| email | VARCHAR, UNIQUE (nullable) | Email login |
| no_hp | VARCHAR, UNIQUE (nullable) | Nomor HP login (alternatif email) |
| password | VARCHAR | Password ter-hash |
| role | ENUM('pemilik', 'pekerja', 'petugas_ram') | Role pengguna |
| created_at | TIMESTAMP | Waktu registrasi |

### Tabel: `mobil`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT, PK, AUTO_INCREMENT | Primary key |
| plat_nomor | VARCHAR, UNIQUE | Nomor plat kendaraan (harus unik) |
| kapasitas_kg | DECIMAL / INT | Kapasitas angkut dalam kg |
| created_at | TIMESTAMP | Waktu data dibuat |

### Tabel: `lahan`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT, PK, AUTO_INCREMENT | Primary key |
| nama_blok | VARCHAR | Nama atau kode blok lahan |
| luas_ha | DECIMAL | Luas lahan dalam hektare |
| created_at | TIMESTAMP | Waktu data dibuat |

### Tabel: `pengiriman`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT, PK, AUTO_INCREMENT | Primary key |
| mobil_id | INT, FK → mobil.id | Kendaraan yang digunakan |
| lahan_id | INT, FK → lahan.id | Blok lahan asal panen |
| pekerja_id | INT, FK → users.id | Pekerja yang lapor |
| waktu_berangkat | TIMESTAMP | Di-set otomatis oleh sistem saat lapor keberangkatan |
| berat_netto_kg | DECIMAL / INT | Berat diinput pekerja setelah timbang |
| status | ENUM('perjalanan', 'menunggu_nota', 'selesai') | Status pengiriman saat ini |

### Tabel: `nota`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT, PK, AUTO_INCREMENT | Primary key |
| pengiriman_id | INT, FK → pengiriman.id | Relasi ke pengiriman |
| petugas_id | INT, FK → users.id | Petugas RAM yang upload |
| foto_nota_path | VARCHAR | Path/URL file foto nota yang tersimpan |
| waktu_upload | TIMESTAMP | Waktu foto diunggah |

### Relasi Antar Tabel

```
users (1) ----< pengiriman >---- (1) mobil
                   |
                   |----(1) lahan
                   |
                   v (1)
                 nota >---- (1) users (petugas)
```

---

## 10. ROUTES & CONTROLLERS (LARAVEL)

Karena menggunakan Inertia.js, tidak ada REST API terpisah. Semua route didefinisikan di `routes/web.php` dan dikonsumsi langsung oleh React via Inertia.

### Auth (sudah disediakan Laravel Breeze)
| Method | Route | Controller | Keterangan |
|--------|-------|------------|------------|
| GET | `/register` | `RegisteredUserController@create` | Tampilkan form register |
| POST | `/register` | `RegisteredUserController@store` | Proses registrasi + set role |
| GET | `/login` | `AuthenticatedSessionController@create` | Tampilkan form login |
| POST | `/login` | `AuthenticatedSessionController@store` | Proses login |
| POST | `/logout` | `AuthenticatedSessionController@destroy` | Logout & hapus sesi |

> **Catatan:** Tambahkan field `role` (ENUM) ke tabel `users` via migration baru. Modifikasi `RegisteredUserController@store` untuk menyimpan role yang dipilih user.

### Data Master — Mobil (hanya Pemilik)
| Method | Route | Controller@method | Inertia Page |
|--------|-------|-------------------|--------------|
| GET | `/mobil` | `MobilController@index` | `Mobil/Index` |
| GET | `/mobil/create` | `MobilController@create` | `Mobil/Create` |
| POST | `/mobil` | `MobilController@store` | — (redirect) |
| GET | `/mobil/{id}/edit` | `MobilController@edit` | `Mobil/Edit` |
| PUT | `/mobil/{id}` | `MobilController@update` | — (redirect) |
| DELETE | `/mobil/{id}` | `MobilController@destroy` | — (redirect) |

### Data Master — Lahan (hanya Pemilik)
| Method | Route | Controller@method | Inertia Page |
|--------|-------|-------------------|--------------|
| GET | `/lahan` | `LahanController@index` | `Lahan/Index` |
| GET | `/lahan/create` | `LahanController@create` | `Lahan/Create` |
| POST | `/lahan` | `LahanController@store` | — (redirect) |
| GET | `/lahan/{id}/edit` | `LahanController@edit` | `Lahan/Edit` |
| PUT | `/lahan/{id}` | `LahanController@update` | — (redirect) |
| DELETE | `/lahan/{id}` | `LahanController@destroy` | — (redirect) |

### Pengiriman
| Method | Route | Controller@method | Role | Inertia Page |
|--------|-------|-------------------|------|--------------|
| GET | `/pengiriman` | `PengirimanController@index` | Pemilik | `Pengiriman/Index` |
| GET | `/pengiriman/create` | `PengirimanController@create` | Pekerja | `Pengiriman/Create` |
| POST | `/pengiriman` | `PengirimanController@store` | Pekerja | — (redirect) |
| PATCH | `/pengiriman/{id}/berat` | `PengirimanController@updateBerat` | Pekerja | — (redirect) |
| GET | `/pengiriman/cari` | `PengirimanController@cariByPlat` | Petugas RAM | `Pengiriman/Cari` |

### Nota
| Method | Route | Controller@method | Role | Keterangan |
|--------|-------|-------------------|------|------------|
| GET | `/nota/{pengiriman_id}` | `NotaController@create` | Petugas RAM | Tampilkan form upload |
| POST | `/nota/{pengiriman_id}` | `NotaController@store` | Petugas RAM | Upload foto, ubah status → selesai |

### Dashboard
| Method | Route | Controller@method | Role | Inertia Page |
|--------|-------|-------------------|------|--------------|
| GET | `/dashboard` | `DashboardController@index` | Semua (redirect sesuai role) | `Dashboard/Pemilik`, `Dashboard/Pekerja`, `Dashboard/Ram` |

### Middleware & Route Groups (routes/web.php)
```php
// Semua route di bawah ini butuh login
Route::middleware(['auth'])->group(function () {

    // Hanya Pemilik
    Route::middleware(['role:pemilik'])->group(function () {
        Route::resource('mobil', MobilController::class);
        Route::resource('lahan', LahanController::class);
        Route::get('/dashboard', [DashboardController::class, 'pemilik']);
        Route::get('/pengiriman', [PengirimanController::class, 'index']);
    });

    // Hanya Pekerja
    Route::middleware(['role:pekerja'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'pekerja']);
        Route::get('/pengiriman/create', [PengirimanController::class, 'create']);
        Route::post('/pengiriman', [PengirimanController::class, 'store']);
        Route::patch('/pengiriman/{id}/berat', [PengirimanController::class, 'updateBerat']);
    });

    // Hanya Petugas RAM
    Route::middleware(['role:petugas_ram'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'ram']);
        Route::get('/pengiriman/cari', [PengirimanController::class, 'cariByPlat']);
        Route::get('/nota/{pengiriman_id}', [NotaController::class, 'create']);
        Route::post('/nota/{pengiriman_id}', [NotaController::class, 'store']);
    });
});
```

---

## 11. HALAMAN / SCREEN (FRONTEND)

### Halaman Shared (Semua Role)
- **Login Page** — Form email/HP + password
- **Register Page** — Form registrasi + dropdown pilih role

### Halaman Pekerja
- **Dashboard Pekerja** — Lihat daftar pengiriman milik sendiri + statusnya
- **Form Keberangkatan** — Dropdown pilih mobil (by plat) + dropdown pilih lahan + tombol konfirmasi
- **Form Input Berat** — Input angka kg + submit (hanya aktif jika status = `perjalanan`)

### Halaman Petugas RAM
- **Halaman Cari Pengiriman** — Search by plat nomor
- **Halaman Upload Nota** — Preview data pengiriman + tombol akses kamera/galeri + upload + konfirmasi selesai

### Halaman Pemilik
- **Dashboard Utama** — Rekapitulasi harian (total pengiriman, total kg), status badge per pengiriman
- **Detail Komparasi** — Tampilan side-by-side: angka berat (pekerja) vs foto nota (RAM)
- **Riwayat Panen** — List semua pengiriman + filter tanggal / blok / plat
- **Kelola Mobil** — Tabel data mobil + form tambah/edit + tombol hapus
- **Kelola Lahan** — Tabel data lahan + form tambah/edit + tombol hapus

---

## 12. PEMBAGIAN TUGAS TIM

### Frontend Developer (React + Inertia)

| Area | Detail |
|------|--------|
| Halaman Auth | Modifikasi page `Register` bawaan Breeze — tambah dropdown pilih role |
| Dashboard Pemilik | `resources/js/pages/Dashboard/Pemilik.tsx` — rekapitulasi harian, komparasi side-by-side, filter riwayat |
| Form Pekerja | `Pengiriman/Create.tsx` — dropdown mobil & lahan (dari props Inertia), input berat netto, lihat status |
| Upload RAM | `Pengiriman/Cari.tsx` + `Nota/Create.tsx` — search plat, akses kamera/galeri, upload foto |
| Manajemen Data | `Mobil/Index.tsx`, `Lahan/Index.tsx` — tabel CRUD + form tambah/edit + dialog konfirmasi hapus |
| UI/UX | Responsif mobile-first, Tailwind CSS, status badge, error message dari `$page.props.errors` |
| Form Handling | Selalu gunakan `useForm` dari `@inertiajs/react` untuk semua form submission & upload |

### Backend Developer (Laravel)

| Area | Detail |
|------|--------|
| Database | Buat migration untuk semua tabel: `users` (tambah kolom `role`), `mobil`, `lahan`, `pengiriman`, `nota` |
| Auth & Role | Modifikasi `RegisteredUserController` untuk simpan role. Buat `RoleMiddleware` dan daftarkan di `bootstrap/app.php` |
| Controller Pengiriman | `PengirimanController` — store (buat laporan + timestamp), updateBerat, cariByPlat, index (dengan filter) |
| Controller Nota | `NotaController` — store: validasi file jpg/png, simpan via `Storage::disk('public')`, update status pengiriman → selesai |
| Controller Mobil & Lahan | CRUD standar Laravel Resource Controller, validasi `plat_nomor` unique |
| Validasi | Gunakan Laravel Form Request (`php artisan make:request`) untuk setiap store/update |
| Inertia Response | Semua controller return `Inertia::render('NamaPage', ['data' => $data])`, bukan JSON |

---

## 13. KEBUTUHAN NON-FUNGSIONAL

Berdasarkan standar ISO/IEC 25010:

### Usability
- NF01: Sistem harus dapat digunakan pengguna non-teknis tanpa pelatihan khusus
- NF02: UI sederhana, dioptimalkan untuk penggunaan via smartphone
- NF03: Tampilan responsif di semua ukuran perangkat (mobile, tablet, desktop)

### Performance
- NF04: Response time API ≤ 3 detik dalam kondisi normal
- NF05: Sistem berjalan lancar pada perangkat dengan RAM minimum 2GB

### Reliability
- NF06: Sistem harus dapat diakses 24/7 (tidak ada downtime terjadwal)
- NF07: Sistem tahan terhadap koneksi tidak stabil — ada mekanisme retry saat upload foto gagal
- NF20: Implementasi mekanisme retry otomatis saat upload foto gagal

### Security
- NF08: Data hanya dapat diakses oleh pengguna yang berwenang sesuai role
- NF09: Data laporan pengiriman yang sudah selesai tidak dapat diubah tanpa izin
- NF10: Login wajib untuk mengakses semua fitur sistem
- NF11: Hak akses berdasarkan role diterapkan di level API (server-side, bukan hanya UI)
- NF12: Validasi input: berat harus angka, file upload harus jpg/png

### Portability
- NF13: Kompatibel dengan berbagai browser modern (Chrome, Firefox, Safari, Edge)
- NF17: Berjalan di berbagai sistem operasi (Windows, macOS, Android, iOS)
- NF18: Tidak memerlukan instalasi aplikasi — akses via web browser

### Maintainability
- NF15: Kode mudah dikembangkan dan diperbaiki
- NF16: Struktur kode modular, dipisahkan per fitur/domain

---

## 14. CONSTRAINTS & CATATAN IMPLEMENTASI

1. **Mobile-first adalah prioritas utama** — mayoritas pengguna (pekerja dan petugas RAM) mengakses sistem dari HP di lapangan
2. **Upload foto menggunakan akses kamera/galeri perangkat** — gunakan `<input type="file" accept="image/*" capture="environment">` di frontend
3. **Plat nomor bersifat UNIQUE** di database — harus ada validasi duplikasi saat tambah data mobil
4. **Status pengiriman bersifat satu arah** — tidak bisa mundur dari `selesai` ke `menunggu_nota` atau `perjalanan`
5. **Laporan yang sudah `selesai` tidak bisa diedit** — backend harus enforce ini
6. **Role ditentukan saat registrasi** — tidak ada fitur ubah role setelah registrasi
7. **Format file upload:** hanya jpg dan png yang diizinkan — validasi di frontend DAN backend
8. **Koordinasi API:** Frontend dan Backend harus sepakat format response JSON sebelum implementasi (field names, struktur data, kode error)

---

## 15. RINGKASAN QUICK REFERENCE

```
SISTEM      : SISTRA-SAWIT
TUJUAN      : Transparansi & akuntabilitas data panen kelapa sawit
STACK       : React.js + Tailwind (FE) | Node.js + MySQL (BE)
ROLE        : pemilik | pekerja | petugas_ram
STATUS      : perjalanan → menunggu_nota → selesai
TABEL DB    : users, mobil, lahan, pengiriman, nota
USE CASE    : 9 use case (UC01–UC09), semua prioritas HIGH
MUST-HAVE   : F01–F17 (auth, pengiriman, berat, nota, dashboard, filter)
WON'T HAVE  : API otomatis RAM, offline mode, AI prediksi
```