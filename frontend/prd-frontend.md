Mari kita susun ulang prioritas pengembangan berdasarkan analisis mendalam terhadap data survei tersebut. Fokus utamanya adalah memisahkan mana fitur yang **Harus Ada Sekarang (MVP - Minimum Viable Product)** untuk menjawab masalah mendasar mahasiswa, dan mana fitur yang **Bisa Ditambahkan Nanti (Fase Lanjutan)**.

---

## 🚀 Prioritas Pengembangan Fitur

### 📌 FASE 1: Fitur Utama & Paling Penting (MVP)

Fitur-fitur ini wajib ada di rilis pertama karena langsung menyelesaikan masalah utama dari hasil survei (mahasiswa sering ketinggalan info, butuh sistem yang ringan di HP, dan ingin wadah aspirasi yang aman).

1. **Pusat Informasi & Pengumuman Terpusat (Newsroom)**
* *Alasan:* Mayoritas responden mengeluhkan sering tertinggal info penting jika hanya mengandalkan grup WhatsApp.
* *Detail:* Halaman khusus berita organisasi, pengumuman akademik, dan info darurat yang bisa dikategorikan.


2. **Kotak Aspirasi Anonim Riil**
* *Alasan:* Mendapat skor persetujuan tertinggi di survei. Mahasiswa sangat vokal ingin menyampaikan saran/keluhan (akademik, fasilitas, kegiatan) tetapi *takut identitasnya ketahuan*.
* *Detail:* Sistem pengiriman pesan di mana data akun pengirim benar-benar dilepas/dihapus oleh sistem saat disimpan ke database jika opsi "Anonim" diaktifkan.


3. **Kalender Kegiatan & Pendaftaran Event**
* *Alasan:* Responden ingin tahu agenda apa saja yang akan datang tanpa harus mencari-cari pamflet lama di media sosial.
* *Detail:* Daftar *timeline* acara harian/bulanan beserta tombol pendaftaran langsung di dalam web.



### ⚡ Optimasi Non-Fungsional (Wajib di Fase 1)

* **Mobile-First & Ultra Fast Loading:** Tampilan wajib dioptimalkan untuk layar smartphone, navigasi diletakkan di bawah (mudah dijangkau jempol), dan halaman web harus termuat kurang dari 2 detik (karena ada komplain spesifik dari responden mengenai website organisasi sebelumnya yang terlalu berat dibuka di HP).

---

### 📌 FASE 2: Fitur Pelengkap (Rilis Lanjutan)

Fitur administrasi yang penting, namun membutuhkan sistem autentikasi dan manajemen database yang lebih kompleks.

1. **Sistem Absensi Digital berbasis Web**
* *Detail:* Mahasiswa bisa melakukan presensi kehadiran rapat atau event langsung dari HP mereka saat acara berlangsung.


2. **Klaim & Unduh E-Sertifikat Otomatis**
* *Detail:* Mengurangi beban kerja pengurus secara manual. Peserta yang status absensinya penuh bisa langsung mengunduh sertifikat digital mereka via *profile page*.


3. **Repositori Unduh Berkas Organisasi**
* *Detail:* Halaman publik/semi-publik untuk mengunduh dokumen penting seperti AD/ART, proposal template, atau berkas administrasi mahasiswa.



---

---

# 📑 Product Requirement Document (PRD)

**Nama Proyek:** Portal Terintegrasi Organisasi Mahasiswa

**Target Pengguna:** Pengurus Organisasi (Admin), Anggota Himpunan, & Mahasiswa Umum

**Platform:** Web Application (Diutamakan untuk Mobile Browser)

## 1. Tujuan Produk (Product Objective)

Membangun platform digital satu pintu yang menjadi pusat informasi resmi organisasi, mempermudah manajemen kegiatan, serta menyediakan ruang aman (anonim) bagi mahasiswa untuk menyuarakan aspirasi tanpa hambatan teknis (performa web lambat).

## 2. Persyaratan Pengguna & Alur Kerja (User Requirements)

### A. Peran: Pengunjung Umum / Mahasiswa

* Dapat melihat pengumuman terbaru dan kalender agenda organisasi tanpa harus login terlebih dahulu.
* Dapat mendaftarkan diri ke event yang sedang dibuka (memerlukan pengisian data dasar/login).
* Dapat mengirimkan kritik dan saran melalui Kotak Aspirasi dengan memilih mode **"Anonim"** (identitas disembunyikan) atau **"Publik"** (nama terlihat).

### B. Peran: Pengurus / Admin Web

* Dapat membuat, mengubah, dan menghapus pengumuman atau berita terbaru.
* Dapat mengelola daftar *event*, membuka/menutup pendaftaran, serta melihat daftar peserta yang mendaftar.
* Dapat melihat rekapitulasi aspirasi masuk berdasarkan kategori (Akademik, Kegiatan, Fasilitas) untuk ditindaklanjuti, tanpa bisa melihat siapa pengirimnya jika statusnya anonim.

## 3. Kebutuhan Spesifikasi Fitur (Spesifikasi MVP)

### Fitur: Kotak Aspirasi Aman

* **Input:** Dropdown Kategori (Akademik, Kegiatan, Fasilitas, Lainnya), Textarea Isi Aspirasi, Tombol Switch (Kirim sebagai Anonim: Ya/Tidak).
* **Aturan Bisnis:** Jika Switch Anonim aktif, sistem dilarang keras mengaitkan ID Akun pengguna ke dalam baris data pesan tersebut di database.
* **Validasi:** Batasan karakter minimal 20 karakter untuk menghindari spam pesan kosong.

### Fitur: Kalender & Pendaftaran Event

* **Tampilan:** Daftar kartu (*card visual*) yang berisi Judul Acara, Tanggal, Jam, Lokasi, dan Status Kuota (Tersedia/Penuh).
* **Interaksi:** Tombol "Daftar" yang memicu formulir konfirmasi instan.

### Fitur: Pengumuman (News Feed)

* **Tampilan:** Teks ringkas yang dominan, tanggal rilis yang jelas, dan tag kategori berwarna untuk mempermudah pemindaian informasi secara cepat oleh mata pengguna di layar HP.

## 4. Kebutuhan Non-Fungsional (Kualitas Produk)

* **Aksesibilitas Seluler:** Struktur halaman dirancang vertikal, ukuran tombol minimal 44x44 piksel agar mudah ditekan oleh jari di layar sentuh.
* **Performa Kecepatan:** Total ukuran halaman utama saat dimuat pertama kali tidak boleh melebihi 1.5 MB untuk menghemat kuota internet mahasiswa dan memastikan web tetap terbuka meski jaringan seluler sedang tidak stabil.
* **Keamanan:** Batasan pengiriman data (*rate limiting*) untuk mencegah bot mengisi form aspirasi berulang-ulang dalam satu detik.