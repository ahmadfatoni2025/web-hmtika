const db = require("../config/db");

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") +
  "-" + Date.now();

exports.getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const { status, kategori } = req.query;

    let where = "";
    const params = [];

    if (status) { where += ` WHERE e.status = ?`; params.push(status); }
    if (kategori) {
      where += where ? " AND" : " WHERE";
      where += ` e.kategori = ?`;
      params.push(kategori);
    }

    const countResult = await db.query(`SELECT COUNT(*) AS count FROM events e ${where}`, params);
    const total = parseInt(countResult.rows[0].count);

    params.push(limit);
    params.push(skip);
    const result = await db.query(
      `SELECT e.*, (SELECT COUNT(*) AS count FROM registrations r WHERE r.event_id = e.id) AS registration_count
       FROM events e ${where}
       ORDER BY e.tanggal ASC LIMIT ? OFFSET ?`,
      params
    );

    res.json({ success: true, data: result.rows, meta: { total, page, limit } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal mengambil event" });
  }
};

exports.getEventBySlug = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT e.*, (SELECT COUNT(*) AS count FROM registrations r WHERE r.event_id = e.id) AS registration_count
       FROM events e WHERE e.slug = ?`,
      [req.params.slug]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: "Event tidak ditemukan" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil detail event" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { judul, deskripsi, tanggal, tanggalAkhir, lokasi, kuota, biaya, kategori, status, thumbnail } = req.body;
    const slug = slugify(judul);

    const result = await db.query(
      `INSERT INTO events (judul, slug, deskripsi, thumbnail, tanggal, tanggal_akhir, lokasi, kuota, biaya, status, kategori)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        judul, slug, deskripsi, thumbnail,
        new Date(tanggal), tanggalAkhir ? new Date(tanggalAkhir) : null,
        lokasi, parseInt(kuota) || 100, parseInt(biaya) || 0,
        status || "upcoming", kategori || "Kegiatan",
      ]
    );

    res.status(201).json({ success: true, message: "Event berhasil dibuat", data: { id: result.insertId } });
  } catch {
    res.status(500).json({ success: false, message: "Gagal membuat event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { judul, deskripsi, tanggal, tanggalAkhir, lokasi, kuota, biaya, kategori, status, thumbnail } = req.body;

    const result = await db.query(
      `UPDATE events SET
        judul = COALESCE(?, judul), deskripsi = COALESCE(?, deskripsi),
        tanggal = COALESCE(?, tanggal), tanggal_akhir = COALESCE(?, tanggal_akhir),
        lokasi = COALESCE(?, lokasi), kuota = COALESCE(?, kuota),
        biaya = COALESCE(?, biaya), kategori = COALESCE(?, kategori),
        status = COALESCE(?, status), thumbnail = COALESCE(?, thumbnail)
       WHERE id = ?`,
      [
        judul, deskripsi, tanggal ? new Date(tanggal) : undefined,
        tanggalAkhir ? new Date(tanggalAkhir) : null,
        lokasi, kuota ? parseInt(kuota) : undefined,
        biaya ? parseInt(biaya) : undefined, kategori, status, thumbnail,
        req.params.id,
      ]
    );

    res.json({ success: true, message: "Event diperbarui" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await db.query("DELETE FROM events WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Event berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus event" });
  }
};
