const db = require("../config/db");

exports.registerEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const eventResult = await db.query(
      `SELECT e.*, (SELECT COUNT(*) FROM registrations r WHERE r.event_id = e.id) AS reg_count
       FROM events e WHERE e.id = $1`,
      [eventId]
    );
    const event = eventResult.rows[0];
    if (!event) {
      return res.status(404).json({ success: false, message: "Event tidak ditemukan" });
    }
    if (parseInt(event.reg_count) >= event.kuota) {
      return res.status(400).json({ success: false, message: "Kuota event sudah penuh" });
    }

    const existing = await db.query(
      `SELECT id FROM registrations WHERE event_id = $1 AND user_id = $2`,
      [eventId, userId]
    );
    if (existing.rows[0]) {
      return res.status(409).json({ success: false, message: "Anda sudah terdaftar di event ini" });
    }

    const result = await db.query(
      `INSERT INTO registrations (event_id, user_id) VALUES ($1, $2) RETURNING *`,
      [eventId, userId]
    );

    res.status(201).json({ success: true, message: "Berhasil mendaftar event", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mendaftar event" });
  }
};

exports.getMyRegistrations = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT r.*, e.id AS event_id_data, e.judul AS event_judul, e.tanggal AS event_tanggal,
              e.lokasi AS event_lokasi, e.slug AS event_slug,
              ec.id AS cert_id, ec.nomor_sertif, ec.file_url, ec.tgl_terbit
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       LEFT JOIN e_certificates ec ON ec.reg_id = r.id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );

    const data = result.rows.map((r) => ({
      id: r.id, eventId: r.event_id, userId: r.user_id,
      tglDaftar: r.tgl_daftar, statusHadir: r.status_hadir,
      createdAt: r.created_at,
      event: { id: r.event_id_data, judul: r.event_judul, tanggal: r.event_tanggal, lokasi: r.event_lokasi, slug: r.event_slug },
      certificate: r.cert_id ? { id: r.cert_id, nomorSertif: r.nomor_sertif, fileUrl: r.file_url, tglTerbit: r.tgl_terbit } : null,
    }));

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data pendaftaran" });
  }
};

exports.getAllRegistrations = async (req, res) => {
  try {
    const { eventId } = req.query;
    let query = `SELECT r.*, u.id AS user_id_data, u.nama AS user_nama, u.email AS user_email,
                        u.angkatan AS user_angkatan, e.id AS event_id_data_row, e.judul AS event_judul
                 FROM registrations r
                 JOIN users u ON r.user_id = u.id
                 JOIN events e ON r.event_id = e.id`;
    const params = [];
    if (eventId) {
      query += ` WHERE r.event_id = $1`;
      params.push(eventId);
    }
    query += ` ORDER BY r.created_at DESC`;

    const result = await db.query(query, params);
    const data = result.rows.map((r) => ({
      id: r.id, eventId: r.event_id, userId: r.user_id,
      tglDaftar: r.tgl_daftar, statusHadir: r.status_hadir, createdAt: r.created_at,
      user: { id: r.user_id_data, nama: r.user_nama, email: r.user_email, angkatan: r.user_angkatan },
      event: { id: r.event_id_data_row, judul: r.event_judul },
    }));

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data" });
  }
};

exports.updateRegistration = async (req, res) => {
  try {
    const { statusHadir } = req.body;
    const result = await db.query(
      `UPDATE registrations SET status_hadir = $1 WHERE id = $2 RETURNING *`,
      [statusHadir, req.params.id]
    );
    res.json({ success: true, message: "Status diperbarui", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui status" });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    await db.query("DELETE FROM registrations WHERE id = $1", [req.params.id]);
    res.json({ success: true, message: "Pendaftaran berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus pendaftaran" });
  }
};
