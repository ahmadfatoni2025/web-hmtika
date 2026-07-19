const db = require("../config/db");

exports.getMe = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, nama, email, angkatan, prodi, role, status, foto, created_at
       FROM users WHERE id = ?`,
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
    await db.query(
      `UPDATE users SET nama = ?, angkatan = ?, prodi = ?, foto = ?
       WHERE id = ?`,
      [nama, angkatan, prodi, foto, req.user.id]
    );
    res.json({ success: true, message: "Profil diperbarui", data: { nama, angkatan, prodi, foto } });
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
       FROM users WHERE id = ?`,
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
      `UPDATE users SET nama = ?, angkatan = ?, prodi = ?, role = ?, status = ?
       WHERE id = ?`,
      [nama, angkatan, prodi, role, status, req.params.id]
    );
    res.json({ success: true, message: "User diperbarui", data: { nama, angkatan, prodi, role, status } });
  } catch {
    res.status(500).json({ success: false, message: "Gagal memperbarui user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "User berhasil dihapus" });
  } catch {
    res.status(500).json({ success: false, message: "Gagal menghapus user" });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalNews, totalEvents, totalAspirations, pendingAspirations] = await Promise.all([
      db.query("SELECT COUNT(*) AS count FROM users"),
      db.query("SELECT COUNT(*) AS count FROM news WHERE status = 'published'"),
      db.query("SELECT COUNT(*) AS count FROM events"),
      db.query("SELECT COUNT(*) AS count FROM aspirations"),
      db.query("SELECT COUNT(*) AS count FROM aspirations WHERE status = 'pending'"),
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
