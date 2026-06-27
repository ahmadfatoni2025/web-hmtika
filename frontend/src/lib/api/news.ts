/**
 * News API — /api/news
 *
 * Routes:
 *   GET    /api/news              (Public)
 *   GET    /api/news/admin        (Admin)
 *   GET    /api/news/:slug        (Public)
 *   POST   /api/news              (Admin)
 *   PUT    /api/news/:id          (Admin)
 *   DELETE /api/news/:id          (Admin)
 */

import { fetchAPI, withAuth } from "./client"
import type { ApiResponse, PaginatedResponse } from "./client"

// ─── Types ───────────────────────────────────────────────────────
export interface NewsItem {
  id: number
  slug: string
  judul: string
  konten: string
  ringkasan: string
  thumbnail?: string
  kategori: string
  status: string
  tglPublish?: string
  createdAt?: string
  updatedAt?: string
  author?: {
    id: number
    nama: string
    foto?: string
  }
}

// ─── Public Endpoints ────────────────────────────────────────────

/** GET /api/news?page=&limit=&kategori=&search= */
export async function getNews(page = 1, limit = 10, kategori?: string, search?: string) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (kategori) params.set("kategori", kategori)
  if (search) params.set("search", search)
  return fetchAPI<PaginatedResponse<NewsItem>>(`/news?${params}`)
}

/** GET /api/news/:slug */
export async function getNewsBySlug(slug: string) {
  return fetchAPI<ApiResponse<NewsItem>>(`/news/${slug}`)
}

// ─── Admin Endpoints ─────────────────────────────────────────────

/** GET /api/news/admin?page=&limit= */
export async function getAllNewsAdmin(token: string, page = 1, limit = 20) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  return fetchAPI<PaginatedResponse<NewsItem>>(`/news/admin?${params}`, withAuth(token))
}

/** POST /api/news */
export async function createNews(
  token: string,
  data: {
    judul: string
    konten: string
    ringkasan: string
    kategori?: string
    status?: string
    thumbnail?: string
  }
) {
  return fetchAPI<ApiResponse<NewsItem>>("/news", {
    ...withAuth(token),
    method: "POST",
    body: JSON.stringify(data),
  })
}

/** PUT /api/news/:id */
export async function updateNews(
  token: string,
  id: number,
  data: {
    judul?: string
    konten?: string
    ringkasan?: string
    kategori?: string
    status?: string
    thumbnail?: string
  }
) {
  return fetchAPI<ApiResponse<NewsItem>>(`/news/${id}`, {
    ...withAuth(token),
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/** DELETE /api/news/:id */
export async function deleteNews(token: string, id: number) {
  return fetchAPI<ApiResponse<null>>(`/news/${id}`, {
    ...withAuth(token),
    method: "DELETE",
  })
}
