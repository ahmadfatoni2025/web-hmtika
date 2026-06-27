/**
 * Auth API — /api/auth
 *
 * Routes:
 *   POST /api/auth/register
 *   POST /api/auth/login
 */

import { fetchAPI } from "./client"
import type { ApiResponse } from "./client"

// ─── Types ───────────────────────────────────────────────────────
export interface UserData {
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

export interface AuthResult {
  user: UserData
  token: string
}

// ─── Endpoints ───────────────────────────────────────────────────
export async function login(email: string, password: string) {
  return fetchAPI<ApiResponse<AuthResult>>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function register(data: {
  nama: string
  email: string
  password: string
  angkatan: string
  prodi?: string
}) {
  return fetchAPI<ApiResponse<AuthResult>>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  })
}
