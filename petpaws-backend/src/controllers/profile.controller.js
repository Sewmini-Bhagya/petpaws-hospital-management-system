import db from "../config/db.js";

/*Get my profile*/
export const getMyProfile = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const [rows] = await db.query(
      `SELECT first_name, last_name, phone, address_line1
       FROM user_profiles
       WHERE user_id = ?`,
      [user_id]
    );

    res.json(rows[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

/* UPDATE MY PROFILE */
export const updateMyProfile = async (req, res) => {
  const user_id = req.user.user_id;
  const { first_name, last_name, phone, address_line1 } = req.body;

  try {
    await db.query(
      `UPDATE user_profiles
       SET first_name = ?, last_name = ?, phone = ?, address_line1 = ?
       WHERE user_id = ?`,
      [first_name, last_name, phone, address_line1, user_id]
    );

    res.json({ message: "Profile updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
