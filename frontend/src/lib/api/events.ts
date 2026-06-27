/**
 * Events API — /api/events
 *
 * Routes:
 *   GET    /api/events            (Public)
 *   GET    /api/events/:slug      (Public)
 *   POST   /api/events            (Admin)
 *   PUT    /api/events/:id        (Admin)
 *   DELETE /api/events/:id        (Admin)
 */

import { fetchAPI, withAuth } from "./client"
import type { ApiResponse, PaginatedResponse } from "./client"

// ─── Types ───────────────────────────────────────────────────────
export interface EventItem {
  id: number
  slug: string
  judul: string
  deskripsi?: string
  thumbnail?: string
  tanggal: string
  tanggal_akhir?: string
  lokasi: string
  kuota: number
  biaya: number
  status?: string
  kategori?: string
  registration_count?: number
  created_at?: string
  updated_at?: string
}

// ─── Public Endpoints ────────────────────────────────────────────

/** GET /api/events?page=&limit=&status=&kategori= */
export async function getEvents(
  page = 1,
  limit = 9,
  status?: string,
  kategori?: string
) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (status) params.set("status", status)
  if (kategori) params.set("kategori", kategori)
  return fetchAPI<PaginatedResponse<EventItem>>(`/events?${params}`)
}

/** GET /api/events/:slug */
export async function getEventBySlug(slug: string) {
  return fetchAPI<ApiResponse<EventItem>>(`/events/${slug}`)
}

// ─── Admin Endpoints ─────────────────────────────────────────────

/** POST /api/events */
export async function createEvent(
  token: string,
  data: {
    judul: string
    deskripsi: string
    tanggal: string
    tanggalAkhir?: string
    lokasi: string
    kuota?: number
    biaya?: number
    kategori?: string
    status?: string
    thumbnail?: string
  }
) {
  return fetchAPI<ApiResponse<EventItem>>("/events", {
    ...withAuth(token),
    method: "POST",
    body: JSON.stringify(data),
  })
}

/** PUT /api/events/:id */
export async function updateEvent(
  token: string,
  id: number,
  data: {
    judul?: string
    deskripsi?: string
    tanggal?: string
    tanggalAkhir?: string
    lokasi?: string
    kuota?: number
    biaya?: number
    kategori?: string
    status?: string
    thumbnail?: string
  }
) {
  return fetchAPI<ApiResponse<EventItem>>(`/events/${id}`, {
    ...withAuth(token),
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/** DELETE /api/events/:id */
export async function deleteEvent(token: string, id: number) {
  return fetchAPI<ApiResponse<null>>(`/events/${id}`, {
    ...withAuth(token),
    method: "DELETE",
  })
}
