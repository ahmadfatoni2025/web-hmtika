/**
 * Certificates API — /api/certificates
 *
 * Routes:
 *   GET    /api/certificates/me          (Authenticated user)
 *   GET    /api/certificates             (Admin)
 *   POST   /api/certificates/generate    (Admin)
 *   POST   /api/certificates/bulk        (Admin)
 *   DELETE /api/certificates/:id         (Admin)
 */

import { fetchAPI, withAuth } from "./client"
import type { ApiResponse } from "./client"

// ─── Types ───────────────────────────────────────────────────────
export interface CertificateItem {
  id: number
  reg_id: number
  nomor_sertif: string
  file_url: string
  tgl_terbit: string
  event_id: number
  event_judul: string
  event_tanggal: string
  event_lokasi: string
  event_slug: string
  user_id?: number
  user_nama?: string
  user_email?: string
}

// ─── Public / User Endpoints ────────────────────────────────────

/** GET /api/certificates/me — Get all certificates (public) */
export async function getMyCertificates() {
  return fetchAPI<{ success: boolean; data: CertificateItem[] }>(
    "/certificates/me"
  )
}

// ─── Admin Endpoints ────────────────────────────────────────────

/** GET /api/certificates — Get all certificates (public) */
export async function getAllCertificates() {
  return fetchAPI<{ success: boolean; data: CertificateItem[] }>(
    "/certificates"
  )
}

/** POST /api/certificates/generate — Generate a single certificate */
export async function generateCertificate(
  token: string,
  data: { registrationId: number }
) {
  return fetchAPI<ApiResponse<CertificateItem>>(
    "/certificates/generate",
    {
      ...withAuth(token),
      method: "POST",
      body: JSON.stringify(data),
    }
  )
}

/** POST /api/certificates/bulk — Generate bulk certificates for an event */
export async function generateBulkCertificates(
  token: string,
  data: { eventId: number }
) {
  return fetchAPI<ApiResponse<CertificateItem[]>>(
    "/certificates/bulk",
    {
      ...withAuth(token),
      method: "POST",
      body: JSON.stringify(data),
    }
  )
}

/** DELETE /api/certificates/:id */
export async function deleteCertificate(token: string, id: number) {
  return fetchAPI<ApiResponse<null>>(
    `/certificates/${id}`,
    {
      ...withAuth(token),
      method: "DELETE",
    }
  )
}
