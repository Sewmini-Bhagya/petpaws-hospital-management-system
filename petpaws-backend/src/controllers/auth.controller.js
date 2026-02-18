import bcrypt from "bcrypt";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const [dbCheck] = await db.query("SELECT DATABASE() AS db");
  console.log("👉 Connected to database:", dbCheck[0].db);

  try {
    const [existing] = await db.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [userResult] = await db.query(
      `INSERT INTO users (email, password_hash, role_id, status, created_at)
       VALUES (?, ?, 1, 'active', NOW())`,
      [email, passwordHash]
    );

    const userId = userResult.insertId;

    await db.query(
      "INSERT INTO user_profiles (user_id, first_name) VALUES (?, ?)",
      [userId, name]
    );

    await db.query(
      "INSERT INTO clients (user_id, created_at) VALUES (?, NOW())",
      [userId]
    );

    return res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error("🔥 SIGNUP ERROR FULL DETAILS 🔥");
    console.error(err);

    return res.status(500).json({
      error: err.message,
      code: err.code,
    });
  }

};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      `SELECT 
         u.user_id,
         u.email,
         u.password_hash,
         r.role_name
       FROM users u
       JOIN roles r ON u.role_id = r.role_id
       WHERE u.email = ? AND u.status = 'active'`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        email: user.email,
        role: user.role_name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

