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
    const result = await db.query("SELECT * FROM divisions WHERE id = ?", [req.params.id]);
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
      "INSERT INTO divisions (name, description) VALUES (?, ?)",
      [name, description || null]
    );
    res.status(201).json({ success: true, message: "Divisi berhasil ditambahkan", data: { id: result.insertId, name, description } });
  } catch (error) {
    if (error.code === "1062") return res.status(409).json({ success: false, message: "Nama divisi sudah ada" });
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal menambahkan divisi" });
  }
};

exports.updateDivision = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await db.query(
      "UPDATE divisions SET name = COALESCE(?, name), description = COALESCE(?, description), updated_at = NOW() WHERE id = ?",
      [name, description, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ success: false, message: "Divisi tidak ditemukan" });
    res.json({ success: true, message: "Divisi diperbarui" });
  } catch (error) {
    if (error.errno === 1451 || error.code === "1451") return res.status(409).json({ success: false, message: "Divisi masih memiliki anggota" });
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal memperbarui divisi" });
  }
};

exports.deleteDivision = async (req, res) => {
  try {
    const result = await db.query("DELETE FROM divisions WHERE id = ?", [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: "Divisi tidak ditemukan" });
    res.json({ success: true, message: "Divisi berhasil dihapus" });
  } catch (error) {
    if (error.code === "1451") return res.status(409).json({ success: false, message: "Divisi masih memiliki anggota" });
    res.status(500).json({ success: false, message: "Gagal menghapus divisi" });
  }
};
