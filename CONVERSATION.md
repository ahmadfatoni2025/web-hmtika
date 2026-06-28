# Percakapan Terakhir — 28 Juni 2026

## Frontend (`hmtika/frontend`)

### Navbar (`src/components/ui/Navbar.tsx`)
- 3-tier navbar: Announcement bar, Main bar, Trust bar
- Announcement bisa ditutup (tombol X) dengan animasi smooth
- Font: `font-heading` (Plus Jakarta Sans) semibold

### FloatingData (`src/components/home/FloatingData.tsx`)
- Menampilkan 3-4 foto dari API `/api/images`
- Mobile: horizontal scroll + snap
- Desktop: grid 4 kolom dengan efek lengkung ke atas

### Halaman Devisi (`src/app/devisi/page.tsx`)
- Header: pill badge "Tim Kami" + heading + paragraf
- Filter row (All, RISTEK, PENDIDIKAN, HUMAS INTERNAL, HUMAS EKSTERNAL, MEDINFO, PSDM)
- Grid 4→2→1 kolom, foto member dengan overlay nama + deskripsi
- CTA footer "Ingin bergabung?" + "Hubungi Kami"
- Icon dari lucide-react

### API Client (`src/lib/api/devisi.ts`)
- `getMembers()` → GET /api/members
- CRUD: createMember, updateMember, deleteMember

---

## Backend (`hmtika/backend`)

### Database — Tabel:
- `divisions` (id, name, description, created_at, updated_at)
- `members` (id, name, division_id → FK, photo_url, social_media_url, description)
- `images` (id, title, description, image_url)

### API Endpoints:
| Endpoint | Methods |
|---|---|
| `/api/members` | GET, POST, PUT/:id, DELETE/:id |
| `/api/divisions` | GET, POST, PUT/:id, DELETE/:id |
| `/api/images` | GET, POST, PUT/:id, DELETE/:id |
