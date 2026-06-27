const db = require("../config/db");

exports.createAspiration = async (req, res) => {
  try {
    const { kategori, isiAspirasi, isAnonymous } = req.body;

    if (!kategori || !isiAspirasi) {
      return res.status(400).json({ success: false, message: "Kategori dan isi aspirasi wajib diisi" });
    }

    const isAnon = isAnonymous === true || isAnonymous === "true" || !req.user;
    const userId = isAnon ? null : (req.user?.id || null);

    const result = await db.query(
      `INSERT INTO aspirations (kategori, isi_aspirasi, is_anonymous, user_id)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [kategori, isiAspirasi, isAnon, userId]
    );

    res.status(201).json({ success: true, message: "Aspirasi berhasil dikirim", data: { id: result.rows[0].id } });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengirim aspirasi" });
  }
};

exports.getAllAspirations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { kategori, status } = req.query;

    let where = "";
    const params = [];
    let idx = 1;

    if (req.user && req.user.role !== "admin") {
      where = ` WHERE a.user_id = $${idx++}`;
      params.push(req.user.id);
    }

    if (kategori) {
      where += where ? " AND" : " WHERE";
      where += ` a.kategori = $${idx++}`;
      params.push(kategori);
    }
    if (status) {
      where += where ? " AND" : " WHERE";
      where += ` a.status = $${idx++}`;
      params.push(status);
    }

    const countResult = await db.query(`SELECT COUNT(*) FROM aspirations a ${where}`, params);
    const total = parseInt(countResult.rows[0].count);

    params.push(limit);
    params.push(skip);
    const result = await db.query(
      `SELECT a.*, u.id AS user_id_data, u.nama AS user_nama, u.email AS user_email, u.angkatan AS user_angkatan
       FROM aspirations a
       LEFT JOIN users u ON a.user_id = u.id
       ${where}
       ORDER BY a.created_at DESC
       LIMIT $${idx++} OFFSET $${idx}`,
      params
    );

    const sanitized = result.rows.map((r) => ({
      id: r.id, kategori: r.kategori, isiAspirasi: r.isi_aspirasi,
      isAnonymous: r.is_anonymous, status: r.status,
      responAdmin: r.respon_admin, createdAt: r.created_at, updatedAt: r.updated_at,
      user: r.is_anonymous ? null : { id: r.user_id_data, nama: r.user_nama, email: r.user_email, angkatan: r.user_angkatan },
    }));

    res.json({ success: true, data: sanitized, meta: { total, page, limit } });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil aspirasi" });
  }
};

exports.respondAspiration = async (req, res) => {
  try {
    const { responAdmin, status } = req.body;
    const result = await db.query(
      `UPDATE aspirations SET respon_admin = $1, status = $2 WHERE id = $3 RETURNING *`,
      [responAdmin, status || "reviewed", req.params.id]
    );
    res.json({ success: true, message: "Respon berhasil disimpan", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menyimpan respon" });
  }
};

exports.deleteAspiration = async (req, res) => {
  try {
    await db.query("DELETE FROM aspirations WHERE id = $1", [req.params.id]);
    res.json({ success: true, message: "Aspirasi berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus aspirasi" });
  }
};

exports.getAspirationStats = async (req, res) => {
  try {
    const [total, pending, reviewed, resolved, byCategory] = await Promise.all([
      db.query("SELECT COUNT(*) FROM aspirations"),
      db.query("SELECT COUNT(*) FROM aspirations WHERE status = 'pending'"),
      db.query("SELECT COUNT(*) FROM aspirations WHERE status = 'reviewed'"),
      db.query("SELECT COUNT(*) FROM aspirations WHERE status = 'resolved'"),
      db.query("SELECT kategori, COUNT(*) FROM aspirations GROUP BY kategori"),
    ]);

    res.json({
      success: true,
      data: {
        total: parseInt(total.rows[0].count),
        pending: parseInt(pending.rows[0].count),
        reviewed: parseInt(reviewed.rows[0].count),
        resolved: parseInt(resolved.rows[0].count),
        byCategory: byCategory.rows,
      },
    });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil statistik" });
  }
};
