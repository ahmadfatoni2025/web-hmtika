/**
 * Attendances API — /api/attendances
 *
 * Routes:
 *   GET    /api/attendances/event/:eventId    (Admin)
 *   POST   /api/attendances                   (Admin)
 *   PUT    /api/attendances/:id               (Admin)
 *   DELETE /api/attendances/:id               (Admin)
 *
 * Attendance Logs API — /api/logs
 *
 * Routes:
 *   GET    /api/logs/me                       (User)
 *   GET    /api/logs/:attendanceId            (Admin)
 *   POST   /api/logs/checkin/:kodeAbsen       (User)
 *   DELETE /api/logs/:id                      (Admin)
 */

import { fetchAPI, withAuth } from "./client"
import type { ApiResponse } from "./client"

// ─── Attendance Types ────────────────────────────────────────────
export interface AttendanceItem {
  id: number
  event_id: number
  nama_sesi: string
  kode_absen: string
  waktu_buka: string
  waktu_tutup: string
  created_at: string
  logs?: AttendanceLogItem[]
}

export interface AttendanceLogItem {
  id: number
  attendance_id: number
  user_id: number
  waktu_absen: string
  user?: {
    id: number
    nama: string
    angkatan: string
  }
}

export interface MyAttendanceLog {
  id: number
  attendance_id: number
  waktu_absen: string
  nama_sesi: string
  kode_absen: string
  waktu_buka: string
  waktu_tutup: string
  event_id: number
  event_judul: string
  event_tanggal: string
}

// ─── Attendance Endpoints (Admin) ────────────────────────────────

/** GET /api/attendances/event/:eventId */
export async function getAttendancesByEvent(token: string, eventId: number) {
  return fetchAPI<ApiResponse<AttendanceItem[]>>(
    `/attendances/event/${eventId}`,
    withAuth(token)
  )
}

/** POST /api/attendances */
export async function createAttendance(
  token: string,
  data: {
    eventId: number
    namaSesi: string
    waktuBuka: string
    waktuTutup: string
  }
) {
  return fetchAPI<ApiResponse<AttendanceItem>>("/attendances", {
    ...withAuth(token),
    method: "POST",
    body: JSON.stringify(data),
  })
}

/** PUT /api/attendances/:id */
export async function updateAttendance(
  token: string,
  id: number,
  data: {
    namaSesi: string
    waktuBuka: string
    waktuTutup: string
  }
) {
  return fetchAPI<ApiResponse<AttendanceItem>>(`/attendances/${id}`, {
    ...withAuth(token),
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/** DELETE /api/attendances/:id */
export async function deleteAttendance(token: string, id: number) {
  return fetchAPI<ApiResponse<null>>(`/attendances/${id}`, {
    ...withAuth(token),
    method: "DELETE",
  })
}

// ─── Attendance Logs Endpoints ───────────────────────────────────

/** GET /api/logs/me */
export async function getMyAttendances(token: string) {
  return fetchAPI<ApiResponse<MyAttendanceLog[]>>("/logs/me", withAuth(token))
}

/** POST /api/logs/checkin/:kodeAbsen */
export async function checkIn(token: string, kodeAbsen: string) {
  return fetchAPI<ApiResponse<AttendanceLogItem>>(`/logs/checkin/${kodeAbsen}`, {
    ...withAuth(token),
    method: "POST",
  })
}

/** GET /api/logs/:attendanceId  (Admin) */
export async function getLogsByAttendance(token: string, attendanceId: number) {
  return fetchAPI<ApiResponse<AttendanceLogItem[]>>(
    `/logs/${attendanceId}`,
    withAuth(token)
  )
}

/** DELETE /api/logs/:id  (Admin) */
export async function deleteAttendanceLog(token: string, id: number) {
  return fetchAPI<ApiResponse<null>>(`/logs/${id}`, {
    ...withAuth(token),
    method: "DELETE",
  })
}
