/**
 * Users API — /api/users
 *
 * Routes:
 *   GET    /api/users/me        (User)
 *   PUT    /api/users/me        (User)
 *   GET    /api/users           (Admin)
 *   GET    /api/users/stats     (Admin)
 *   GET    /api/users/:id       (User)
 *   PUT    /api/users/:id       (Admin)
 *   DELETE /api/users/:id       (Admin)
 */

import { fetchAPI, withAuth } from "./client"
import type { ApiResponse } from "./client"

// ─── Types ───────────────────────────────────────────────────────
export interface User {
  id: number
  nama: string
  email: string
  angkatan: string
  prodi: string
  role: string
  status: string
  foto?: string
  created_at?: string
}

export interface DashboardStats {
  totalUsers: number
  totalNews: number
  totalEvents: number
  totalAspirations: number
  pendingAspirations: number
}

// ─── Endpoints ───────────────────────────────────────────────────

/** GET /api/users/me */
export async function getMe(token: string) {
  return fetchAPI<ApiResponse<User>>("/users/me", withAuth(token))
}

/** PUT /api/users/me */
export async function updateProfile(
  token: string,
  data: { nama: string; angkatan: string; prodi: string; foto?: string }
) {
  return fetchAPI<ApiResponse<User>>("/users/me", {
    ...withAuth(token),
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/** GET /api/users  (Admin) */
export async function getAllUsers(token: string) {
  return fetchAPI<ApiResponse<User[]>>("/users", withAuth(token))
}

/** GET /api/users/stats  (Admin) */
export async function getDashboardStats(token: string) {
  return fetchAPI<ApiResponse<DashboardStats>>("/users/stats", withAuth(token))
}

/** GET /api/users/:id */
export async function getUserById(token: string, id: number) {
  return fetchAPI<ApiResponse<User>>(`/users/${id}`, withAuth(token))
}

/** PUT /api/users/:id  (Admin) */
export async function updateUser(
  token: string,
  id: number,
  data: { nama: string; angkatan: string; prodi: string; role: string; status: string }
) {
  return fetchAPI<ApiResponse<User>>(`/users/${id}`, {
    ...withAuth(token),
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/** DELETE /api/users/:id  (Admin) */
export async function deleteUser(token: string, id: number) {
  return fetchAPI<ApiResponse<null>>(`/users/${id}`, {
    ...withAuth(token),
    method: "DELETE",
  })
}
