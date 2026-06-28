/**
 * Members API — /api/members (with division join)
 *
 * Routes:
 *   GET    /api/members             (Public)
 *   GET    /api/members/:id         (Public)
 *   POST   /api/members             (Admin)
 *   PUT    /api/members/:id         (Admin)
 *   DELETE /api/members/:id         (Admin)
 */

import { fetchAPI, withAuth } from "./client"
import type { ApiResponse } from "./client"

// ─── Types ───────────────────────────────────────────────────────
export interface Division {
  id: number
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface MemberItem {
  id: number
  name: string
  division_id: number
  division_name: string
  photo_url: string
  social_media_url?: string
  description?: string
  created_at: string
  updated_at: string
}

// ─── Public Endpoints ────────────────────────────────────────────

/** GET /api/members */
export async function getMembers() {
  return fetchAPI<{ success: boolean; data: MemberItem[] }>("/members")
}

/** GET /api/members/:id */
export async function getMemberById(id: number) {
  return fetchAPI<ApiResponse<MemberItem>>(`/members/${id}`)
}

// ─── Admin Endpoints ─────────────────────────────────────────────

/** POST /api/members */
export async function createMember(
  token: string,
  data: { name: string; division_id: number; photo_url: string; social_media_url?: string; description?: string }
) {
  return fetchAPI<ApiResponse<MemberItem>>("/members", {
    ...withAuth(token),
    method: "POST",
    body: JSON.stringify(data),
  })
}

/** PUT /api/members/:id */
export async function updateMember(
  token: string,
  id: number,
  data: { name?: string; division_id?: number; photo_url?: string; social_media_url?: string; description?: string }
) {
  return fetchAPI<ApiResponse<MemberItem>>(`/members/${id}`, {
    ...withAuth(token),
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/** DELETE /api/members/:id */
export async function deleteMember(token: string, id: number) {
  return fetchAPI<ApiResponse<null>>(`/members/${id}`, {
    ...withAuth(token),
    method: "DELETE",
  })
}
