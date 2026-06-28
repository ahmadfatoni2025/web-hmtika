const db = require("../config/db");

exports.getAllImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const countResult = await db.query("SELECT COUNT(*) FROM images");
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      "SELECT * FROM images ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, skip]
    );

    res.json({ success: true, data: result.rows, meta: { total, page, limit } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal mengambil gambar" });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM images WHERE id = $1", [req.params.id]);
    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: "Gambar tidak ditemukan" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil detail gambar" });
  }
};

exports.createImage = async (req, res) => {
  try {
    const { title, description, image_url } = req.body;
    if (!title || !image_url) {
      return res.status(400).json({ success: false, message: "Title dan image_url wajib diisi" });
    }
    const result = await db.query(
      "INSERT INTO images (title, description, image_url) VALUES ($1, $2, $3) RETURNING *",
      [title, description || null, image_url]
    );
    res.status(201).json({ success: true, message: "Gambar berhasil ditambahkan", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal menambahkan gambar" });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { title, description, image_url } = req.body;
    const result = await db.query(
      `UPDATE images
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           image_url = COALESCE($3, image_url)
       WHERE id = $4 RETURNING *`,
      [title, description, image_url, req.params.id]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: "Gambar tidak ditemukan" });
    }
    res.json({ success: true, message: "Gambar diperbarui", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui gambar" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const result = await db.query("DELETE FROM images WHERE id = $1 RETURNING id", [req.params.id]);
    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: "Gambar tidak ditemukan" });
    }
    res.json({ success: true, message: "Gambar berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus gambar" });
  }
};
