const db = require("../config/db");

exports.getAllDivisions = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM divisions ORDER BY name ASC");
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal mengambil data divisi" });
  }
};

exports.getDivisionById = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM divisions WHERE id = $1", [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ success: false, message: "Divisi tidak ditemukan" });
    res.json({ success: true, data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil detail divisi" });
  }
};

exports.createDivision = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Nama divisi wajib diisi" });
    const result = await db.query(
      "INSERT INTO divisions (name, description) VALUES ($1, $2) RETURNING *",
      [name, description || null]
    );
    res.status(201).json({ success: true, message: "Divisi berhasil ditambahkan", data: result.rows[0] });
  } catch (error) {
    if (error.code === "23505") return res.status(409).json({ success: false, message: "Nama divisi sudah ada" });
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal menambahkan divisi" });
  }
};

exports.updateDivision = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await db.query(
      "UPDATE divisions SET name = COALESCE($1, name), description = COALESCE($2, description), updated_at = NOW() WHERE id = $3 RETURNING *",
      [name, description, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ success: false, message: "Divisi tidak ditemukan" });
    res.json({ success: true, message: "Divisi diperbarui", data: result.rows[0] });
  } catch (error) {
    if (error.code === "23505") return res.status(409).json({ success: false, message: "Nama divisi sudah ada" });
    res.status(500).json({ success: false, message: "Gagal memperbarui divisi" });
  }
};

exports.deleteDivision = async (req, res) => {
  try {
    const result = await db.query("DELETE FROM divisions WHERE id = $1 RETURNING id", [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ success: false, message: "Divisi tidak ditemukan" });
    res.json({ success: true, message: "Divisi berhasil dihapus" });
  } catch (error) {
    if (error.code === "23503") return res.status(409).json({ success: false, message: "Divisi masih memiliki anggota" });
    res.status(500).json({ success: false, message: "Gagal menghapus divisi" });
  }
};
