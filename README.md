
---

#  Product Requirement Document (PRD)

**Nama Proyek:** Portal Terintegrasi Organisasi Mahasiswa (HMTIKA)

**Fokus Utama:** Aksesibilitas Mobile (Ringan), Kecepatan, Antarmuka Minimalis-Dinamis, dan Fitur Aspirasi Anonim.

## 1. Latar Belakang & Tujuan

Berdasarkan survei internal, mahasiswa sering tertinggal informasi karena penyebaran berita yang tidak terpusat (hanya via WhatsApp/Instagram). Selain itu, terdapat kebutuhan tinggi terhadap efisiensi administrasi (absensi digital, unduh berkas, e-sertifikat) serta wadah aspirasi yang aman (anonim). Website ini bertujuan untuk menjadi solusi satu pintu (*one-stop solution*) yang ringan dan responsif untuk seluruh kebutuhan tersebut.

## 2. Fitur Utama & Kebutuhan Fungsional

### Fitur Utama (Berdasarkan Prioritas Survei)

1. **Manajemen Pengumuman & Berita (Newsroom):** Wadah rilis info resmi agar mahasiswa tidak ketinggalan informasi.
2. **Kalender Kegiatan & Daftar Event:** Informasi agenda mendatang dan formulir pendaftaran event.
3. **Sistem E-Sertifikat:** Integrasi otomatisasi klaim atau unduh sertifikat setelah mengikuti event.
4. **Kotak Aspirasi Anonim:** Fitur penyampaian keluhan/saran (Kategori: Akademik, Kegiatan, Fasilitas) dengan opsi menyembunyikan identitas secara total.
5. **Absensi Digital & Unduh Berkas:** Pencatatan kehadiran kegiatan berbasis web dan repositori dokumen penting.

### Kebutuhan Non-Fungsional (Kualitas Sistem)

* **Mobile-First Performance:** Halaman harus dimuat dalam < 2 detik di jaringan seluler karena mayoritas responden menggunakan *smartphone* dan sensitif terhadap *website* yang berat.
* **UI Minimalis & Bersih dengan Aksen Dinamis:** Layout bersih menggunakan komponen modern (misal Tailwind + Shadcn UI), mendukung *Dark Mode*.
* **Keamanan Data:** Enkripsi untuk data pengguna terdaftar dan pemutusan relasi data *user* pada aspirasi yang bersifat anonim.

---

## 3. Alur Pengguna (User Flow) Utama

1. **Pengunjung Umum:** Mengakses Berita, Struktur Organisasi, dan Kalender Kegiatan secara bebas.
2. **Pengguna Terdaftar (Login):** Mengakses Absensi, mendaftar Event, mengunduh E-Sertifikat, dan mengirim Aspirasi (bisa memilih mode Anonim).
3. **Admin/Pengurus:** Masuk ke Dashboard untuk mengelola konten berita, membuat event, generate absensi/sertifikat, dan melihat rekap aspirasi.

---

# Entity Relationship Diagram (ERD)

Untuk mendukung fitur-fitur di atas, berikut adalah rancangan struktur basis data (database) yang efisien dan mendukung performa tinggi.

```
+------------------+          +------------------+          +------------------+
|      USERS       |          |      EVENTS      |          |   ATTENDANCES    |
+------------------+          +------------------+          +------------------+
| PK | id          |          | PK | id          |          | PK | id          |
|    | nama        |          |    | judul       |          | FK | event_id    |
|    | email       |          |    | deskripsi   |          |    | nama_sesi   |
|    | password    |          |    | tanggal     |          |    | waktu_buka  |
|    | angkatan    |          |    | lokasi      |          |    | waktu_tutup |
|    | status      |          |    | kuota       |          +------------------+
|    | role        |          +------------------+                    |
+------------------+                   |                              |
         |                             | (1)                          | (1)
         | (1)                         |                              |
         |                             | (N)                          | (N)
         |                    +------------------+          +------------------+
         +----------------(N) |  REGISTRATIONS   |          | ATTENDANCE_LOGS  |
         |                    +------------------+          +------------------+
         |                    | PK | id          |          | PK | id          |
         |                    | FK | event_id    |          | FK | attendance_id|
         |                    | FK | user_id     |          | FK | user_id     |
         |                    |    | tgl_daftar  |          |    | waktu_absen |
         |                    |    | status_hadir|          +------------------+
         |                    +------------------+
         |                             |
         |                             | (1)
         |                             |
         |                             | (1)
         |                    +------------------+
         |                    |  E_CERTIFICATES  |
         |                    +------------------+
         |                    | PK | id          |
         |                    | FK | reg_id      |
         |                    |    | file_url    |
         |                    |    | tgl_terbit  |
         +----------------+   +------------------+
         |                |
         | (1)            | (1, jika non-anonim)
         |                |
         | (N)            | (N)
+------------------+    +------------------+
|      NEWS        |    |    ASPIRATIONS   |
+------------------+    +------------------+
| PK | id          |    | PK | id          |
| FK | author_id   |    | FK | user_id(opt)| --> Bisa NULL jika Anonim
|    | judul       |    |    | kategori    |
|    | konten      |    |    | isi_aspirasi|
|    | tgl_publish |    |    | is_anonymous|
+------------------+    |    | created_at  |
                        +------------------+

```

### Penjelasan Skema Tabel:

1. **Users:** Menyimpan data pengguna (Pengurus, Anggota, Mahasiswa Umum). Kolom `status` mencatat peran akademis/organisasi, sedangkan `role` menentukan hak akses (Admin vs User biasa).
2. **Events:** Menyimpan detail agenda atau kegiatan organisasi yang akan dilaksanakan.
3. **Registrations:** Tabel relasi jembatan antara `Users` dan `Events` untuk mencatat siapa saja yang mendaftar ke suatu kegiatan. Tabel ini juga terhubung dengan penerbitan **E_Certificates** bagi peserta yang status kehadirannya valid.
4. **Attendances & Attendance_Logs:** Memisahkan antara sesi absensi (misal: Sesi Masuk, Sesi Keluar) dengan log kehadiran riil mahasiswa untuk menjaga efisiensi pelacakan waktu.
5. **Aspirations:** **Catatan Penting Keamanan:** Sesuai dengan hasil survei yang sangat menginginkan fitur anonim, kolom `user_id` diatur sebagai *Nullable* (boleh kosong). Jika pengguna memilih opsi `is_anonymous = true`, sistem secara otomatis akan mengosongkan/tidak mengisi hubungan ke `user_id` saat disimpan ke database agar identitas pengirim benar-benar tidak terlacak oleh pihak mana pun (termasuk admin).
6. **News:** Tabel pengelolaan artikel berita dan pengumuman yang ditulis oleh Pengurus (`author_id`).

---# web-hmtika
