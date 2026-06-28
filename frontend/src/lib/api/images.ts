/**
 * Images API — /api/images
 *
 * Routes:
 *   GET    /api/images             (Public)
 *   GET    /api/images/:id         (Public)
 *   POST   /api/images             (Admin)
 *   PUT    /api/images/:id         (Admin)
 *   DELETE /api/images/:id         (Admin)
 */

import { fetchAPI, withAuth } from "./client"
import type { ApiResponse, PaginatedResponse } from "./client"

// ─── Types ───────────────────────────────────────────────────────
export interface ImageItem {
  id: number
  title: string
  description?: string
  image_url: string
  created_at: string
}

// ─── Public Endpoints ────────────────────────────────────────────

/** GET /api/images?page=&limit= */
export async function getImages(page = 1, limit = 20) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  return fetchAPI<PaginatedResponse<ImageItem>>(`/images?${params}`)
}

/** GET /api/images/:id */
export async function getImageById(id: number) {
  return fetchAPI<ApiResponse<ImageItem>>(`/images/${id}`)
}

// ─── Admin Endpoints ─────────────────────────────────────────────

/** POST /api/images */
export async function createImage(
  token: string,
  data: { title: string; description?: string; image_url: string }
) {
  return fetchAPI<ApiResponse<ImageItem>>("/images", {
    ...withAuth(token),
    method: "POST",
    body: JSON.stringify(data),
  })
}

/** PUT /api/images/:id */
export async function updateImage(
  token: string,
  id: number,
  data: { title?: string; description?: string; image_url?: string }
) {
  return fetchAPI<ApiResponse<ImageItem>>(`/images/${id}`, {
    ...withAuth(token),
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/** DELETE /api/images/:id */
export async function deleteImage(token: string, id: number) {
  return fetchAPI<ApiResponse<null>>(`/images/${id}`, {
    ...withAuth(token),
    method: "DELETE",
  })
}
