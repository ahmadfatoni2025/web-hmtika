export interface NewsItem {
  data: NewsItem
  id: number
  slug: string
  judul: string
  ringkasan: string
  kategori: string
  tglPublish?: string
  createdAt?: string
  thumbnail?: string
  konten?: string
  author?: {
    id: number
    nama: string
    foto?: string
  }
}

export interface EventItem {
  data: EventItem
  id: number
  slug: string
  judul: string
  lokasi: string
  tanggal: string
  kuota: number
  biaya: number
  deskripsi?: string
  thumbnail?: string
  tanggalAkhir?: string
  status?: string
  kategori?: string
  registration_count?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function getNews(page = 1, limit = 10, kategori?: string) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (kategori) params.set("kategori", kategori)
  return fetchAPI<PaginatedResponse<NewsItem>>(`/news?${params}`)
}

export async function getNewsBySlug(slug: string) {
  return fetchAPI<NewsItem>(`/news/${slug}`)
}

export async function getEvents(page = 1, limit = 9, status?: string) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (status) params.set("status", status)
  return fetchAPI<PaginatedResponse<EventItem>>(`/events?${params}`)
}

export async function getEventBySlug(slug: string) {
  return fetchAPI<EventItem>(`/events/${slug}`)
}

export async function login(email: string, password: string) {
  return fetchAPI<{ token: string; user: unknown }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function register(data: {
  nama: string
  email: string
  password: string
  angkatan: string
}) {
  return fetchAPI<{ token: string; user: unknown }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function submitAspiration(data: {
  kategori: string
  isiAspirasi: string
  isAnonymous: boolean
}) {
  return fetchAPI<{ success: boolean }>("/aspirations", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export interface AspirationItem {
  id: number
  kategori: string
  isiAspirasi: string
  isAnonymous: boolean
  status: string
  responAdmin?: string
  createdAt: string
  user?: { nama: string; email: string; angkatan: string } | null
}

export async function getAspirations(page = 1, limit = 10, kategori?: string, status?: string) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (kategori) params.set("kategori", kategori)
  if (status) params.set("status", status)
  return fetchAPI<PaginatedResponse<AspirationItem>>(`/aspirations?${params}`)
}

export interface CertificateItem {
  id: number
  nomor_sertif: string
  file_url: string
  tgl_terbit: string
  event_id: number
  event_judul: string
  event_tanggal: string
  event_lokasi: string
}

export async function getMyCertificates(token: string) {
  return fetchAPI<{ success: boolean; data: CertificateItem[] }>("/certificates/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
}

