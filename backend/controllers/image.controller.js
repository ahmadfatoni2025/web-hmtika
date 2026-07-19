const db = require("../config/db");

exports.getAllImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const countResult = await db.query("SELECT COUNT(*) AS count FROM images");
    const total = parseInt(countResult.rows[0].count);

    const result = await db.query(
      "SELECT * FROM images ORDER BY created_at DESC LIMIT ? OFFSET ?",
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
    const result = await db.query("SELECT * FROM images WHERE id = ?", [req.params.id]);
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
      "INSERT INTO images (title, description, image_url) VALUES (?, ?, ?)",
      [title, description || null, image_url]
    );
    res.status(201).json({ success: true, message: "Gambar berhasil ditambahkan", data: { id: result.insertId, title, description, image_url } });
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
       SET title = COALESCE(?, title),
           description = COALESCE(?, description),
           image_url = COALESCE(?, image_url)
       WHERE id = ?`,
      [title, description, image_url, req.params.id]
    );
    if (!result.affectedRows) {
      return res.status(404).json({ success: false, message: "Gambar tidak ditemukan" });
    }
    res.json({ success: true, message: "Gambar diperbarui" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui gambar" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const result = await db.query("DELETE FROM images WHERE id = ?", [req.params.id]);
    if (!result.affectedRows) {
      return res.status(404).json({ success: false, message: "Gambar tidak ditemukan" });
    }
    res.json({ success: true, message: "Gambar berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus gambar" });
  }
};
