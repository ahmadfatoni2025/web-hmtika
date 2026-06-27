const db = require("../config/db");

exports.getMe = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, nama, email, angkatan, prodi, role, status, foto, created_at
       FROM users WHERE id = $1`,
      [req.user.id]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil profil" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { nama, angkatan, prodi, foto } = req.body;
    const result = await db.query(
      `UPDATE users SET nama = $1, angkatan = $2, prodi = $3, foto = $4
       WHERE id = $5
       RETURNING id, nama, email, angkatan, prodi, role, status, foto`,
      [nama, angkatan, prodi, foto, req.user.id]
    );
    res.json({ success: true, message: "Profil diperbarui", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui profil" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, nama, email, angkatan, prodi, role, status, created_at
       FROM users ORDER BY created_at DESC`
    );
    res.json({ success: true, data: result.rows });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data pengguna" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, nama, email, angkatan, prodi, role, status, foto, created_at
       FROM users WHERE id = $1`,
      [req.params.id]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data pengguna" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { nama, angkatan, prodi, role, status } = req.body;
    const result = await db.query(
      `UPDATE users SET nama = $1, angkatan = $2, prodi = $3, role = $4, status = $5
       WHERE id = $6
       RETURNING id, nama, email, angkatan, prodi, role, status`,
      [nama, angkatan, prodi, role, status, req.params.id]
    );
    res.json({ success: true, message: "User diperbarui", data: result.rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = $1", [req.params.id]);
    res.json({ success: true, message: "User berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus user" });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalNews, totalEvents, totalAspirations, pendingAspirations] = await Promise.all([
      db.query("SELECT COUNT(*) FROM users"),
      db.query("SELECT COUNT(*) FROM news WHERE status = 'published'"),
      db.query("SELECT COUNT(*) FROM events"),
      db.query("SELECT COUNT(*) FROM aspirations"),
      db.query("SELECT COUNT(*) FROM aspirations WHERE status = 'pending'"),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers: parseInt(totalUsers.rows[0].count),
        totalNews: parseInt(totalNews.rows[0].count),
        totalEvents: parseInt(totalEvents.rows[0].count),
        totalAspirations: parseInt(totalAspirations.rows[0].count),
        pendingAspirations: parseInt(pendingAspirations.rows[0].count),
      },
    });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil statistik" });
  }
};
