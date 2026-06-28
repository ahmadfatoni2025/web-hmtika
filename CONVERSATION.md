# Percakapan Terakhir — 28 Juni 2026

## Arsitektur Proyek

```
hmtika/
├── frontend/          # Next.js 16.2.9 + React 19 + Tailwind CSS v4
└── backend/           # Express.js + PostgreSQL
```

---

## Frontend (`hmtika/frontend`)

### Halaman (Routes)

| Route | File | Status |
|---|---|---|
| `/` | `src/app/page.tsx` → `home/page.tsx` | ✅ Selesai |
| `/berita` | `src/app/berita/page.tsx` | ✅ Selesai |
| `/event` | `src/app/event/page.tsx` | ✅ Selesai |
| `/devisi` | `src/app/devisi/page.tsx` | ✅ Selesai |
| `/aspirasi` | `src/app/aspirasi/page.tsx` | ✅ Selesai |
| `/galery` | `src/app/galery/page.tsx` | ✅ Selesai |
| `/sertifikat` | `src/app/sertifikat/page.tsx` | ✅ Selesai |
| `/login` | `src/app/login/page.tsx` | 🟡 Rangka dasar |
| `/dashboard` | `src/app/dashboard/page.tsx` | 🟡 Rangka dasar |
| `/tentang` | `src/app/tentang/page.tsx` | 🟡 Rangka dasar |

### Komponen

#### `src/components/ui/Navbar.tsx`
- 3-tier navbar: Announcement bar (bisa ditutup), Main bar (brand + nav links + tombol Masuk), Trust bar (tidak ada — hanya 2 tier)
- Mobile: hamburger menu dengan drawer
- Font: `font-heading`, link: Home, Event, Galeri, Berita, Aspirasi, Sertifikat, Devisi

#### `src/components/ui/Footer.tsx`
- Footer sederhana: nama organisasi, tahun, hak cipta

#### `src/components/home/`
| Komponen | Fungsi |
|---|---|
| `HeroSection.tsx` | Hero dengan video bg (`/videos/bg.mp4`), heading "Jangan lupa Titik Koma", CTA ke aspirasi & event |
| `FloatingData.tsx` | Grid 4 foto dari API `/api/images`, mobile horizontal scroll + snap, desktop grid dengan efek lengkung |
| `Collaborators.tsx` | Partner section (GDG, GitHub, Dicoding, Microsoft, STIMIK) |
| `AspirationTracker.tsx` | (terdefinisi tapi belum dicek) |
| `OverviewSection.tsx` | (terdefinisi tapi belum dicek) |
| `HeroCarousel.tsx` | (terdefinisi tapi belum dicek — alternatif hero) |

### API Client (`src/lib/api/`)

| Module | File | Endpoints |
|---|---|---|
| Client | `client.ts` | `fetchAPI<T>()`, `withAuth(token)`, tipe `ApiResponse<T>` & `PaginatedResponse<T>` |
| Auth | `auth.ts` | login, register |
| News | `api.ts` & `news.ts` | `getNews`, `getNewsBySlug` |
| Events | `api.ts` & `events.ts` | `getEvents`, `getEventBySlug` |
| Aspirations | `api.ts` & `aspirations.ts` | `submitAspiration`, `getAspirations` |
| Certificates | `api.ts` & `certificates.ts` | `getMyCertificates` |
| Members | `devisi.ts` | `getMembers`, `getMemberById`, `createMember`, `updateMember`, `deleteMember` |
| Images | `images.ts` | `getImages`, `getImageById`, `createImage`, `updateImage`, `deleteImage` |
| Users | `users.ts` | CRUD user (admin) |
| Attendances | `attendances.ts` | absensi |
| Registrations | `registrations.ts` | pendaftaran event |

---

## Backend (`hmtika/backend`)

### Stack
- Express.js + `pg` (PostgreSQL) + JWT (`jsonwebtoken`) + `bcryptjs` + `multer` (upload) + `cors`

### Database — Tabel (berdasarkan migrations & controllers)

| Tabel | Kegunaan | Migration |
|---|---|---|
| `users` | Registrasi, login, role (admin/user) | — |
| `divisions` | Divisi organisasi (RISTEK, PENDIDIKAN, dll) | `002_create_devisi.sql` |
| `members` | Anggota per divisi (FK → divisions) | `002_create_devisi.sql` |
| `images` | Galeri foto kegiatan | `001_create_images.sql` |
| `news` | Berita & pengumuman (slug, kategori, status draft/published) | — |
| `events` | Kegiatan & event (slug, status upcoming/ongoing/completed) | — |
| `registrations` | Pendaftaran user ke event | — |
| `attendances` | Sesi absensi event | — |
| `attendance_logs` | Log kehadiran user per sesi | — |
| `certificates` | E-sertifikat peserta event | — |
| `aspirations` | Kotak aspirasi (anonim/public) | — |

### API Endpoints

| Endpoint | Methods | Auth | Deskripsi |
|---|---|---|---|
| `/api/auth/register` | POST | Publik | Registrasi user baru |
| `/api/auth/login` | POST | Publik | Login, return JWT token |
| `/api/users` | GET, POST, PUT/:id, DELETE/:id | Admin | Manajemen user |
| `/api/news` | GET, POST | GET publik, POST admin | Berita (publik: published only) |
| `/api/news/:slug` | GET, PUT, DELETE | GET publik, PUT/DELETE admin | Detail berita |
| `/api/news/admin` | GET | Admin | Semua berita termasuk draft |
| `/api/events` | GET, POST | GET publik, POST admin | Event |
| `/api/events/:slug` | GET, PUT, DELETE | GET publik, PUT/DELETE admin | Detail event |
| `/api/registrations` | GET, POST | Login required | Pendaftaran event |
| `/api/attendances` | GET, POST | Admin | Sesi absensi |
| `/api/logs` | GET, POST | Login required | Log kehadiran |
| `/api/certificates` | GET, POST | Login required | Sertifikat |
| `/api/certificates/me` | GET | Login required | Sertifikat milik user |
| `/api/aspirations` | GET, POST | POST publik, GET login | Aspirasi |
| `/api/aspirations/stats` | GET | Admin | Statistik aspirasi |
| `/api/aspirations/:id/respond` | PUT | Admin | Respon admin ke aspirasi |
| `/api/aspirations/:id` | DELETE | Admin | Hapus aspirasi |
| `/api/images` | GET, POST | GET publik, POST admin | Galeri gambar |
| `/api/images/:id` | GET, PUT, DELETE | GET publik, PUT/DELETE admin | Detail gambar |
| `/api/divisions` | GET, POST, PUT/:id, DELETE/:id | GET publik, sisanya admin | Divisi |
| `/api/members` | GET, POST, PUT/:id, DELETE/:id | GET publik, sisanya admin | Anggota divisi |
| `/api/health` | GET | Publik | Health check |

### Middleware
| File | Fungsi |
|---|---|
| `middleware/auth.js` | `authenticate` (JWT verify), `authorizeAdmin` (role check) |
| `middleware/upload.js` | File upload dengan multer |

---

## Yang Perlu Dilanjutkan

1. **Halaman Login** — masih rangka dasar, perlu integrasi API auth + form validation
2. **Halaman Dashboard** — perlu dibangun panel admin untuk CRUD konten
3. **Halaman Tentang** — masih kerangka kosong
4. **Testing** — belum ada unit/integration test
5. **Deployment** — belum dikonfigurasi
