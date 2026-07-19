const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, nama: user.nama },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.register = async (req, res) => {
  try {
    const { nama, email, password, angkatan, prodi } = req.body;

    if (!nama || !email || !password || !angkatan) {
      return res.status(400).json({ success: false, message: "Semua field wajib diisi" });
    }

    const existing = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ success: false, message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.query(
      `INSERT INTO users (nama, email, password, angkatan, prodi)
       VALUES (?, ?, ?, ?, ?)`,
      [nama, email, hashedPassword, angkatan, prodi || "Informatika"]
    );

    const userResult = await db.query(
      `SELECT id, nama, email, angkatan, prodi, role, status, created_at
       FROM users WHERE id = ?`,
      [result.insertId]
    );

    const user = userResult.rows[0];
    const token = generateToken(user);

    res.status(201).json({ success: true, message: "Registrasi berhasil", data: { user, token } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal registrasi" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email dan password wajib diisi" });
    }

    const result = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ success: false, message: "Email atau password salah" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: "Email atau password salah" });
    }

    const token = generateToken(user);
    res.json({
      success: true,
      message: "Login berhasil",
      data: {
        token,
        user: {
          id: user.id, nama: user.nama, email: user.email,
          angkatan: user.angkatan, prodi: user.prodi, role: user.role,
          status: user.status, foto: user.foto,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal login" });
  }
};
