const db = require("../config/db");

exports.createAttendance = async (req, res) => {
  try {
    const { eventId, namaSesi, waktuBuka, waktuTutup } = req.body;
    const result = await db.query(
      `INSERT INTO attendances (event_id, nama_sesi, waktu_buka, waktu_tutup)
       VALUES (?, ?, ?, ?)`,
      [eventId, namaSesi, new Date(waktuBuka), new Date(waktuTutup)]
    );
    res.status(201).json({ success: true, message: "Sesi absensi dibuat", data: { id: result.insertId } });
  } catch {
    res.status(500).json({ success: false, message: "Gagal membuat sesi absensi" });
  }
};

exports.getAttendancesByEvent = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT a.*,
               COALESCE(
                 (SELECT JSON_ARRAYAGG(
                   JSON_OBJECT(
                     'id', al.id, 'waktuAbsen', al.waktu_absen,
                     'user', JSON_OBJECT('id', u.id, 'nama', u.nama, 'angkatan', u.angkatan)
                   )
                 )
                 FROM attendance_logs al
                 JOIN users u ON al.user_id = u.id
                 WHERE al.attendance_id = a.id),
                 CAST('[]' AS JSON)
               ) AS logs
        FROM attendances a
        WHERE a.event_id = ?
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
    await db.query(
      `UPDATE attendances SET nama_sesi = ?, waktu_buka = ?, waktu_tutup = ?
       WHERE id = ?`,
      [namaSesi, new Date(waktuBuka), new Date(waktuTutup), req.params.id]
    );
    res.json({ success: true, message: "Sesi absensi diperbarui" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui sesi absensi" });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    await db.query("DELETE FROM attendances WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Sesi absensi berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus sesi absensi" });
  }
};
