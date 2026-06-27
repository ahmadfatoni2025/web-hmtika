const db = require("../config/db");

exports.checkIn = async (req, res) => {
  try {
    const { kodeAbsen } = req.params;
    const userId = req.user.id;

    const attResult = await db.query("SELECT * FROM attendances WHERE kode_absen = $1", [kodeAbsen]);
    const attendance = attResult.rows[0];
    if (!attendance) {
      return res.status(404).json({ success: false, message: "Kode absen tidak valid" });
    }

    const now = new Date();
    const waktuBuka = new Date(attendance.waktu_buka);
    const waktuTutup = new Date(attendance.waktu_tutup);
    if (now < waktuBuka || now > waktuTutup) {
      return res.status(400).json({ success: false, message: "Waktu absensi tidak valid atau sudah ditutup" });
    }

    const existing = await db.query(
      `SELECT id FROM attendance_logs WHERE attendance_id = $1 AND user_id = $2`,
      [attendance.id, userId]
    );
    if (existing.rows[0]) {
      return res.status(409).json({ success: false, message: "Anda sudah melakukan absensi" });
    }

    const result = await db.query(
      `INSERT INTO attendance_logs (attendance_id, user_id) VALUES ($1, $2) RETURNING *`,
      [attendance.id, userId]
    );

    res.status(201).json({ success: true, message: "Absensi berhasil dicatat", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal melakukan absensi" });
  }
};

exports.getMyAttendances = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT al.*, a.nama_sesi, a.kode_absen, a.waktu_buka, a.waktu_tutup,
              e.id AS event_id, e.judul AS event_judul, e.tanggal AS event_tanggal
       FROM attendance_logs al
       JOIN attendances a ON al.attendance_id = a.id
       JOIN events e ON a.event_id = e.id
       WHERE al.user_id = $1
       ORDER BY al.waktu_absen DESC`,
      [req.user.id]
    );
    res.json({ success: true, data: result.rows });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data" });
  }
};

exports.getLogsByAttendance = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT al.*, u.id AS user_id_data, u.nama AS user_nama, u.angkatan AS user_angkatan
       FROM attendance_logs al
       JOIN users u ON al.user_id = u.id
       WHERE al.attendance_id = $1
       ORDER BY al.waktu_absen ASC`,
      [req.params.attendanceId]
    );
    res.json({ success: true, data: result.rows });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data log absensi" });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    await db.query("DELETE FROM attendance_logs WHERE id = $1", [req.params.id]);
    res.json({ success: true, message: "Log absensi berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus log absensi" });
  }
};
