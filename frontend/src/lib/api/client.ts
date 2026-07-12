/**
 * Shared API client & common types
 * Base URL config and generic fetch wrapper used by all API modules.
 */

// ─── Common Types ────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
  }
}

// ─── API Client ──────────────────────────────────────────────────
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

/**
 * Generic fetch wrapper.
 * Automatically injects Content-Type and Authorization headers.
 */
export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (!res.ok) {
    let msg = `API error: ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) msg = body.message
    } catch {}
    throw new Error(msg)
  }

  return res.json()
}

/**
 * Builds an authenticated fetch options object.
 */
export function withAuth(
  token: string,
  options?: RequestInit
): RequestInit {
  return {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  }
}
