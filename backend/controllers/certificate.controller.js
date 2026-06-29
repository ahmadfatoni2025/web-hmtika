const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");

exports.getMyCertificates = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT ec.*, e.id AS event_id, e.judul AS event_judul,
              e.tanggal AS event_tanggal, e.lokasi AS event_lokasi,
              e.slug AS event_slug
       FROM e_certificates ec
       JOIN registrations r ON ec.reg_id = r.id
       JOIN events e ON r.event_id = e.id
       ORDER BY ec.tgl_terbit DESC`
    );
    res.json({ success: true, data: result.rows });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil sertifikat" });
  }
};

exports.generateCertificate = async (req, res) => {
  try {
    const { registrationId } = req.body;

    const regResult = await db.query(
      `SELECT r.*, u.nama AS user_nama, e.judul AS event_judul
       FROM registrations r
       JOIN users u ON r.user_id = u.id
       JOIN events e ON r.event_id = e.id
       WHERE r.id = $1`,
      [registrationId]
    );
    if (!regResult.rows[0]) {
      return res.status(404).json({ success: false, message: "Data pendaftaran tidak ditemukan" });
    }

    const existing = await db.query("SELECT id FROM e_certificates WHERE reg_id = $1", [registrationId]);
    if (existing.rows[0]) {
      return res.status(409).json({ success: false, message: "Sertifikat sudah diterbitkan" });
    }

    const nomorSertif = `HMTIKA/${new Date().getFullYear()}/${uuidv4().substring(0, 8).toUpperCase()}`;
    const fileUrl = `/uploads/certificates/${nomorSertif.replace(/\//g, "-")}.pdf`;

    const certResult = await db.query(
      `INSERT INTO e_certificates (reg_id, nomor_sertif, file_url)
       VALUES ($1, $2, $3) RETURNING *`,
      [registrationId, nomorSertif, fileUrl]
    );

    await db.query(
      `UPDATE registrations SET status_hadir = 'hadir' WHERE id = $1`,
      [registrationId]
    );

    res.status(201).json({ success: true, message: "Sertifikat berhasil diterbitkan", data: certResult.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menerbitkan sertifikat" });
  }
};

exports.generateBulkCertificates = async (req, res) => {
  try {
    const { eventId } = req.body;

    const regsResult = await db.query(
      `SELECT r.id
       FROM registrations r
       WHERE r.event_id = $1 AND r.status_hadir = 'hadir'`,
      [eventId]
    );

    const results = [];
    for (const reg of regsResult.rows) {
      const existing = await db.query("SELECT id FROM e_certificates WHERE reg_id = $1", [reg.id]);
      if (!existing.rows[0]) {
        const nomorSertif = `HMTIKA/${new Date().getFullYear()}/${uuidv4().substring(0, 8).toUpperCase()}`;
        const fileUrl = `/uploads/certificates/${nomorSertif.replace(/\//g, "-")}.pdf`;
        const cert = await db.query(
          `INSERT INTO e_certificates (reg_id, nomor_sertif, file_url) VALUES ($1, $2, $3) RETURNING *`,
          [reg.id, nomorSertif, fileUrl]
        );
        results.push(cert.rows[0]);
      }
    }

    res.json({ success: true, message: `${results.length} sertifikat berhasil diterbitkan`, data: results });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menerbitkan sertifikat massal" });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT ec.*, u.id AS user_id, u.nama AS user_nama, u.email AS user_email,
              e.id AS event_id, e.judul AS event_judul
       FROM e_certificates ec
       JOIN registrations r ON ec.reg_id = r.id
       JOIN users u ON r.user_id = u.id
       JOIN events e ON r.event_id = e.id
       ORDER BY ec.tgl_terbit DESC`
    );
    res.json({ success: true, data: result.rows });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data sertifikat" });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    await db.query("DELETE FROM e_certificates WHERE id = $1", [req.params.id]);
    res.json({ success: true, message: "Sertifikat berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus sertifikat" });
  }
};
