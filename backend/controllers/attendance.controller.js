const db = require("../config/db");

exports.createAttendance = async (req, res) => {
  try {
    const { eventId, namaSesi, waktuBuka, waktuTutup } = req.body;
    const result = await db.query(
      `INSERT INTO attendances (event_id, nama_sesi, waktu_buka, waktu_tutup)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [eventId, namaSesi, new Date(waktuBuka), new Date(waktuTutup)]
    );
    res.status(201).json({ success: true, message: "Sesi absensi dibuat", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal membuat sesi absensi" });
  }
};

exports.getAttendancesByEvent = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT a.*,
              COALESCE(
                json_agg(
                  json_build_object(
                    'id', al.id, 'waktuAbsen', al.waktu_absen,
                    'user', json_build_object('id', u.id, 'nama', u.nama, 'angkatan', u.angkatan)
                  )
                ) FILTER (WHERE al.id IS NOT NULL),
                '[]'
              ) AS logs
       FROM attendances a
       LEFT JOIN attendance_logs al ON al.attendance_id = a.id
       LEFT JOIN users u ON al.user_id = u.id
       WHERE a.event_id = $1
       GROUP BY a.id
       ORDER BY a.created_at DESC`,
      [req.params.eventId]
    );
    res.json({ success: true, data: result.rows });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data absensi" });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { namaSesi, waktuBuka, waktuTutup } = req.body;
    const result = await db.query(
      `UPDATE attendances SET nama_sesi = $1, waktu_buka = $2, waktu_tutup = $3
       WHERE id = $4 RETURNING *`,
      [namaSesi, new Date(waktuBuka), new Date(waktuTutup), req.params.id]
    );
    res.json({ success: true, message: "Sesi absensi diperbarui", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui sesi absensi" });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    await db.query("DELETE FROM attendances WHERE id = $1", [req.params.id]);
    res.json({ success: true, message: "Sesi absensi berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus sesi absensi" });
  }
};
