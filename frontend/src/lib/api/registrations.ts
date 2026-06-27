/**
 * Registrations API — /api/registrations
 *
 * Routes:
 *   POST   /api/registrations/event/:id   (User)
 *   GET    /api/registrations/me          (User)
 *   GET    /api/registrations             (Admin)
 *   PUT    /api/registrations/:id         (Admin)
 *   DELETE /api/registrations/:id         (Admin)
 */

import { fetchAPI, withAuth } from "./client"
import type { ApiResponse } from "./client"

// ─── Types ───────────────────────────────────────────────────────
export interface RegistrationItem {
  id: number
  eventId: number
  userId: number
  tglDaftar: string
  statusHadir: string
  createdAt: string
  event: {
    id: number
    judul: string
    tanggal: string
    lokasi: string
    slug: string
  }
  certificate?: {
    id: number
    nomorSertif: string
    fileUrl: string
    tglTerbit: string
  } | null
}

export interface AdminRegistrationItem {
  id: number
  eventId: number
  userId: number
  tglDaftar: string
  statusHadir: string
  createdAt: string
  user: {
    id: number
    nama: string
    email: string
    angkatan: string
  }
  event: {
    id: number
    judul: string
  }
}

// ─── User Endpoints ──────────────────────────────────────────────

/** POST /api/registrations/event/:id */
export async function registerEvent(token: string, eventId: number) {
  return fetchAPI<ApiResponse<RegistrationItem>>(`/registrations/event/${eventId}`, {
    ...withAuth(token),
    method: "POST",
  })
}

/** GET /api/registrations/me */
export async function getMyRegistrations(token: string) {
  return fetchAPI<ApiResponse<RegistrationItem[]>>("/registrations/me", withAuth(token))
}

// ─── Admin Endpoints ─────────────────────────────────────────────

/** GET /api/registrations?eventId= */
export async function getAllRegistrations(token: string, eventId?: number) {
  const params = new URLSearchParams()
  if (eventId) params.set("eventId", String(eventId))
  const query = params.toString() ? `?${params}` : ""
  return fetchAPI<ApiResponse<AdminRegistrationItem[]>>(`/registrations${query}`, withAuth(token))
}

/** PUT /api/registrations/:id */
export async function updateRegistration(
  token: string,
  id: number,
  data: { statusHadir: string }
) {
  return fetchAPI<ApiResponse<RegistrationItem>>(`/registrations/${id}`, {
    ...withAuth(token),
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/** DELETE /api/registrations/:id */
export async function deleteRegistration(token: string, id: number) {
  return fetchAPI<ApiResponse<null>>(`/registrations/${id}`, {
    ...withAuth(token),
    method: "DELETE",
  })
}
