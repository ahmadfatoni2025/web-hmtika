const db = require("../config/db");

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") +
  "-" + Date.now();

exports.getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { kategori, search } = req.query;

    let where = "WHERE n.status = 'published'";
    const params = [];
    let paramIdx = 1;

    if (kategori) {
      where += ` AND n.kategori = $${paramIdx++}`;
      params.push(kategori);
    }
    if (search) {
      where += ` AND n.judul ILIKE $${paramIdx++}`;
      params.push(`%${search}%`);
    }

    const countResult = await db.query(`SELECT COUNT(*) FROM news n ${where}`, params);
    const total = parseInt(countResult.rows[0].count);

    params.push(limit);
    params.push(skip);
    const result = await db.query(
      `SELECT n.*, u.id AS author_id, u.nama AS author_nama, u.foto AS author_foto
       FROM news n
       LEFT JOIN users u ON n.author_id = u.id
       ${where}
       ORDER BY n.tgl_publish DESC NULLS LAST
       LIMIT $${paramIdx++} OFFSET $${paramIdx}`,
      params
    );

    const news = result.rows.map((r) => ({
      id: r.id, judul: r.judul, slug: r.slug, konten: r.konten,
      ringkasan: r.ringkasan, thumbnail: r.thumbnail, kategori: r.kategori,
      status: r.status, tglPublish: r.tgl_publish, createdAt: r.created_at,
      updatedAt: r.updated_at,
      author: { id: r.author_id, nama: r.author_nama, foto: r.author_foto },
    }));

    res.json({ success: true, data: news, meta: { total, page, limit } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal mengambil berita" });
  }
};

exports.getNewsBySlug = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT n.*, u.id AS author_id, u.nama AS author_nama, u.foto AS author_foto
       FROM news n
       LEFT JOIN users u ON n.author_id = u.id
       WHERE n.slug = $1`,
      [req.params.slug]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: "Berita tidak ditemukan" });
    }
    const r = result.rows[0];
    const news = {
      id: r.id, judul: r.judul, slug: r.slug, konten: r.konten,
      ringkasan: r.ringkasan, thumbnail: r.thumbnail, kategori: r.kategori,
      status: r.status, tglPublish: r.tgl_publish, createdAt: r.created_at,
      updatedAt: r.updated_at,
      author: r.author_id ? { id: r.author_id, nama: r.author_nama, foto: r.author_foto } : null,
    };
    res.json({ success: true, data: news });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil detail berita" });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { judul, konten, ringkasan, kategori, status, thumbnail } = req.body;
    const slug = slugify(judul);
    const tglPublish = status === "published" ? new Date() : null;

    const result = await db.query(
      `INSERT INTO news (judul, slug, konten, ringkasan, thumbnail, kategori, status, author_id, tgl_publish)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [judul, slug, konten, ringkasan, thumbnail, kategori || "Umum", status || "draft", req.user.id, tglPublish]
    );

    res.status(201).json({ success: true, message: "Berita berhasil dibuat", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal membuat berita" });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { judul, konten, ringkasan, kategori, status, thumbnail } = req.body;
    const tglPublish = status === "published" ? new Date() : undefined;

    const result = await db.query(
      `UPDATE news SET judul = $1, konten = $2, ringkasan = $3, kategori = $4,
       status = $5, thumbnail = $6, tgl_publish = COALESCE($7, tgl_publish)
       WHERE id = $8 RETURNING *`,
      [judul, konten, ringkasan, kategori, status, thumbnail, tglPublish, req.params.id]
    );

    res.json({ success: true, message: "Berita diperbarui", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui berita" });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await db.query("DELETE FROM news WHERE id = $1", [req.params.id]);
    res.json({ success: true, message: "Berita berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus berita" });
  }
};

exports.getAllNewsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const countResult = await db.query("SELECT COUNT(*) FROM news");
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      `SELECT n.*, u.id AS author_id, u.nama AS author_nama
       FROM news n LEFT JOIN users u ON n.author_id = u.id
       ORDER BY n.created_at DESC LIMIT $1 OFFSET $2`,
      [limit, skip]
    );

    const news = result.rows.map((r) => ({
      id: r.id, judul: r.judul, slug: r.slug, konten: r.konten,
      ringkasan: r.ringkasan, thumbnail: r.thumbnail, kategori: r.kategori,
      status: r.status, tglPublish: r.tgl_publish, createdAt: r.created_at,
      updatedAt: r.updated_at,
      author: r.author_id ? { id: r.author_id, nama: r.author_nama } : null,
    }));

    res.json({ success: true, data: news, meta: { total, page, limit } });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data" });
  }
};
