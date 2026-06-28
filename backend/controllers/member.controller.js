const db = require("../config/db");

exports.getAllMembers = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT m.*, d.name AS division_name
       FROM members m
       JOIN divisions d ON m.division_id = d.id
       ORDER BY d.name, m.name`
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal mengambil data anggota" });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT m.*, d.name AS division_name
       FROM members m
       JOIN divisions d ON m.division_id = d.id
       WHERE m.id = $1`,
      [req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ success: false, message: "Anggota tidak ditemukan" });
    res.json({ success: true, data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil detail anggota" });
  }
};

exports.createMember = async (req, res) => {
  try {
    const { name, division_id, photo_url, social_media_url, description } = req.body;
    if (!name || !division_id || !photo_url) {
      return res.status(400).json({ success: false, message: "Nama, divisi, dan foto wajib diisi" });
    }
    const result = await db.query(
      `INSERT INTO members (name, division_id, photo_url, social_media_url, description)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, division_id, photo_url, social_media_url || null, description || null]
    );
    res.status(201).json({ success: true, message: "Anggota berhasil ditambahkan", data: result.rows[0] });
  } catch (error) {
    if (error.code === "23503") return res.status(400).json({ success: false, message: "Divisi tidak valid" });
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal menambahkan anggota" });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { name, division_id, photo_url, social_media_url, description } = req.body;
    const result = await db.query(
      `UPDATE members
       SET name = COALESCE($1, name),
           division_id = COALESCE($2, division_id),
           photo_url = COALESCE($3, photo_url),
           social_media_url = COALESCE($4, social_media_url),
           description = COALESCE($5, description),
           updated_at = NOW()
       WHERE id = $6 RETURNING *`,
      [name, division_id, photo_url, social_media_url, description, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ success: false, message: "Anggota tidak ditemukan" });
    res.json({ success: true, message: "Anggota diperbarui", data: result.rows[0] });
  } catch (error) {
    if (error.code === "23503") return res.status(400).json({ success: false, message: "Divisi tidak valid" });
    res.status(500).json({ success: false, message: "Gagal memperbarui anggota" });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const result = await db.query("DELETE FROM members WHERE id = $1 RETURNING id", [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ success: false, message: "Anggota tidak ditemukan" });
    res.json({ success: true, message: "Anggota berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus anggota" });
  }
};
