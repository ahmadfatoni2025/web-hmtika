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
    let idx = 1;

    if (status) { where += ` WHERE e.status = $${idx++}`; params.push(status); }
    if (kategori) {
      where += where ? " AND" : " WHERE";
      where += ` e.kategori = $${idx++}`;
      params.push(kategori);
    }

    const countResult = await db.query(`SELECT COUNT(*) FROM events e ${where}`, params);
    const total = parseInt(countResult.rows[0].count);

    params.push(limit);
    params.push(skip);
    const result = await db.query(
      `SELECT e.*, (SELECT COUNT(*) FROM registrations r WHERE r.event_id = e.id) AS registration_count
       FROM events e ${where}
       ORDER BY e.tanggal ASC LIMIT $${idx++} OFFSET $${idx}`,
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
      `SELECT e.*, (SELECT COUNT(*) FROM registrations r WHERE r.event_id = e.id) AS registration_count
       FROM events e WHERE e.slug = $1`,
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
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        judul, slug, deskripsi, thumbnail,
        new Date(tanggal), tanggalAkhir ? new Date(tanggalAkhir) : null,
        lokasi, parseInt(kuota) || 100, parseInt(biaya) || 0,
        status || "upcoming", kategori || "Kegiatan",
      ]
    );

    res.status(201).json({ success: true, message: "Event berhasil dibuat", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal membuat event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { judul, deskripsi, tanggal, tanggalAkhir, lokasi, kuota, biaya, kategori, status, thumbnail } = req.body;

    const result = await db.query(
      `UPDATE events SET
        judul = COALESCE($1, judul), deskripsi = COALESCE($2, deskripsi),
        tanggal = COALESCE($3, tanggal), tanggal_akhir = $4,
        lokasi = COALESCE($5, lokasi), kuota = COALESCE($6, kuota),
        biaya = COALESCE($7, biaya), kategori = COALESCE($8, kategori),
        status = COALESCE($9, status), thumbnail = COALESCE($10, thumbnail)
       WHERE id = $11 RETURNING *`,
      [
        judul, deskripsi, tanggal ? new Date(tanggal) : undefined,
        tanggalAkhir ? new Date(tanggalAkhir) : null,
        lokasi, kuota ? parseInt(kuota) : undefined,
        biaya ? parseInt(biaya) : undefined, kategori, status, thumbnail,
        req.params.id,
      ]
    );

    res.json({ success: true, message: "Event diperbarui", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await db.query("DELETE FROM events WHERE id = $1", [req.params.id]);
    res.json({ success: true, message: "Event berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus event" });
  }
};
