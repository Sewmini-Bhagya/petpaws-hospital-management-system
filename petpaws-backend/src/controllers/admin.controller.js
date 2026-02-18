import db from "../config/db.js";

/* Admin: change user role */
export const changeUserRole = async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  try {
    await db.query(
      "UPDATE users SET role = ? WHERE user_id = ?",
      [role, userId]
    );

    res.json({ message: "User role updated successfully" });
  } catch (err) {
    console.error("CHANGE ROLE ERROR:", err);
    res.status(500).json({ error: "Failed to update user role" });
  }
};
